define('notfound', [
    'require',
    'vue'
], function (require, vue) {
    'use strict';
    var Vue = require('vue');
    var notFoundComponent = Vue.component('not-found-component', {
        template: '<div> 404 找不到页面！</div>'
    });

    return {
        register: function () {
            return notFoundComponent;
        }
    }

});