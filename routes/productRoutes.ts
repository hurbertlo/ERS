import express from "express"
import { logger } from '../util/logger'
import { isLoggedInAPI } from '../util/guard'
import { client } from '../util/db'

export const productRoutes = express.Router()



// get all products
productRoutes.get('/', async (req, res, next) => {
    let result = await client.query(`select * from products`)
    res.json({
        data: result.rows,
        message: "select success"
    });

});

productRoutes.get('/listing/:category', async (req, res, next) => {
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
    });
});

// get product
productRoutes.get('/:productId', async (req, res, next) => {
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
    });
});
