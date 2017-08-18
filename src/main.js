import $ from 'jquery';
import { getAsyncReqParam, getDownloadLink } from './service/excel';
import { toQueryUrl, getQueryParam, post } from './utils/network';
import { api } from './asset/api';

var asyncRequest = getAsyncReqParam();
var uuid = null;
var cleanIntervalFlag = null;

var onBtnClick = function (event) {
    var req = event.data;
    post(req, function (data) {
        // got uuid, show it
        $('#uuid').html(data.uuid);
        $('#message').text('excel文件正在导出中，下载链接稍后出现，请等待...');
        uuid = data.uuid;
        // 凭此uuid，开始轮训，是否生成excel完毕
        cleanIntervalFlag = setInterval(queryStatus, 1000);
    }, function (err) {
        cleanMsg();
        $('#message').text('请求导出excel出错，错误信息' + err);
    });
}

var queryStatus = function () {
    var req = {
        uuid: uuid,
        transCode: 'excelExportStatus'
    }
    post(req, function (data) {
        var body = data['TbExcelExportStatusEObj'];
        if (!_.isEmpty(body) && body['flag'] === 2) {
            $('#message').text('生成excel失败：查询数据库出错！');
            clearInterval(cleanIntervalFlag);
        }
        if (!_.isEmpty(body) && body['flag'] === 1) {

            $('#message').text('生成excel文件成功！');
            $('#download').css({ 'display': 'block' });
            var downlink = getDownloadLink(uuid);
            console.log(downlink);
            $('#download-link').attr('href', downlink);
            $('#download-link').text('点击下载文件');
            clearInterval(cleanIntervalFlag);
        }
    }, function (err) {
        cleanMsg();
        clearInterval(cleanIntervalFlag);
        $('#message').text('服务器生成excel失败：错误信息' + err);
    });
}

var cleanMsg = function () {
    $('#message').text('');
    $('#download').css({ 'display': 'none' });
    $('#download-link').attr('href', '#');
}

// 响应配置#诸如 http://xxx/index.html/#/functionId=123&param1=xxx
$(window).on('hashchange', function () {
    asyncRequest = getAsyncReqParam();
    cleanMsg();
    console.log(asyncRequest);
});
// 响应配置url诸如 http://xxx/index.html/?functionId=123&param1=xxx
$(window).on('beforeunload', function () {
    //.. work ..
    asyncRequest = getAsyncReqParam();
    cleanMsg();
    console.log(asyncRequest);
});

$('#btnExportExcel').on('click', asyncRequest, onBtnClick);
