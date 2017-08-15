define('app', [
    'require',
    'vue',
    'vuer',
    'lodash',
    'router',
    'home',
    'notfound',
    'api'
], function (require, vue, vuer, _,  router, home, notfound, api) {
    'use strict';
    var Vue = require('vue');
    var Vue_Resouce = require('vuer');
    var VueRouter = require('router');
    var homeComponent = require('home').register();
    var notFoundComponent = require('notfound').register();
    var apiConf = require('api');


    Vue.use(VueRouter);
    Vue.use(Vue_Resouce);

    var _404Page = {
        template: '<div>找不到页面 404 </div>'
    };
    var routes = [
        { path: '/home/:uuid', component: homeComponent },
        { path: '/', component: homeComponent, props: true },
        { path: '*', component: _404Page }
    ];

    var vueRouter = new VueRouter({
        routes,
        mode: 'hash'
    });

    return {
        run: function () {
            var app = new Vue({
                router: vueRouter,
                data: {
                    functionId: null,
                    inputs: null
                },
                mounted: function () {
                    console.log('状态：mounted');
                    
                }

            }).$mount('#app');
        }
    };
});