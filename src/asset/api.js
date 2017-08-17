define('api', [
    'require',
], function (require) {
    'use strict';

    return {
        url: 'http://5992e2d92b160100110b6b0f.mockapi.io/api/',
        mock: {
            url: 'http://5992e2d92b160100110b6b0f.mockapi.io/api/excel'
        },
        dev: {
            url: 'http://localhost:8090/ks-main/newService/standard/json',
            download: 'http://localhost:8090/ks-main/newService/downLoad'
        }
    };
});