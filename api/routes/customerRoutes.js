const customers = require('express').Router();
const customerController= require('../controllers/customerController');

customers.get("/", (req, res) => customerController.getCustomers()
                                    .then((customers)=> {
                                        res.status(200).json(customers);
                                    })
                                    .catch((error)=> {
                                        res.status(error.response.status).json(error.response.data);
                                    }));

customers.post("/", (req, res) => customerController.createCustomer(req.body)
                                    .then((customers) => {
                                        res.status(200).json(customers);
                                    })
                                    .catch((error) => {
                                        res.status(error.response.status).json(error.response.data);
                                    }));

module.exports = customers;