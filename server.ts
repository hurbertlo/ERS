import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import { userRoutes } from "./routes/userRoutes";
import { basketRoutes } from "./routes/basketRoutes";
import { productRoutes } from "./routes/productRoutes";
import { orderRoutes } from "./routes/orderRoutes";
import { chatRoutes } from "./routes/chatRoutes";
import { salesRoutes } from "./routes/salesRoutes";
import { User } from "./util/model";
import { warehouseRoutes } from "./routes/warehouseRoutes";
import { isLoggedInAPI } from "./util/guard";
import { setSocket } from "./util/socket";
import { sessionMiddleware } from "./util/session";
declare module "express-session" {
    interface SessionData {
        visitCounter?: number;
        users?: User;
    }
}

//Socket.io Session SetUp
const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

app.use(sessionMiddleware);
app.use(express.json());
setSocket(io);

app.use("/chatroom", isLoggedInAPI, chatRoutes);
app.use("/user", userRoutes);
app.use("/basket", basketRoutes);
app.use("/order", orderRoutes);
app.use("/sales", salesRoutes);
app.use("/products", productRoutes);
app.use("/warehouses", warehouseRoutes);

app.use(express.static("public"));
app.use(express.static("image"));

app.use((_req, res) => {
    res.redirect("/404.html");
});

server.listen(8080, () => {
    console.log(`server listening on http://localhost:8080`);
});
