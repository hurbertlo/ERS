import express from "express"
import { logger } from '../util/logger'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'
import { error } from "winston"
import { Console } from "console"


export const orderRoutes = express.Router()

orderRoutes.post("/", isLoggedInAPI, createOrder)
orderRoutes.delete("/", completeOrder)

export async function createOrder(req: express.Request, res: express.Response) {
    try {
        let userId = req.session['user_id']
        let sendaddress = await client.query(`select address from users where id = $1`, [userId])
        // create a temporary summary table of the order
        let checkoutItems = await client.query(`WITH choosenItems AS(SELECT product_id, quantity FROM baskets where ordered_by = ${userId}),
                     choosenItemDetails AS(SELECT id ,price FROM products WHERE id IN (SELECT product_id FROM baskets INNER JOIN users ON baskets.ordered_by = ${userId}))
                     SELECT product_id, quantity, price FROM choosenItems INNER JOIN choosenItemDetails ON choosenItems.product_id = choosenItemDetails.id`)

        console.table(checkoutItems.rows)
        let address = sendaddress.rows[0]["address"]
        let n = checkoutItems.rows.length
        let total = 0
        // Create an Order
        for (let i = 0; i < n; i++) {
            let pq = checkoutItems.rows[i].quantity
            let pp = checkoutItems.rows[i].price
            let subTotal = pq * pp
            checkoutItems.rows[i]["subTotal"] = subTotal
            total = total + subTotal
        }

        let order = await client.query(` INSERT INTO orders(ordered_by, address, total_price) VALUES ($1, $2, $3) RETURNING id`,
            [userId, address, total])
        const orderId = order.rows[0].id

        // Export to order_details
        for (let i = 0; i < n; i++) {
            let pId = checkoutItems.rows[i].product_id
            let pq = checkoutItems.rows[i].quantity
            let pp = checkoutItems.rows[i].price
            let subTotal = pq * pp
            checkoutItems.rows[i]["subTotal"] = subTotal
            await client.query(`INSERT INTO ordel_details(order_id, product_id, quantity, price, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                [orderId, pId, pq, pp, subTotal])
        }
    } catch {
        res.status(500).end("[ORD001]-server error")
        console.log(error)
    }
}

export async function completeOrder(req: express.Request, res: express.Response) {
    try {
        let orderId = req.body
        await client.query(`delete from orders where ordered_by = $1`, [orderId])
        res.json({
            message: "Enjoy"
        })
    } catch (error: any) {
        res.status(500).end("[ORD002]-server error")
        console.log(error)
    }

}