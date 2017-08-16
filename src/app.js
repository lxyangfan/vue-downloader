define([
    'require',
    'lodash',
    'api',
    'jquery'
], function (require,  _,  api, $) {
    'use strict';

    var url = api['mock']['url'];

    var onBtnClick = function(event) {
        var req = {
            functionId: event.data.functionId,
            inputs: event.data.inputs
        };
        $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify(req),
            success: function(resp) {
                console.log(resp);
            }, 
            failed: function(err){
                console.warn(err);
            }
        });
    }

    return {
        run: function () {
        },
        onBtnClick : onBtnClick,
    };
});