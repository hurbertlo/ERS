import express from "express"
import { logger } from '../util/logger'
// import { Memo } from '../util/model'
import { formParsePromise } from '../util/formidable'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'
import { createFalse, ExpressionStatement } from "typescript"
// import {io}from '../server'

export const userRoutes = express.Router()

userRoutes.get("signup", signupLogin)
userRoutes.post("/signup", signup)
userRoutes.post("/signin", signin)


// go to the signup_login page
export async function signupLogin(req: express.Request, res: express.Response) {
    res.sendFile(__dirname + "/public/user/signup_login.html");
}
// sign up

export async function signup(req: express.Request, res: express.Response) {
    try {
        let { fields, files } = await formParsePromise(req);
        let { name, mobile, email, address, password } = fields
        console.log("fields = ", fields)
        console.log("files = ", files)
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

        res.json({
            message: "create user sucess"
        })
    } catch (error: any) {
        res.status(500).json({
            message: "[USR001] Server Error"
        })
        console.log(error.message)
    }
}

//sign in
export async function signin(req: express.Request, res: express.Response) {
    try {
        console.log(req.body)
        let { email, password } = req.body
        if (!email || !password) {
            res.status(402).json({
                message: 'Invalid login input'
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
                message: 'Invalid user credential'
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
        req.session['userId'] = foundUser.id
        console.log('foundUser = ', foundUser)

        res.json({
            message: "login success"
        })

    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR002] - Server error'
        })
    }
}

