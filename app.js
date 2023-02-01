const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//modules imports // imports 3 module for 3 collections
const Employee = require('./models/Employee');
const Order = require('./models/Order');
const Customer = require('./models/Customer');

const app = express();
app.use(cors()); //Cors ekledim farklı portta çalışan client'tan istek atıcam

mongoose.connect('mongodb://localhost/store-test-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.use(express.urlencoded({extended:true}));
app.use(express.json());


// get request
 
app.get('/',(req,res) => {
    console.log('Bir yeni istek...');
    res.send(['Store Node Apiye hoş geldiniz. by Kerim Öztürk']);
})

app.get('/employees',async(req,res) => {
    const employees = await Employee.find({});
    res.send(employees);
})

app.get('/orders',async(req,res) => {
    const orders = await Order.find({});
    res.send(orders);
})

app.get('/customers',async(req,res) => {
    const customers = await Customer.find({});
    res.send(customers);
})


app.get('/orderdetails',async(req,res) => {
    await Order.aggregate([
        {
            $lookup:{
                from:"employees",
                localField:"employeeId",
                foreignField:"id",
                as:"satici"
            }
        },
        {
            $lookup:{
                from:"customers",
                localField:"customerId",
                foreignField:"id",
                as:"musteri"
            }
        }
    ],(error,data) => {
        if(!error){
            res.send(data)
        }else{
            res.send(['Beklenmeyen bir hata oluştu.'])
        }
    });  
})

// post request
app.post('/add',(req,res) => {
    console.log(req.body);
    res.send(['Başarılı bir post isteği']);
})

app.post('/addemployee',async(req,res) => {
    await Employee.create(req.body);
    res.redirect('/employees')
})

app.post('/addorder',async(req,res) => {
    await Order.create(req.body);
    res.redirect('/orders');
})

app.post('/addcustomer',async(req,res) => {
    await Customer.create(req.body);
    res.redirect('/customers')
})


const port = 3001;
app.listen(port, () =>  {
    () => console.log(`Sunucu port ${port} de başlatıldı...`)
});