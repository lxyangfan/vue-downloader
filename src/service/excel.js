define([
    'require',
    'network',
    'lodash',
    'api'
], function (require, network, _, api) {
    'use strict';
    var conf = api['dev'];
    var getAsyncReqParam = function () {
        var params = network.getQueryParam(window.location.href);
        var functionId = _.isEmpty(params['functionId']) ? null : params['functionId'];
        var inputs = {};
        for (var item in params) {
            if (params.hasOwnProperty(item) && !_.isEmpty(params[item]) && !_.isEqual(item, "functionId")) {
                inputs[item] = params[item];
            }
        }
        return {
            functionId: functionId,
            inputs: inputs,
            transCode: 'asyncExportExcel'
        };
    }

    var getDownloadLink = function (uuid) {
        var params = {
            transCode: 'excelDownload',
            uuid: uuid
        };
        return conf['download'] + network.toQueryUrl(params);
    }
    return {
        getAsyncReqParam: getAsyncReqParam,
        getDownloadLink: getDownloadLink
    };
});