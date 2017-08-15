define('app', [
    'require',
    'vue',
    'lodash',
    'router',
    'home',
    'notfound'
], function (require, vue, _,  router, home, notfound) {
    'use strict';
    var Vue = require('vue');
    var VueRouter = require('router');
    var homeComponent = require('home').register();
    var notFoundComponent = require('notfound').register();


    Vue.use(VueRouter);

    var _404Page = {
        template: '<div>找不到页面 404 </div>'
    };
    var routes = [
        { path: '/home/:uuid', component: homeComponent },
        { path: '/', component: _404Page },
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
                    message: 'Hello Vue'
                },
                mounted: function () {
                    if (!_.isEmpty(this.$route.params.uuid)) {
                        console.log('输入了UUID： '+ this.$route.params.uuid);
                        this.$http.post();
                    }
                }

            }).$mount('#app');
        }
    };
});