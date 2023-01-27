import express from "express"
import { logger } from '../util/logger'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'

export const productRoutes = express.Router()



productRoutes.post("/basket/:productId", isLoggedInAPI, addToBasket)
productRoutes.put("/basket/:productId", isLoggedInAPI, updateIBasketItem)
productRoutes.delete("/basket/:productId", isLoggedInAPI, removeBasketItem)
productRoutes.delete("/basket", isLoggedInAPI, clearBasket)


async function updateIBasketItem(req: express.Request, res: express.Response) { }
async function removeBasketItem(req: express.Request, res: express.Response) { }
async function clearBasket(req: express.Request, res: express.Response) { }


// put items into basketu
export async function addToBasket(req: express.Request, res: express.Response) {
    try {
        console.log(req.body)
        let { quantity } = req.body
        let productId = Number(req.params.productId)
        let userId = req.session['userId'] || 1


        console.log({ quantity, productId })

        let selectedProduct = (await client.query(`select * from products where id = $1`, [Number(productId)])).rows[0]


        let basketItem: any = (await client.query(`select * from baskets where order_by = $1 and  product_id = $2`, [userId, productId])).rows[0]

        // update current record's quantity in basket
        if (basketItem) {
            console.log(Number(quantity));
            console.log(basketItem.quantity);


            await client.query(`update baskets set quantity = $1 where order_by = $2`, [Number(quantity) + basketItem.quantity, userId])
        } else {
            // add new record in basket

            await client.query(`
                INSERT INTO baskets
                (order_by, product_id, quantity )
                VALUES($1, $2, $3);
            `, [userId, selectedProduct.id, Number(quantity)])

        }



        res.end('ok')

    } catch (error: any) {
        res.status(500).end(error.message)
        console.log(error)
    }
}

