const Mongoose = require('mongoose');
const { Schema } = Mongoose;


const userSchema = new Schema({

    username: {
        type: String,
    },
    password: {
        type: String
    },

})

module.exports = Mongoose.model('User', userSchema)