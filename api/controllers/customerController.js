const httpService = require('../httpService');

module.exports = {
    getCustomers: () => httpService.get('customers/')
        .then((response) => {
            return response.data;
        }),

    getCustomerByPhone: (data) => httpService.get(`customers/phone/${data.phone}`)
        .then((response) => {
            return response.data;
        }).catch(()=> null),

    createCustomer: (data) => httpService.post('customers/', {
        name: data.name,
        phone: data.phone,
        address: data.address || '',
        city: data.city || ''
    })
        .then((response) => {
            return response.data;
        })
};
