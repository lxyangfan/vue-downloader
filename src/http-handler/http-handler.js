define('httphandler',[
    'require',
    'lodash'
], function (require, _) {
    'use strict';

    var handleResp = function (resp) {
        if (_.isEqual(resp['status'], 200)) {
            var body = resp['body'];
            if (!_.isEmpty(body) && _.isEqual(body['retCode'],
                "000000")) {
                return body['rspData'];
            } else {
                throw new Error("服务请求错误，错误码：" + body['retCode'] + ',错误信息' + body['retMsg'] );
            }
        } else {
            throw new Error("网络错误，错误码：" + resp['status']);
        }
    }
    return {
        handleResp: handleResp
    };
});