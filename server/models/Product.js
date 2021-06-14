const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    id: mongoose.Types.ObjectId,
    name: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true
    }, 
    processor: {
        type: 'String',
        required: true
    }, 
    ram: {
        type: 'String',
        required: true
    }, 
    storage: {
        type: 'String',
        required: true
    }, 
    images: {
        type: [],
        required: true
    },
    price: {
        type: Number,
        required: true    
    },
    type: {
        type: 'String',
        required: true
    },
    likes: {
        type: [],
        required: false
    },
    colors: {
        type: [],
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)