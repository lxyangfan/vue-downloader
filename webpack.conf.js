const path = require('path');

module.exports = {
    //context: path.resolve(__dirname, 'src'),
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min')
        },
        modules: ['node_modules']
    }
}