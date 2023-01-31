import express from "express"
import { logger } from '../util/logger'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'
import { formParsePromise } from "../util/formidable"

export const productRoutes = express.Router()



productRoutes.get('/', getProducts)
productRoutes.get('/listing/:category', selectProductRange)
productRoutes.get('/:productId', productDetails)
productRoutes.post('/', launchProduct)
productRoutes.delete('/', delistProduct)





export async function getProducts(req: express.Request, res: express.Response) {
    try {
        let result = await client.query(`select * from products`)
        res.json({
            data: result.rows,
            message: "select success"
        });

    } catch (error: any) {
        res.status(500).json({
            message: "[PDT001]-server error-"
        })
        console.log(error);
    }
}

export async function selectProductRange(req: express.Request, res: express.Response) {
    try {
        let category = req.params.category
        let query = ''
        if (category === 'all') {
            query = 'select * from products'
        } else {
            query = `
            select * from categories inner join products on categories.id  = products.category_id where categories.name = '${category}' 
            `
        }
        let result = await client.query(query)
        res.json({
            data: result.rows,
            message: "select success"
        })

    } catch (error: any) {
        res.status(500).json({
            message: "[ORD002]-server error"
        })
        console.log(error);
    }

}


export async function productDetails(req: express.Request, res: express.Response) {
    try {
        const productId = req.params.productId
        console.log('finding product :', productId);

        if (!Number(productId)) {
            res.status(400).end('invalid product id')
            return
        }
        let result = await client.query(`select * from products where id = $1`, [productId])
        let product = result.rows[0]
        if (!product) {
            res.status(400).end('invalid product id')
            return
        }
        res.json({
            data: product,
            message: product
        })

    } catch (error: any) {
        res.status(500).json({
            message: "[ORD003]-server error"
        })
        console.log(error);
    }
}



export async function launchProduct(req: express.Request, res: express.Response) {
    try {
        let { fields, files } = await formParsePromise(req);
        let { category_id, name, price, place_of_origin, description, image, unit_size } = fields

        if (!category_id || !name || !price || !place_of_origin || !description || !image! || unit_size) {
            res.status(400).json({
                message: "Invalid product information"
            })
        }
        image = files.image["newFilename"];

        await client.query(`
            INSERT INTO products
            (category_id,name,price,place_of_origin,description,image,unit_size)
            VALUES($1, $2, $3, $4, $5, $6, $7, now(), now());
            `, [category_id, name, price, place_of_origin, description, image, unit_size || ""])

        res.json({
            message: "Product launched"
        })

    } catch (error: any) {
        res.status(500).json({
            message: "[ORD004] Server Error"
        })
        console.log(error.message)
    }






}

export async function delistProduct(req: express.Request, res: express.Response) {
    try {
        let { productId } = req.body
        if (!productId) {
            res.status(402).json({
                message: 'Please choose the product to be delisted'
            })
        }
        await client.query(`DELETE FROM products WHERE product_id = $1`, [productId])
        res.json({
            message: "Product delisted",
        });
    } catch (error: any) {
        res.status(500).end("[PDT004] Server Error-delist fail");
        console.log(error);
    }
}