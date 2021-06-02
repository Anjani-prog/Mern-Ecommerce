const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const config = require('config')


router.post('/add-product', async (req, res) => {
    try {
        let {
            name,
            imageUrl,
            description,
            quantity,
            price,
        } = req.body
        let product = new Product({
            name,
            imageUrl,
            description,
            quantity,
            price,
        });
        await product.save();
        return res.json({
            status: true,
            message: `Added Product Successfully`
        })
    }
    catch (err) {
        console.log(err)
        return res.json({
            status: false,
            message: err.message
        })
    }
})


router.get('/list-products', async (req, res) => {
    try {
        let products = await Product.find({ isActive: true }, { __v: 0, isActive: 0 })
        return res.json({
            status: true,
            products: products
        })
    }
    catch (err) {
        console.log(err)
        return res.json({
            status: false,
            message: err.message
        })
    }
})

module.exports = router;
