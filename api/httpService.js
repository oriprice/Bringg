const axios = require('axios');
const crypto = require('crypto');
const appConfig = require('../config');
const querystring = require('querystring');

//default config options fo Bringg API
let instance = axios.create({
    baseURL: appConfig.BRINGG_URL,
    headers:{
        'Content-type': 'application/json'
    }});

//adding required parameters to all requests
instance.interceptors.request.use(function (config) {
    switch(config.method){
        case 'post': {
            config.data.company_id = appConfig.COMPANY_ID;
            config.data.timestamp = Date.now();
            config.data.access_token = appConfig.ACCESS_TOKEN;
            let query_params = querystring.stringify(config.data);
            config.data.signature = crypto.createHmac('sha1', appConfig.SECRET_KEY).update(query_params).digest('hex');
        }break;
        case 'get': {
            if (!config.params) {
                config.params = {};
            }
            config.params.company_id = appConfig.COMPANY_ID;
            config.params.timestamp = Date.now();
            config.params.access_token = appConfig.ACCESS_TOKEN;
            let query_params = querystring.stringify(config.params);
            config.params.signature = crypto.createHmac('sha1', appConfig.SECRET_KEY).update(query_params).digest('hex');
        }break;
    }
    return config;
}, function (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
    return Promise.reject(error);
});

module.exports = instance;
