import express from "express"
import { logger } from '../util/logger'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'

export const basketRoutes = express.Router()



basketRoutes.post("/:productId", isLoggedInAPI, addToBasket)
basketRoutes.put("/:productId", isLoggedInAPI, updateBasketItem)
basketRoutes.delete("/:productId", isLoggedInAPI, removeBasketItem)
basketRoutes.delete("/", isLoggedInAPI, clearBasket)


export async function addToBasket(req: express.Request, res: express.Response) {
    try {

        let { quantity } = req.body
        let productId = Number(req.params.productId)
        let userId = req.session['userId']
        let selectedProduct = (await client.query(`select * from products where id = $1`, [Number(productId)])).rows[0]
        let basketItem: any = (await client.query(`select * from baskets where ordered_by = $1 and  product_id = $2`, [userId, productId])).rows[0]

        // update current record's quantity in basket
        if (basketItem) {
            console.log(Number(quantity));
            console.log(basketItem.quantity);
            await client.query(`update baskets set quantity = $1 where ordered_by = $2`, [Number(quantity) + basketItem.quantity, userId])
        } else {
            // add new record in basket

            await client.query(`
                INSERT INTO baskets
                (ordered_by, product_id, quantity )
                VALUES($1, $2, $3);
            `, [userId, selectedProduct.id, Number(quantity)])

        }

        res.json({
            message: "Added successfully"
        })

    } catch (error: any) {
        res.status(500).end(error.message)
        console.log(error)
    }
}


export async function updateBasketItem(req: express.Request, res: express.Response) {
    try {
        let { quantity } = req.body
        let productId = Number(req.params.productId)
        let userId = req.session['userId']

        await client.query(`update baskets set quantity = $1 where ordered_by = $2 and product_id = $3`, [quantity, userId, productId])
        res.json({
            message: "Amend successfully"
        })
    } catch (error: any) {
        res.status(500).end(error.message)
        console.log(error)
    }

}



export async function removeBasketItem(req: express.Request, res: express.Response) {
    try {
        let productId = Number(req.params.productId)
        let userId = req.session['userId']

        await client.query(`delete from baskets where ordered_by = $1 and product_id = $2`, [userId, productId])
        res.json({
            message: "Ops"
        })
    } catch (error: any) {
        res.status(500).end(error.message)
        console.log(error)
    }
}



export async function clearBasket(req: express.Request, res: express.Response) {
    try {
        let userId = req.session['userId']
        await client.query(`delete from baskets where ordered_by = $1`, [userId])
        res.json({
            message: "Are you kidding?"
        })
    } catch (error: any) {
        res.status(500).end(error.message)
        console.log(error)
    }
}




// kay update get basket
basketRoutes.get('/', async (req, res, next) => {

    let userId = req.session['userId']
    let result = await client.query(`select * from baskets where ordered_by = $1`, [userId])
    let basketItems = result.rows

    res.json({
        data: basketItems,
        message: `${basketItems.length} item${basketItems.length > 1 ? 's' : ''} found`
    });
});
