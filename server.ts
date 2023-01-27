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
import {userRoutes} from './routes/userRoutes'

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

// app.get("/user/:user_id",async(req,res)=>{
//     
// 
//     
// })



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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
    // if(!req.session || !req.session['user']){
    //     res.redirect('/login.html');
    // }else{
    //     res.redirect('/home.html');
});

//Kay update index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public');
})
// user connection
io.on('connection', (socket) => {
    let req = socket.request as express.Request
    if (!req.session || !req.session['user']) {
        socket.disconnect()
        return
    }
    console.log('io identity check :', req.session['user'])
    socket.join(req.session['user'].id) //join另一個user id
});

//willy
//入房
app.get('/chat', async (req, res, next) => {
    let chatType = await client.query(`select * from users`)
    res.json({
        id: chatType.rows
    })
})

app.post('/talk-to/:roomId', (req, res) => {
    let roomId = req.params.roomId
    console.log('talk to triggered:', roomId);
    io.to(roomId).emit('new-message', req.body.message)
    res.end('talk ok')
})

// app.post('/talk-to/:roomId', (req, res) => {
//     let roomId = req.params.roomId
//     console.log('talk to triggered:', roomId);
//     io.to(roomId).emit('new-message', req.body.message)
//     res.end('talk ok')
// })

//KAY


// get all products
app.get('/products', async (req, res, next) => {
    let result = await client.query(`select * from products`)
    res.json({
        data: result.rows,
        message: "select success"
    });

});

app.get('/products/listing/:category', async (req, res, next) => {
    let category = req.params.category
    let query = ''
    if (category === 'all') {
        query = 'select * from products'
    } else {
        query = `
        select * from categories inner join products on categories.id  = products.category_id where categories.name = '${category}' 
        `
    }
    let result = await client.query(query)
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

app.use("/user",userRoutes)
app.use(express.static("public"));
app.use(express.static("image"));
app.use(express.static("404"));
server.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`);
})