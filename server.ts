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
// app.post("/user/signup", async (req, res, next) => {
//     try {
//         let { fields, files } = await formParsePromise(req);
//         let { name, mobile, email, address, password } = fields
//         console.log('fields = ', fields)

//         if (!name || !mobile || !email || !address) {
//             res.status(400).json({
//                 message: "Invalid input"
//             })
//         }
//         let fileName = files.image["newFilename"];
//         console.log(fileName);

//         await client.query(`

//        INSERT INTO users
//             ("name", address, mobile, email, "password", created_at, updated_at, user_type_id)
//             VALUES($1, $2, $3, $4, $5, now(), now(),2);
//        `, [name, address, mobile, email, password])

//         res.end("create user sucess");
//     } catch (error: any) {
//         res.status(500).end(error.message)
//     }

// })
// // login
// //            --- admin ---
// // launch a product
// app.post("/products/categoty/launch", async (req, res, next) => {
//     try {
//         let { fields, files } = await formParsePromise(req);
//         let { category_id, name, price, unit_size } = fields
//         console.log('fields = ', fields)

//         if (!category_id || !name || !price || !unit_size) {
//             res.status(400).json({
//                 message: "Invalid input"
//             })
//         }
//         let fileName = files.image["newFilename"];
//         console.log(fileName);

//         await client.query(`

//        INSERT INTO products
//             ("catagory_id","name", "price", "unit_size", created_at, updated_at)
//             VALUES($1, $2, $3, $4, now(), now());
//        `, [category_id, name, price, unit_size])

//         res.end("Product launching sucess");
//     } catch (error: any) {
//         res.status(500).end(error.message)
//     }

// })

// // terminate a product form client
// app.delete("product/category/")
// // record terminated product
// app.post("product/category/archieve")

// //             --- TPS---
// // browse & sort all products
// app.get("product")
// app.get("product/category_id/:c_id")
// // check product details
// app.get("product/category:c_id/product_id/:p_id")
// // order different products
// app.post("order/:o_id/order_details/p_id/a")
// // confirmation and check out
// // generate a receipt
// // generate internal sales order
// // delivery
// // check order status
// // close an order

//             ---CRS---common
// browse history
// initiate a chat
// chat
//             ---CRS---customer

//             ---CRS---admin
// customers overview and chats status
// indivual chat boxs (async)



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
    res.sendFile(__dirname + '/public/chat.html');
    // if(!req.session || !req.session['user']){
    //     res.redirect('/login.html');
    // }else{
    //     res.redirect('/index.html');
    // }
    // res.redirect('/chat.html');
});

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

app.use(express.static("public"));
server.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`);
})

