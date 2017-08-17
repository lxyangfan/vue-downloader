import {api} from '../asset/api';
import {getQueryParam, toQueryUrl} from '../utils/network';
import _ from 'lodash';
var conf = api['dev'];
function getAsyncReqParam() {
    var params = getQueryParam(window.location.href);
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

function getDownloadLink(uuid) {
    var params = {
        transCode: 'excelDownload',
        uuid: uuid
    };
    return conf['download'] + toQueryUrl(params);
}
export {
    getAsyncReqParam,
    getDownloadLink
};