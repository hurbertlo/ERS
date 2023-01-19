import express from 'express';
import { Request, Response, NextFunction } from "express";
import formidable from "formidable";
import fs from 'fs';
import { form, formParsePromise, uploadDir } from './util/formidable';
import path from "path";
import jsonfile from "jsonfile";
import { client } from './util/db';
import { defaultMaxListeners } from 'events';

let app = express();

app.use(express.urlencoded({ extended: true }));


fs.mkdirSync(uploadDir, { recursive: true });


app.use(express.json());
// sign up
app.post("/user/signup", async (req, res, next) => {
    try {
        let { fields, files } = await formParsePromise(req);
        let { name, mobile, email, address, password } = fields
        console.log('fields = ', fields)

        if (!name || !mobile || !email || !address) {
            res.status(400).json({
                message: "Invalid input"
            })
        }
        let fileName = files.image["newFilename"];
        console.log(fileName);
        
        await client.query(`
       
       INSERT INTO users
            ("name", address, mobile, email, "password", created_at, updated_at, user_type_id)
            VALUES($1, $2, $3, $4, $5, now(), now(),2);
       `, [name, address, mobile, email, password])

        res.end("create user sucess");
    } catch (error: any) {
        res.status(500).end(error.message)
    }

})
// login
//            --- admin ---
// launch a product
app.post("/products/categoty/launch", async (req, res, next) => {
    try {
        let { fields, files } = await formParsePromise(req);
        let {category_id, name, price, unit_size} = fields
        console.log('fields = ', fields)

        if (!category_id || !name|| !price || !unit_size) {
            res.status(400).json({
                message: "Invalid input"
            })
        }
        let fileName = files.image["newFilename"];
        console.log(fileName);
        
        await client.query(`
       
       INSERT INTO products
            ("catagory_id","name", "price", "unit_size", created_at, updated_at)
            VALUES($1, $2, $3, $4, now(), now());
       `, [category_id,name,price ,unit_size])

        res.end("Product launching sucess");
    } catch (error: any) {
        res.status(500).end(error.message)
    }

})






// terminate a product form client
app.delete("product/category/")
// record terminated product
app.post("product/category/archieve")

//             --- TPS---
// browse & sort all products
app.get("product")
app.get("product/category_id/:c_id")
// check product details
app.get("product/category:c_id/product_id/:p_id")
// order different products
app.post("order/:o_id/order_details/p_id/a")
// confirmation and check out
// generate a receipt
// generate internal sales order
// delivery
// check order status
// close an order

//             ---CRS---common
// browse history
// initiate a chat
// chat
//             ---CRS---customer

//             ---CRS---admin
// customers overview and chats status
// indivual chat boxs (async)







app.use(express.static("public2"));
app.listen(8080, () => {
    console.log('up')
})

