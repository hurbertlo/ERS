
import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import expressSession from 'express-session'

const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});

// io.on("connection", function (socket) {
//     console.log('socket connected:', socket.id);
//     // socket.emit(`say hi`, `Who are you?`) //同岩岩connect既人傾計
// });

io.on("connection", function (socket) {
    // You can set any values you want to session here.
    console.log('socket connected:', socket.id);
    const req = socket.request as express.Request;
    // req.session["key"] = "sam";
    socket.join('room1')
    // There is no auto save for session.
    // socket.request.session.save();

    // You can also send data using socket.emit() although it is not very useful
    // socket.emit("any-key", "values");
    // socket.on("disconnect", () => {
    //... rest of the code
});
// });

//要加req,res收線
app.get('/everyone', (req, res) => {
    console.log('io everyone triggered');
    io.emit('everyone', '原來係你');
    res.end('io everyone triggered');
})

app.get('/chat-with-admin/:roomName', (req, res) => {
    let roomName = req.params.roomName;
    io.to(roomName).emit(`in-room`, `${roomName} hello im ben`);
    res.end("ok")
})

// app.post("/user", (req, res) => {
//     io.to(`room-name`).emit("new-user", "Congratulations! New User Created!");
//     res.json({ updated: 1 });
// });

app.use(express.static("public"));
server.listen(1212, () => {
    console.log(`server listening on http://localhost:1212`);
})

