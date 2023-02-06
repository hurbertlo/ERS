import expressSession from "express-session";
export const sessionMiddleware = expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, expires: new Date(Date.now() + 30000 * 86400 * 1000) },
});
