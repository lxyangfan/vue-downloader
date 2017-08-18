import $ from 'jquery';
import {api} from '../asset/api';

var url = api['dev']['url'];
var post = function (req, callback, errCallback) {
    $.ajax({
        method: 'POST',
        url: url + '?_t=' + (new Date).getTime(),
        data: JSON.stringify(req),
        contentType: 'application/json',
        success: function (resp) {
            var body = null;
            try {
                body = handleResp(resp);
                callback(body);
            } catch (e) {
                console.warn(e);
                errCallback(e);
            }
        },
        failed: function (err) {
            console.warn(err);
        }
    });
}

var handleResp = function (resp) {
    if (!_.isEmpty(resp) && _.isEqual(resp['retCode'],
        "000000")) {
        return resp['rspData'];
    } else {
        throw new Error("服务请求错误，错误码：" + resp['retCode'] + ',错误信息' + resp['retMsg']);
    }
}

var toQueryUrl = function (params) {
    var str = '?';
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            str = str + '' + key + '=' + params[key] + '&'
        }
    }
    return str.substring(0, str.length - 1);
}

/**
 * 从带有?的完整的url中抽取出query参数
 * @param {string} url 完整的url
 * @return {object} 参数对象
 */
var getQueryParam = function (url) {
    var index = url.indexOf('?');
    var params = null;
    if (-1 !== index) {
        params = url.substring(index + 1);
    }

    var map = {};
    if (!_.isEmpty(params)) {
        map = {};
        var paramList = params.split('&');
        var ptStr = '(.+)=(.*)';
        var pt = new RegExp(ptStr, 'g');
        for (var i = 0; i < paramList.length; i++) {
            var param = paramList[i];
            var res = null;
            while (res = pt.exec(param)) {
                map[res[1]] = res[2];
            }
        }
    }
    return map;
}

export {
    toQueryUrl,
    getQueryParam,
    post
};
