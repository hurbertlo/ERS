import express from "express"
import { logger } from '../util/logger'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'
import { error } from "winston"
import { Console } from "console"
import { OrderDetail } from '../util/model'


export const receiptRoutes = express.Router()

receiptRoutes.get("/:orderid", getReceipt)


export async function getReceipt(req: express.Request, res: express.Response) {
    let userId = req.session["userId"]
    let sendaddress = await client.query(`select address from users where id = $1`, [userId])
    let address = sendaddress.rows[0]["address"]
    let n: number
    let total = 0
    try {
        let orderId = (await client.query(`WITH latest_order AS(SELECT * FROM orders ORDER BY updated_at DESC)
                        SELECT id FROM latest_order WHERE latest_order.ordered_by=1`)).rows[0]
        console.table(orderId)
        let purchasedItems = (await client.query(`SELECT * FROM order_details WHERE order_id =$1`, [orderId["id"]])).rows
        n = purchasedItems.length
        let orderDetails = [...purchasedItems]
        // let orderDetails: OrderDetail[] = purchasedItems

        for (let i = 0; i < n; i++) {
            let pId = purchasedItems[i].product_id
            let name = (await client.query(`SELECT name FROM products WHERE id =$1`, [pId])).rows[0].name
            orderDetails[i]["name"] = name
            total = total + purchasedItems[i].subtotal
            orderDetails[i]["address"] = address
            orderDetails[i]["total"] = total
            orderDetails[i]["orderId"] = orderId
        }
        res.json({
            data: orderDetails,
        })

    } catch (error: any) {
        res.status(500).end("[RCPT003]-Fail to generate receipt, please connect us")
        console.log(error)
    }
}