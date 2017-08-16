define('app', [
    'require',
    'lodash',
    'api',
    'jquery'
], function (require,  _,  api, $) {
    'use strict';
    var apiConf = require('api');

    return {
        run: function () {
            console.log("程序运行！");
        }
    };
});