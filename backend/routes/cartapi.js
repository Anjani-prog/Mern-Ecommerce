const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const config = require('config');


router.post('/add-to-cart', async (req, res) => {
    try {
        let {
            name,
            imageUrl,
            description,
            quantity,
            price,
            user,
        } = req.body

        let cart_items = await Cart.find({
            user
        })
        if (cart_items.length) {
            // already have cart then select the cart and update poducts
        } else {
            // Create a anew cart and sve
        }
    }
    catch (err) {
        console.log(err)
        return res.json({
            status: false,
            message: err.message
        })
    }
})