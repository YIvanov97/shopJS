const User = require('../models/User');

async function cart([userId, product]) {
    let userCart = await User.updateOne({_id: userId}, {$push: {cart: product}})
    return userCart
}

async function remove([userId, product]) {
    return await User.updateOne({_id: userId}, {$pull: {cart: product}});
}

module.exports = {
    cart,
    remove
}