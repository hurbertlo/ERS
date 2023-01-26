import express from 'express';
import { Request, Response, NextFunction } from "express";
import formidable from "formidable";
import fs from 'fs';
import { form, formParsePromise, uploadDir } from './util/formidable';
import path from "path";
import { client } from './util/db';
import { defaultMaxListeners } from 'events';
import http from "http";
import { Server as SocketIO } from "socket.io";
import expressSession from 'express-session'
import { logger } from './util/logger';


const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

app.use(express.urlencoded({ extended: true }));

fs.mkdirSync(uploadDir, { recursive: true });

app.use(express.json());

const sessionMiddleware = expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
});

app.use(sessionMiddleware);


// set up users 
let counter = 1

app.use((req, res, next) => {

    if (req.session['user']) {
        next()
        return
    }
    if (counter % 2 === 0) {
        req.session['user'] = {
            name: 'Odd Person',
            id: 'user_' + counter,
            createDate: new Date()
        }
        console.log('Odd person logged in')
    } else {
        req.session['user'] = {
            name: 'Even Person',
            id: 'user_' + counter,
            createDate: new Date()
        }
        console.log('even person logged in')
    }
    console.log('current count = ', counter)
    counter++

    next()
})

app.get('/me', (req, res) => {
    res.json(
        req.session['user']
    )
})

io.use((socket, next) => {
    let req = socket.request as express.Request;
    let res = req.res as express.Response;
    sessionMiddleware(req, res, next as express.NextFunction);
});

// sign up
app.post("/user/signup", async (req, res, next) => {
    try {


        let { fields, files } = await formParsePromise(req);
        let { name, mobile, email, address, password } = fields
        console.log('fields = ', fields)
        console.log("files =", files)
        if (!name || !mobile || !email || !address) {
            res.status(400).json({
                message: "Invalid input"
            })
        }
        // handle the case if file is not existed
        let profile_picture
        if (files.image) {
            profile_picture = files.image["newFilename"];
            console.log("profile pic : ", profile_picture);
        }

        const result = await client.query(
            `SELECT  * from user_types WHERE name ='user' `
        )
        const userTypeId = result.rows[0].id;

        await client.query(`
    
    INSERT INTO users
            (user_type_id, name, address, mobile, email, password, profile_picture, created_at, updated_at)
            VALUES($1, $2, $3, $4, $5, $6, $7, now(), now());
    `, [userTypeId, name, address, mobile, email, password, profile_picture || ""])

        res.end("create user sucess");
    } catch (error: any) {
        res.status(500).end(error.message)
        console.log(error.message)
    }

})
//sign in
app.post("/user/signin", async (req, res,) => {
    async function login(req: express.Request, res: express.Response) {
        try {
            logger.info('body = ', req.body)
            let { email, password } = req.body
            if (!email || !password) {
                res.status(402).json({
                    message: 'Invalid input'
                })
                return
            }
            let selectUserResult = await client.query(
                `select * from users where email = $1 `,
                [email]
            )
            let foundUser = selectUserResult.rows[0]
            if (!foundUser) {
                res.status(402).json({
                    message: 'Invalid username'
                })
                return
            }
            if (foundUser.password !== password) {
                res.status(402).json({
                    message: 'Invalid password'
                })
                return
            }
            delete foundUser.password
            req.session['email'] = foundUser
            console.log('foundUser = ', foundUser)
            res.redirect('/admin.html')
        } catch (error) {
            logger.error(error)
            res.status(500).json({
                message: '[USR001] - Server error'
            })
        }
    }

})



// user connection
io.on('connection', (socket) => {

    let req = socket.request as express.Request

    if (!req.session || !req.session['user']) {
        socket.disconnect()
        return
    }

    console.log('io identity check :', req.session['user'])
    socket.join(req.session['user'].id)
});



app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/chat.html');
    // if(!req.session || !req.session['user']){
    //     res.redirect('/login.html');
    // }else{
    //     res.redirect('/index.html');
    // }
    res.redirect('/home.html');
});


//入房
app.post('/talk-to/:roomId', (req, res) => {

    let roomId = req.params.roomId

    // 1. find if chat room exists
    // 2. prevent duplicate chat room, e.g. user1_user2, user2_user1

    // let chatroomResult = `select * from chat_room where room_name like '%${req.params.roomId}_${req.session['user'].id}%'
    //     or room_name like '%${req.session['user'].id}_${req.params.roomId}%'
    // `
    // if(chatroomResult && chatroomResult.rows.length > 0){
    //     roomId = chatroomResult.rows[0].room_name
    // }

    console.log('talk to triggered:', roomId);

    io.to(roomId).emit('new-message', req.body.message)
    res.end('talk ok')
})

app.get('/everyone', (req, res) => {
    console.log('io everyone triggered');
    io.emit('everyone', '原來係你');
    res.end('io everyone triggered');
})

app.get('/chat-with-admin/:roomName', (req, res) => {
    let roomName = req.params.roomName;
    io.to(roomName).emit(`in-room`, `${roomName} hello im ben`);
    res.end("Welcome")
})

//KAY
// get all products
app.get('/products', async (req, res, next) => {
    let result = await client.query(`select * from products`)
    res.json({
        data: result.rows,
        message: "select success"
    });
});

// get product
app.get('/products/:productId', async (req, res, next) => {
    const productId = req.params.productId
    console.log('finding product :', productId);

    if (!Number(productId)) {
        res.status(400).end('invalid product id')
        return
    }
    let result = await client.query(`select * from products where id = $1`, [productId])
    let product = result.rows[0]
    if (!product) {
        res.status(400).end('invalid product id')
        return
    }
    res.json({
        data: product,
        message: product
    });
});
//

app.use(express.static("public"));
app.use(express.static("image"));
server.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`);
})