define('downloader', [
    'require',
    'vue'
], function (require, vue) {
    'use strict';
    var Vue = require('vue');
    var downloader = Vue.component('downloader-component', {
        template: '<div>    \
                        <input type="button" value="查询" />  \
                   <div>'
    });
    return {
        register: function () {
            console.log('Downloader 注冊');
            return downloader;
        }
    };
});