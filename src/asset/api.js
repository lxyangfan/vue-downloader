define('api', [
    'require',
    'lodash'
], function (require, _) {
    'use strict';

    var toQueryUrl = function (params) {
        var str = '?';
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                str = str + '' + key + '=' + params[key] + '&'
            }
        }
        return str.substring(0, str.length - 1);
    }

    var getQueryParam = function (url) {
        var index = url.indexOf('?');
        var params = null;
        if (-1 !== index) {
            params = url.substring(index + 1);
        }

        var map = null;
        if (!_.isEmpty(params)) {
            map = {};
            var paramList = params.split('&');
            var ptStr = '(.+)=(.*)';
            var pt = new RegExp(ptStr, 'g');
            for (var param of paramList) {
                var res = null;
                while (res = pt.exec(param)) {
                    map[res[1]] = res[2];
                }
            }
        }
        return map;
    }

    return {
        toQueryUrl: toQueryUrl,
        getQueryParam: getQueryParam,
        url: 'http://5992e2d92b160100110b6b0f.mockapi.io/api/',
        mock: {
            url: 'http://5992e2d92b160100110b6b0f.mockapi.io/api/excel'
        },
        dev: {
            url: 'http://localhost:8090/ks-main/newService/standard/json',
            download: 'http://localhost:8090/ks-main/newService/downLoad'
        }
    };
});