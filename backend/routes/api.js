const express = require('express');
const router = express.Router();
const UserRoute = require('./userapi')
const ProductRoute = require('./productapi')
const CartRoute = require('./cartapi')


router.use('/user', UserRoute);
router.use('/product', ProductRoute);
router.use('/cart', CartRoute);

module.exports = router;