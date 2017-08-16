define('api',[
    'require'
], function(require) {
    'use strict';

    var toQueryUrl = function( params ) {
        var str = '?';
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                str = str +'' + key + '=' + params[key] +'&'
            }
        }
        return str.substring(0, str.length-1);
    }

    return {
        toQueryUrl: toQueryUrl,
        url: 'http://5992e2d92b160100110b6b0f.mockapi.io/api/',
        mock: {
            url: 'http://5992e2d92b160100110b6b0f.mockapi.io/api/'
        },
        dev: {
            url: 'http://localhost:8090/ks-main/newService/standard/json',
            download: 'http://localhost:8090/ks-main/newService/downLoad'
        }
    };
});