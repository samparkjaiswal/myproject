let base_url = document.getElementById('app_url').value;
var data = Object;
var token = $('meta[name="csrf-token"]').attr("content");
data._token = token;
var errorSpan = document.createElement('span');
errorSpan.style.cssText = "color: red;position: absolute;background: #f2f2f2;margin-top: 80px;padding: 10px;border-radius: 8px;border: 3px solid #f00;";
var errorSpan2 = document.createElement('span');
errorSpan2.style.cssText = "color: green;position: absolute;background: #f2f2f2;margin-top: 80px;padding: 10px;border-radius: 8px;border: 3px solid #00FF00;";
class creaters {
    constructor() {
        window.onload = function() {
            document.getElementById('web_series').addEventListener('click', function() {
                creater.getWebSeriesByCeaterId();
            });
            document.getElementById('submit_report').onclick = creater.reportCreater;
            if (document.getElementById('follow_btn') != null) {
                document.getElementById('follow_btn').onclick = creater.followUnfollowCreater;
            } else {
                document.getElementById('unfollow_btn').onclick = creater.followUnfollowCreater;
            }
        };
    }
    getWebSeriesByCeaterId() {
        var id = document.getElementById("creater_id").value;
        var videoType = 1;
        var params = $.extend({}, doAjax_params_default);
        var section = $('.web .video-listing');
        var path = section.html('');
        params['requestType'] = "GET";
        params['url'] = base_url + 'get-web-series/' + id + '/' + videoType + '';
        params['data'] = data;
        params['beforeSendCallbackFunction'] = function() {
            $('#loader').show();
        }
        params['successCallbackFunction'] = function(responseData) {
            $('#loader').hide();
            for (var i = 0; i < responseData.length; i++) {
                $('#count_web').html(i + 1);
                path.append(`<div class="video-listing-inner">
                <a href="${base_url}video-detail/${responseData[i].id}/1">
                    <img src=${responseData[i].thumbnail} ?? './assets/images/img/upcoming.png' />
                </a>
                </div>`);
            }
        };
        params['errorCallBackFunction'] = function(responseData) {
            $('#loader').hide();
            path.append(`<div class="video-no-result">
                <img src="${base_url}assets/images/img/no-result.png" />
                <p class="result-content">No Videos are there</p>
            </div>`);
        }
        doAjax(params);
    }
    followUnfollowCreater() {
        var creater_id = document.getElementById("creater_id").value;
        data.createrId = creater_id;
        data.status = this.getAttribute('status');
        var params = $.extend({}, doAjax_params_default);
        params['requestType'] = "POST";
        params['url'] = base_url + "follow-unfollow";
        params['data'] = data;
        params['successCallbackFunction'] = function(responseData) {
            location.reload();
        };
        params['errorCallBackFunction'] = function(responseData) {
            window.location.href = base_url + "signup";
        }
        doAjax(params);
    }
    reportCreater() {
        var textAreaElement = this.closest('div');
        var report_message_element = document.getElementById("report_message");
        var report_message = document.getElementById("report_message").value;
        var creater_id = document.getElementById("creater_id").value;
        if (report_message == "") {
            errorSpan.innerHTML = "Report Message Field is required.";
            creater.insertAfter(errorSpan, textAreaElement);
            return false;
        } else if (report_message.length < 250) {
            errorSpan.innerHTML = "Report Message Field contains atleast 250 characters.";
            creater.insertAfter(errorSpan, textAreaElement);
            return false;
        }
        data.createrId = creater_id;
        data.reportMessage = report_message;
        var params = $.extend({}, doAjax_params_default);
        params['requestType'] = "POST";
        params['url'] = base_url + "report-creator";
        params['data'] = data;
        params['successCallbackFunction'] = function(responseData) {
            errorSpan2.innerHTML = "Report Submitted SuccessFully.";
            creater.insertAfter(errorSpan2, textAreaElement);
            setTimeout(function() {
                $('#report-creater').modal('hide');
            }, 1000);
            location.reload();
            report_message_element.value="";
            return true;
        };
        params['errorCallBackFunction'] = function(responseData) {
            window.location.href = base_url + "signup";
        }
        doAjax(params);
    }
    insertAfter(newElement, referenceElement) {
        referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
    }
}

const creater = new creaters();

