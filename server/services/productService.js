const Product = require('../models/Product');

async function getAll(query) {
    let products = await Product.find({}).lean()

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search))
    }

    if (query.storage) {
        products = products.filter(x => x.description.toLowerCase().includes(query.storage))
    }

    if (query.ram) {
        products = products.filter(x => x.description.toLowerCase().includes(query.ram))
    }

    if (query.type) {
        products = products.filter(x => x.type.toLowerCase() === query.type)
    }
    
    return products;
}

function getOne(id) {
    return Product.findById(id).lean()
}

async function like ([productId, userEmail]) {
    let productLike = await Product.updateOne({_id: productId}, {$push: {likes: userEmail}})
    return productLike
}

async function dislike ([productId, userEmail]) {
    let productLike = await Product.updateOne({_id: productId}, {$pull: {likes: userEmail}})
    return productLike
}

async function deleteOne(id) {
    return await Product.deleteOne({_id: id});
}

function create(data) {
    let product = new Product(data);
    return product.save();
}

module.exports = {
    getAll,
    getOne,
    deleteOne,
    create,
    like,
    dislike
}