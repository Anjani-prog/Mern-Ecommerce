const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const config = require('config');

const productAvailable = async (product_id) => {
    let product = await Product.findOne({ _id: product_id })
    return product.quantity
}

const updateProductQuantity = async (product_id) => {
    await Product.updateOne({
        _id: product_id
    }, {
        $inc: {
            quantity: -1
        }
    })
}

router.post('/add-to-cart', async (req, res) => {
    try {
        let {
            product_id,
            user_id,
            operation //ADD, REM
        } = req.body

        let cart_item = await Cart.findOne({
            user_id,
            product_id
        })
        if (await productAvailable(product_id)) {
            if (!cart_item) {
                cart_item = new Cart()
                cart_item.quantity = 1
            } else {
                cart_item.quantity = cart_item.quantity + 1
            }
            cart_item.user_id = user_id
            cart_item.product_id = product_id

            await Promise.all([
                cart_item.save(),
                updateProductQuantity(product_id)
            ])

            return res.json({
                status: true,
                message: "product is added to cart"
            })

        } else {
            return res.json({
                status: false,
                message: "Product not enough"
            })
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

router.post('/clear-cart', async (req, res) => {
    try {
        let { user_id } = req.body
        let cart_items = await Cart.find({
            user_id: user_id
        })
        if (cart_items.length) {
            await cart_items.forEach(async cart => {
                await Product.updateOne({
                    _id: cart.product_id
                }, {
                    $inc: {
                        quantity: cart.quantity
                    }
                })
            });

            await Cart.deleteMany({
                user_id
            })

            return res.json({
                status: true,
                message: "Cart has been cleared"
            })
        } else {
            return res.json({
                status: false,
                message: "Nothing to clear"
            })
        }
    } catch (err) {
        console.log(err)
        return res.json({
            status: false,
            message: err.message
        })
    }
})

module.exports = router;
