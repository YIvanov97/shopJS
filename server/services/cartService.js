const User = require('../models/User');

async function cart([userId, product]) {
    return await User.updateOne({_id: userId}, {$push: {cart: product}})
}

async function remove([userId, product]) {
    return await User.updateOne({_id: userId}, {$pull: {cart: product}});
}

module.exports = {
    cart,
    remove
}