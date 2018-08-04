const routes = require('express').Router();
const customers = require('./customerRoutes');
const orders = require('./orderRoutes');

routes.use('/customer', customers);
routes.use('/order', orders);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;