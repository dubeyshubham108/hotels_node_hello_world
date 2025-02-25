const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    }, 
    taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
        required: true
    },
    isDrink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_sales: {
        type: Number,
        default: 0
    }
})

const menu = mongoose.model('data', menuItemSchema);

module.exports = menu;
