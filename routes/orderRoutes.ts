import express from "express"
import { logger } from '../util/logger'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'

export const orderRoutes = express.Router()

// orderRoutes.post("/", isLoggedInAPI, createOrder)

// export async function createOrder(req: express.Request, res: express.Response) {
//     let userId = req.session['user_id']
//     let address = await client.query(`select address from users where id = $1`, [userId])
//     let itemPrice = await client.query(`select price from products where `)

//     await client.query(`
//         INSERT INTO orders
//         (orderd_by,address,total_price,status)
//     `)
// }