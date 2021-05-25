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
    imageFile: {
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
    color: {
        type: [],
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)