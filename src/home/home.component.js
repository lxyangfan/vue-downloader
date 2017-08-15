define('home', [
    'require',
    'vue',
    'downloader'
], function (require, vue, downloader) {
    'use strict';
    var Vue = require('vue');
    var downloaderComponent = require('downloader');
    var homeComponent = Vue.component('home-component', {
        template: '<downloader-component> </downloader-component>'
    });
    return {
        register: function () {
           return homeComponent;
        }
    };
});