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
                    传入的输入值uuid: {{ uuid }}            \
                    输入参数：\
                    <ul> \
                        <li v-for="(value, key) in inputs"> \
                            {{ key }} : {{value}}     \
                            </li>               \
                    </ul> \
                    <downloader-component :uuid="uuid" :function-id="functionId" :inputs="inputs" > </downloader-component>  \
                  </div>',
        props: ['uuid', 'functionId', 'inputs'],
        mounted: function () {
            console.log('在子控件homeComponent中');
            if (!_.isEmpty(this.$route.query)) {

                var params = this.$route.query;
                this.functionId = params.functionId;
                this.inputs = {};
                for (var item in params) {
                    if (params.hasOwnProperty(item) && !_.isEmpty(params[item]) && !_.isEqual(item, "functionId")) {
                        this.inputs[item] = params[item];
                    }
                }
                console.log(this.inputs);
            }
        },
        watch: {
            $route: function (to, from) {
                // 每当URL改变的时候更新uuid
                if (!_.isEmpty(this.$route.params.uuid)) {
                    this.uuid = this.$route.params.uuid;
                }
            }
        },
        methods: {
        }

    });
    return {
        register: function () {
            return homeComponent;
        }
    };
});