import express from "express";
import { logger } from "../util/logger";
import { isLoggedInAPI } from "../util/guard";
import { client } from "../util/db";
import { error } from "winston";
import { Console } from "console";
import { io } from "../server";

export const orderRoutes = express.Router();

orderRoutes.post("/basket", isLoggedInAPI, createOrder);
orderRoutes.put("/deliver/:orderId", deliverOrder);
orderRoutes.put("/completed/:orderId", completedOrder);
orderRoutes.get("/outstanding", outstandingOrder);



export async function createOrder(req: express.Request, res: express.Response) {
    let orderId: number;
    let userId = req.session["userId"];
    let sendaddress = await client.query(
        `select address from users where id = $1`,
        [userId]
    );
    let address = sendaddress.rows[0]["address"];
    let checkoutItems = [];
    let n;
    let total = 0;
    let orderDate;

    try {
        // create a temporary summary table of the order
        checkoutItems = (
            await client.query(`WITH chosenItems AS(SELECT product_id, quantity FROM baskets where ordered_by = ${userId}),
                     chosenItemDetails AS(SELECT id ,price FROM products WHERE id IN (SELECT product_id FROM baskets INNER JOIN users ON baskets.ordered_by = ${userId}))
                     SELECT product_id, quantity, price FROM chosenItems INNER JOIN chosenItemDetails ON chosenItems.product_id = chosenItemDetails.id`)
        ).rows;

        n = checkoutItems.length;

        // Create an Order
        for (let i = 0; i < n; i++) {
            let pq = checkoutItems[i].quantity;
            let pp = checkoutItems[i].price;
            let subTotal = pq * pp;
            checkoutItems[i]["subTotal"] = subTotal;
            total = total + subTotal;
        }
        let order = await client.query(
            ` INSERT INTO orders(ordered_by, address, total_price) VALUES ($1, $2, $3) RETURNING id`,
            [userId, address, total]
        );
        orderId = order.rows[0].id;
        orderDate = await client.query(
            `SELECT created_at FROM orders WHERE id = $1`,
            [orderId]
        );
        io.emit('new-order-received')
    } catch (error: any) {
        res.status(500).json({
            message: "[ORD001]-server error"
        })
        console.log(error);
        throw new Error("Order fail");
    }

    // Export to order_details
    try {
        for (let i = 0; i < n; i++) {
            let pId = checkoutItems[i].product_id;
            let pq = checkoutItems[i].quantity;
            let pp = checkoutItems[i].price;
            let subTotal = pq * pp;
            checkoutItems[i]["subTotal"] = subTotal;

            await client.query(
                `INSERT INTO order_details(order_id, product_id, quantity, price, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                [orderId!, pId, pq, pp, subTotal]
            );
        }
    } catch (error: any) {
        res.status(500).json({
            message: "[ORD002]-server error"
        })
        console.log(error);
        throw new Error("Order fail");
    }

    // remove from Basket
    try {
        await client.query(`DELETE FROM baskets WHERE ordered_by = $1`, [userId]);
        console.log("done");

        res.json({
            message: "Order received with thanks",
            redirect: `/sales.html?orderId=${orderId}`,
        });
    } catch (error: any) {
        console.log(error);
    }
}



// update order on the way
export async function deliverOrder(
    req: express.Request,
    res: express.Response
) {
    try {
        let { orderId, order_status_id } = req.body
        if (order_status_id == 1) {
            await client.query(
                `UPDATE orders SET order_status_id = 2 where orders.id = $1`,
                [orderId]
            )
            res.json({
                message: "Your treasure is coming",
            });
        } else {
            res.json({
                message: "unavailable operation"
            })
            console.log(error)
        }

    } catch (error: any) {
        res.status(500).json({
            message: "[ORD004]-server error"
        })
        console.log(error);
    }
}

// update outstanding orders
export async function outstandingOrder(
    req: express.Request,
    res: express.Response
) {
    try {
        let result = await client.query(`
        SELECT * FROM orders WHERE order_status_id !=3
        ORDER BY created_at ASC 
        `)
        let outstandingOrders = result.rows
        res.json({

            data: outstandingOrders
        })
    } catch (error: any) {
        res.status(500).json({
            message: "[ORMGT001]-server error"
        })
        console.log(error);
    }
}

// order delivered
export async function completedOrder(
    req: express.Request,
    res: express.Response
) {
    try {
        let { orderId, order_status_id } = req.body

        if (order_status_id == 2) {
            await client.query(
                `UPDATE orders SET order_status_id = 3 where orders.id = $1`,
                [orderId]
            )
            res.json({
                message: "May your litte darling enjoys",
            });
        } else {
            res.json({
                message: "unavailable operation"
            })
        }


    } catch (error: any) {
        res.status(500).json({
            message: "[ORD005]-server error"
        })
        console.log(error);
    }
}