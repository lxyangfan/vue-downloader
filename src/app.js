define('app', [
    'require',
    'vue',
    'router',
    'home'
], function (require, vue, router, home) {
    'use strict';
    var Vue = require('vue');
    var homeComponent = require('home').register();
    var VueRouter = require('router');
    Vue.use(VueRouter);

    var TestComp = {
        template: '<div>TEST ROUTE </div>'
    };
    var routes = [
        { path: '/', component: homeComponent },
        { path: '/home', component: homeComponent },
        { path: '/test', component: TestComp }
    ];

    var vueRouter = new VueRouter({
        routes
    });

    return {
        run: function () {
            var app = new Vue({
                router: vueRouter,
                data: {
                    message: 'Hello Vue'
                }
            }).$mount('#app');
        }
    };
});