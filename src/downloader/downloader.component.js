define('downloader', [
    'require',
    'vue',
    'api',
    'httphandler'
], function (require, vue, api, httphandler) {
    'use strict';
    var Vue = require('vue');
    var apiConf = require('api')['dev'];
    var toQueryUrl = require('api')['toQueryUrl'];
    var handler = httphandler['handleResp'];
    var cancelCheck = null;

    var downloader = Vue.component('downloader-component', {
        template: '<div>    \
                        funcId: {{functionId}}, uuid: {{uuid}} \
                        <template v-if="exportClicked === 0">        \
                            <input v-on:click="requestExcel" type="button" value="开始导出"  />  \
                        </template> \
                        <template v-if="exportClicked === 1">        \
                            excel文件正在生成，请稍后...             \
                        </template>  \
                        <template v-if="exportClicked === 2">        \
                            excel文件已经生成，<a :href="downloadLink" target="_blank">点击下载</a>              \
                        </template>                 \
                   <div>',
        props: ['functionId', 'inputs'],
        data: function() {
            return {
                uuid: null,
                downloadLink: null,
                exportClicked: 0
            };
        },
        methods: {
            requestExcel: function () {
                this.exportClicked = 1;

                var req = {
                    functionId: this.functionId,
                    inputs: this.inputs,
                    transCode: 'asyncExportExcel'
                };
                var vm = this;
                vm.$http.post(apiConf.url, req).then(function (resp) {
                    var body = null;
                    try {
                        body = handler(resp);
                        if (_.isEmpty(body['uuid']))
                            throw new Error('后台服务处理失败，返回无效uuid!');
                        this.uuid = body['uuid'];
                    } catch (e) {
                        alert(e);
                    }
                }, function (err) {
                    try {
                        handler(err);
                    } catch (e) {
                        alert(e);
                    }
                });
                cancelCheck = setInterval(this.getExcelExportStatus, 1000);
            },
            getExcelExportStatus: function () {
                // 查询导出状态
                var url = apiConf.url;
                var vm = this;
                var req = {
                    uuid: this.uuid,
                    transCode: 'excelExportStatus'
                }
                vm.$http.post(url, req).then(function (resp) {
                    var body = null;
                    try {
                        body = handler(resp);
                        if (_.isEmpty(body['TbExcelExportStatusEObj']))
                            throw new Error('后台服务处理失败，返回无效TbExcelExportStatusEObj!');
                        var retEobj = body['TbExcelExportStatusEObj'];
                        if (_.isEqual(retEobj['flag'], 1)) {
                            var params = {
                                transCode: 'excelDownload',
                                uuid: this.uuid
                            };
                            this.downloadLink = apiConf.download +  toQueryUrl(params);
                            this.exportClicked = 2;
                            clearInterval(cancelCheck);
                        }
                    } catch (e) {
                        alert(e);
                        clearInterval(cancelCheck);
                    }
                }, function (err) {
                    try {
                        handler(err);
                    } catch (e) {
                        alert(e);
                        clearInterval(cancelCheck);
                    }
                });
            }
        },
        watch: {

        }
    });
    return {
        register: function () {
            return downloader;
        }
    };
});