requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'src',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        api: './asset/api',
        network: './utils/network',
        'excel-service': './service/excel',
        json: './libs/json3.min',
        jquery: '../node_modules/jquery/jquery.min'
    },
    packages: [{
        name: "lodash",
        location: "../node_modules/lodash/",
        main: "index"
    }]
});

// Start the main app logic.
requirejs(['jquery', 'excel-service', 'lodash', 'network', 'api'],
    function ($, excelService, _, network, api) {
        var asyncRequest = excelService.getAsyncReqParam();
        var uuid = null;
        var cleanIntervalFlag = null;
        var onBtnClick = function (event) {
            var req = event.data;
            network.post(req, function (data) {
                // got uuid, show it
                $('#uuid').html(data.uuid);
                $('#message').text('excel文件正在导出中，下载链接稍后出现，请等待...');
                uuid = data.uuid;
                // 凭此uuid，开始轮训，是否生成excel完毕
                cleanIntervalFlag = setInterval(queryStatus, 1000);
            });
        }

        var queryStatus = function () {
            var req = {
                uuid: uuid,
                transCode: 'excelExportStatus'
            }
            network.post(req, function (data) {
                var body = data['TbExcelExportStatusEObj'];
                if (!_.isEmpty(body) && body['flag'] === 2) {
                    $('#message').text('生成excel失败：查询数据库出错！');
                    clearInterval(cleanIntervalFlag);
                }
                if (!_.isEmpty(body) && body['flag'] === 1) {

                    $('#message').text('生成excel文件成功！');
                    $('#download').css({ 'display': 'block' });
                    var downlink = excelService.getDownloadLink(uuid);
                    console.log(downlink);
                    $('#download-link').attr('href', downlink);
                    $('#download-link').text('点击下载文件');
                    clearInterval(cleanIntervalFlag);
                }
            });
        }

        var cleanMsg = function () {
            $('#message').text('');
            $('#download').css({ 'display': 'none' });
            $('#download-link').attr('href', '#');
        }

        // 响应配置#诸如 http://xxx/index.html/#/functionId=123&param1=xxx
        $(window).on('hashchange', function () {
            asyncRequest = excelService.getAsyncReqParam();
            cleanMsg();
            console.log(asyncRequest);
        });
        // 响应配置url诸如 http://xxx/index.html/?functionId=123&param1=xxx
        $(window).on('beforeunload', function () {
            //.. work ..
            asyncRequest = excelService.getAsyncReqParam();
            cleanMsg();
            console.log(asyncRequest);
        });

        $('#btnExportExcel').on('click', asyncRequest, onBtnClick);

    });