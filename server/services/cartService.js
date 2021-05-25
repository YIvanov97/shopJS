const User = require('../models/User');

async function cart([userId, product]) {
    await User.updateOne({_id: userId}, {$push: {cart: product}})
    return User.findOne({_id: userId})
}

async function remove([userId, product]) {
    await User.updateOne({_id: userId}, {$pull: {cart: product}});
    return User.findOne({_id: userId})
}

module.exports = {
    cart,
    remove
}