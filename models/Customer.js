const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    id:Number,
    name:String,
    surName:String,
    address:String,
})

const Customer = mongoose.model('Customer',CustomerSchema);

module.exports = Customer;