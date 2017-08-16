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
                        <input v-on:click="requestExcel" type="button" value="开始导出"  />  \
                        funcId: {{functionId}}, uuid: {{uuid}} \
                        <template v-if="downloadLink !== null">        \
                            <a :href="downloadLink" target="_blank">点击下载</a>              \
                        </template>                 \
                   <div>',
        props: ['uuid', 'functionId', 'inputs'],
        data: function() {
            return {
                downloadLink: null
            };
        },
        methods: {
            requestExcel: function () {
                console.log('开始导出...');
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
                        console.log(body);
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
                            console.log('生成excel成功，可以下载...'+ this.downloadLink);
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