define('home', [
    'require',
    'vue',
    'lodash',
    'downloader'

], function (require, vue, _, downloader) {
    'use strict';
    var Vue = require('vue');
    var downloaderComponent = require('downloader');
    var homeComponent = Vue.component('home-component', {
        template: '<div>    \
                    传入的值uuid: {{ $route.params.uuid }}            \
                    控件的值uuid: {{ uuid }}            \
                    <downloader-component> </downloader-component>  \
                  </div>',
        props: ['uuid'],
        watch: {
            $route: function(to, from) {
                // 每当URL改变的时候更新uuid
                if (!_.isEmpty(this.$route.params.uuid)) {
                    this.uuid = this.$route.params.uuid;
                }
            }
        }
        
    });
    return {
        register: function () {
            return homeComponent;
        }
    };
});