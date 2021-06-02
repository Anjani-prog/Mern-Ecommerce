const express = require('express');
const router = express.Router();
const UserRoute = require('./userapi')
const ProductRoute = require('./productapi')


router.use('/user', UserRoute);
router.use('/product', ProductRoute);

module.exports = router;