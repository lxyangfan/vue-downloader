define('app',[
    'require',
    'vue'
], function(require, vue) {
    'use strict';
    var Vue = require('vue');
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue'
        }
    });
    return app;
});