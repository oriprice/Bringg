const orders = require('express').Router();
const ordersController= require('../controllers/orderController');

orders.post("/", (req, res) => ordersController.createOrder(req.body)
    .then((response)=>{
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(error.response.status).json(error.response.data);
    }));

orders.get("/:customer_phone", (req, res) => ordersController.getOrders(req.params.customer_phone)
    .then((response)=>{
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(error.response.status).json(error.response.data);
    }));

module.exports = orders;