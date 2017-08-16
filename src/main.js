requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'src',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        vue: '../node_modules/vue/dist/vue.min',
        router: '../node_modules/vue-router/dist/vue-router.min',
        vuer: '../node_modules/vue-resource/dist/vue-resource.min',
        home: './home/home.component',
        downloader: './downloader/downloader.component',
        notfound: './not-found/not-found.component',
        api: './asset/api',
        jquery: '../node_modules/jquery/dist/jquery.min'
    },
    packages: [{
        name: "lodash",
        location: "../node_modules/lodash/",
        main: "lodash.min"
    }]
});

// Start the main app logic.
requirejs(['app', 'jquery', 'api', 'lodash'],
    function (app, $, api, _) {
        var params = api.getQueryParam(window.location.href);
        var functionId = params['functionId'];
        var inputs = {};
        for (var item in params) {
            if (params.hasOwnProperty(item) && !_.isEmpty(params[item]) && !_.isEqual(item, "functionId")) {
                inputs[item] = params[item];
            }
        }

        $(document).ready(function () {
            $('#btnExportExcel').on('click', { functionId: functionId, inputs: inputs }, app.onBtnClick);
        });
    });