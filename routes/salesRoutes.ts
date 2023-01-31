import express from "express"
import { logger } from '../util/logger'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'
import { error } from "winston"
import { Console } from "console"
import { io } from "../server"



export const salesRoutes = express.Router()

salesRoutes.get("/", getSales)


export async function getSales(req: express.Request, res: express.Response) {
    try {
        let userId = req.session["userId"]
        let address = (await client.query(`SELECT address FROM users where id = $1`, [userId])).rows[0].address
        console.log(address)
        let orderId = req.query.orderId
        let total = (await client.query(`SELECT total_price FROM orders WHERE id = $1`, [orderId])).rows[0].total_price
        let date = (await client.query(`SELECT created_at FROM orders WHERE id = $1`, [orderId])).rows[0].created_at
        let paidItems = (await client.query(`WITH purchasedItems AS(SELECT * FROM order_details WHERE order_id=${orderId})
                        SELECT product_id, name, quantity, subtotal FROM purchasedItems INNER JOIN products ON purchasedItems.product_id=products.id`)).rows

        res.json({
            userId,
            address,
            orderId,
            total,
            date,
            paidItems
        })

    } catch (error: any) {
        res.status(500).end("[RCPT001]-Fail to generate receipt, please connect us")
        console.log(error)
    }
}