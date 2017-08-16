define('home', [
    'require',
    'vue',
    'lodash',
    'downloader',
    'api'
], function (require, vue, _, downloader, api) {
    'use strict';
    var Vue = require('vue');

    var downloaderComponent = require('downloader');
    var homeComponent = Vue.component('home-component', {
        template: '<div>    \
                    功能号functionId: {{ functionId }}            \
                    输入参数：\
                    <ul> \
                        <li v-for="(value, key) in inputs"> \
                            {{ key }} : {{value}}     \
                            </li>               \
                    </ul> \
                    <downloader-component :function-id="functionId" :inputs="inputs" > </downloader-component>  \
                  </div>',
        props: ['functionId', 'inputs'],
        mounted: function () {
            // 从url中获取参数值，包括functionId、输入参数
            this.updateParams();
        },
        watch: {
            $route: function (to, from) {
                // 每当URL改变的时候更新uuid
                this.updateParams();
            }
        },
        methods: {
            updateParams: function () {
                if (!_.isEmpty(this.$route.query)) {
                    var params = this.$route.query;
                    this.functionId = params.functionId;
                    this.inputs = {};
                    for (var item in params) {
                        if (params.hasOwnProperty(item) && !_.isEmpty(params[item]) && !_.isEqual(item, "functionId")) {
                            this.inputs[item] = params[item];
                        }
                    }
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