import express from "express";

export const isLoggedIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session["userId"]) {
        //called Next here
        next();
    } else {
        // redirect to index page
        res.redirect("/?error=no access right");
    }
};

export const isLoggedInAPI = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session["userId"]) {
        //called Next here
        next();
    } else {
        // redirect to index page
        res.status(403).json({
            message: "Unauthorized",
        });
    }
};

export const isAdultAPI = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session["age"] > 18) {
        //called Next here
        next();
    } else {
        // redirect to index page
        res.status(403).json({
            message: "still a kid",
        });
    }
};
