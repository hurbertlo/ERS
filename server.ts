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
import { chatRoutes } from './routes/chatRoutes';
import { OrderDetail, User } from './util/model';
import { receiptRoutes } from './routes/receiptRoutes';



declare module 'express-session' {
    interface SessionData {
        visitCounter?: number
        users?: User
    }
}

// number of times of visit
// app.get("/product/:id",(req,res)=>{
// req.session["visitCounter"]= req.session["visitCounter"]? request.session["visitCounter"]+1 :1
// })


//Socket.io Session SetUp
const app = express();
const server = new http.Server(app);
export const io = new SocketIO(server);
const sessionMiddleware = expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
});

app.use(sessionMiddleware);

io.use((socket, next) => {
    let req = socket.request as express.Request;
    let res = req.res as express.Response;
    sessionMiddleware(req, res, next as express.NextFunction);
});

fs.mkdirSync(uploadDir, { recursive: true });
app.use(express.json());

// user connection
io.on('connection', (socket) => {
    let req = socket.request as express.Request
    if (!req.session || !req.session['userId']) { //要跟返userRoutes
        socket.disconnect()
        return
    }
    console.log('io identity check :', req.session['userId'])
    socket.join(req.session['userId'])
});

// app.get('/test', (req, res) => {
//     console.log('triggered');

//     io.emit("new-user", "Congratulations! New User Created!");
//     res.end('triggered')
// })


app.post('/talk-to/:roomId', (req, res) => {
    let roomId = req.params.roomId
    console.log('talk to triggered:', roomId);
    io.to(roomId).emit('new-message', req.body.message)
    res.end('talk ok')
})



// testing 
// app.get("/aaa",)





app.get("/aaa",)

app.use("/chatroom", chatRoutes);
app.use("/user", userRoutes);
app.use('/basket', basketRoutes);
app.use("/order", orderRoutes);
app.use("/receipt", receiptRoutes);
app.use('/products', productRoutes);
app.use(express.static("public"));
app.use(express.static("image"));
app.use(express.static("404"));
server.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`);
})
