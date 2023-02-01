const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    id:Number,
    employeeId:Number,
    orderNumber:Number,
    customerId:Number
})


const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;