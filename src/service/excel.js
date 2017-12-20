import {api} from '../asset/api';
import {getQueryParam, toQueryUrl} from '../utils/network';
import _ from 'lodash';
var conf = api['dev'];
function getAsyncReqParam() {
    var params = getQueryParam(window.location.href);
    var functionId = _.isEmpty(params['functionId']) ? null : params['functionId'];
    var userCode = _.isEmpty(params['userCode']) ? null : params['userCode'];
    var inputs = {};
    for (var item in params) {
        if (params.hasOwnProperty(item) && !_.isEmpty(params[item]) ) {
            inputs[item] = params[item];
        }
    }
    return {
        functionId: functionId,
        inputs: inputs,
        userCode: userCode,
        transCode: 'excel.asyncExportExcel'
    };
}

function getDownloadLink(uuid) {
    var params = {
        transCode: 'excel.excelDownload',
        uuid: uuid
    };
    return conf['download'] + toQueryUrl(params);
}
export {
    getAsyncReqParam,
    getDownloadLink
};