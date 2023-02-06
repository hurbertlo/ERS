import { Server } from "socket.io";
import { sessionMiddleware } from "./session";
import express from "express";

export let io: Server;

export function setSocket(value: Server) {
    io = value;
    io.use((socket, next) => {
        let req = socket.request as express.Request;
        let res = req.res as express.Response;
        sessionMiddleware(req, res, next as express.NextFunction);
    });
    // user connection
    io.on("connection", (socket) => {
        let req = socket.request as express.Request;
        if (!req.session || !req.session["userId"]) {
            //要跟返userRoutes
            socket.disconnect();
            return;
        }
        socket.join(String(req.session["userId"])); //join呢間房
    });
}
