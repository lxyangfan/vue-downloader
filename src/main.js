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
    }
});

// Start the main app logic.
requirejs(['vue', 'app'],
function   (vue, app) {
    console.log("启动vue！");
    app;
    
});