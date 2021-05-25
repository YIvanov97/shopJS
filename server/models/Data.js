const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");

const Schema = mongoose.Schema;

const OrderData = Schema({
    products: { type: Schema.Types.ObjectId, ref: Product },
    users: { type: Schema.Types.ObjectId, ref: User },
    date: Date,
});

module.exports = mongoose.model("OrderData", OrderData);