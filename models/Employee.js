const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    id:Number,
    name:String,
    surName:String
});

const Employee = mongoose.model('Employee',EmployeeSchema);

module.exports = Employee;