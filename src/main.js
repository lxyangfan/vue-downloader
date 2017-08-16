requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'src',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        npm: '../node_modules',
        vue: '../node_modules/vue/dist/vue.min',
        router: '../node_modules/vue-router/dist/vue-router.min',
        vuer:   '../node_modules/vue-resource/dist/vue-resource.min',
        home: './home/home.component',
        downloader: './downloader/downloader.component',
        notfound: './not-found/not-found.component',
        api: './asset/api',
        httphandler: './http-handler/http-handler',
        app: './app' 
    },
    packages : [{ 
        name : "lodash",
        location : "../node_modules/lodash/",
        main : "lodash.min"
    }]
});

// Start the main app logic.
requirejs(['require', 'vue', 'app'],
    function (require, vue, app) {
        app.run();
});