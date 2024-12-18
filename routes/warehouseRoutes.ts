import express from "express";
import { logger } from "../util/logger";
import { isLoggedInAPI } from "../util/guard";
import { client } from "../util/db";
import { error } from "winston";
import { Console } from "console";
import { io } from "../server";

export const warehouseRoutes = express.Router();

warehouseRoutes.get("/", isLoggedInAPI, allProductsQty);
warehouseRoutes.get("/:productId", isLoggedInAPI, specificProductQty);
// warehouseRoutes.put("/:productId", isLoggedInAPI, amendQuantity);

export async function allProductsQty(req: express.Request, res: express.Response) {
    try {
        let result = await client.query(`
        SELECT product_id, category_id, name, available_quantity, unit_size, warehouses.updated_at FROM warehouses 
        INNER JOIN products ON warehouses.product_id = products.id
        `
        )
        let availableAllQty = result.rows
        res.json({

            data: availableAllQty
        })
    } catch (error: any) {
        res.status(500).json({
            message: "[WHE001] Server Error"
        })
        console.log(error.message)
    }
}



export async function specificProductQty(req: express.Request, res: express.Response) {
    try {
        let productId
        let result = await client.query(`
        SELECT available_quantity FROM warehouses 
        WHERE product_id= $1
        `, [productId])
        let availableQty = result.rows
        res.json({

            data: availableQty
        })
    } catch (error: any) {
        res.status(500).json({
            message: "[WHE002] Server Error"
        })
        console.log(error.message)
    }
}





// export async function amendQuantity(req: express.Request, res: express.Response) {
//     try {
//         let { productId, quantity } = req.body
//         let reducedQty = (await client.query(`SELECT quantity FROM order_details WHERE product_id=$1`, [productId])).rows
//         let availableQty = await client.query(`SELECT available_quantity FROM warehouse WHERE product_id = $1`, [productId])
//         if (reducedQty <= availableQty) {
//             let updatedQty = await client.query(`
//             WITH reducedQty AS(SELECT quantity FROM order_details WHERE product_id=${productId}),
//             UPDATE warehouses SET available_quantity = available_quantity -reducedQty.quantity
//             `
//             )else {
//                 res.status(400).json({
//                     message: "Out of stock"
//                 })
//         }
//     } catch (error: any) {
//         res.status(500).json({
//             message: "[WHE003] Server Error"
//         })
//         console.log(error.message)
//     }
// }