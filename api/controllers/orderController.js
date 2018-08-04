const _ = require('lodash');
const moment = require('moment');
const httpService = require('../httpService');
const customerController = require('../controllers/customerController');

let createTask = (postData, customer) => {
    postData.customer_id = customer.id;
    postData.address = postData.address || customer.address;
    postData.phone =  postData.phone || customer.phone;
    return httpService.post('tasks/', postData)
        .then((response) => {
            return response.data;
        });
};


//recursively getting all tasks (filtering it to last week)
let getLastWeekOrders = (page = 0) => {
    return httpService.get('tasks/', {
        params: {
            page: page
        }
    })
        .then((response) => {
            if (response.data === undefined || response.data.length === 0) {
                return [];
            }
            else if (moment().diff(_.last(response.data).created_at, 'days') >= 7) {
                return _.filter(response.data, (order) => {
                    return moment().diff(order.created_at, 'days') <= 7;
                });
            } else {
                return response.data.concat(getLastWeekOrders(page + 1));
            }
        });
};

module.exports = {
    createOrder: (data) => {
        //verify if customer exists
        return customerController.getCustomerByPhone(data).then((result) => {
            if (!result) { //customer not exists
                //create customer
                data.city = data.city || '';
                return customerController.createCustomer(data).then((result) => {
                    return createTask(data, result.customer);
                })
            } else {
                return createTask(data, result.customer);
            }
        })
    },

    getOrders: (customerPhone) => {
        return customerController.getCustomerByPhone({
            phone: customerPhone
        })
            .then((result) => {
                if (!result) {
                    return "No customer Found!";
                }
                return getLastWeekOrders().then((orders) => _.filter(orders, (order) => {
                        return order.customer.phone === customerPhone;
                    })
                );

            })
    }
};
