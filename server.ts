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
import { userRoutes } from './routes/userRoutes'
import { basketRoutes } from './routes/basketRoutes';
import { productRoutes } from './routes/productRoutes';
import { orderRoutes } from './routes/orderRoutes';

const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

fs.mkdirSync(uploadDir, { recursive: true });

app.use(express.json());

const sessionMiddleware = expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
});

app.use(sessionMiddleware);

// // set up users 
let counter = 1

app.use((req, res, next) => {
    if (req.session['room']) {
        next()
        return
    }

    if (counter % 2 === 0) {
        req.session['room'] = {
            name: 'Odd Person',
            id: 'user_' + counter,
            createDate: new Date()
        }
        console.log('Odd person logged in')
    } else {
        req.session['room'] = {
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


io.use((socket, next) => {
    let req = socket.request as express.Request;
    let res = req.res as express.Response;
    sessionMiddleware(req, res, next as express.NextFunction);
});

//willy chat
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
    // if(!req.session || !req.session['user']){
    //     res.redirect('/login.html');
    // }else{
    //     res.redirect('/home.html');
});



// user connection
io.on('connection', (socket) => {
    socket.emit('message', '有咩可以幫到你？')

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })

    let req = socket.request as express.Request
    if (!req.session || !req.session['room']) {
        socket.disconnect()
        return
    }
    console.log('io identity check :', req.session['room'])
    socket.join(req.session['room'].id) //join另一個user id
});

app.post('/talk-to/:roomId', (req, res) => {
    let roomId = req.params.roomId
    console.log('talk to triggered:', roomId);
    io.to(roomId).emit('new-message', req.body.message)
    res.end('talk ok')
})

app.get("/user/signup", (req, res) => {
    res.sendFile(__dirname + "/public/user/signup_login.html");
})
app.use("/user", userRoutes);
app.use('/basket', basketRoutes);
app.use("/order", orderRoutes);
app.use('products', productRoutes);
app.use(express.static("public"));
app.use(express.static("image"));
app.use(express.static("404"));
server.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`);
})