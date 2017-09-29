var sid;

// const proxy_url = 'https://swagger-proxy.cfapps.sap.hana.ondemand.com/';
const proxy_url = 'https://swagger-proxy.cfapps.eu10.hana.ondemand.com/';


function backHome() {
    window.location.href = 'home.html';
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}


function changeWord() {
    var swagger = $('#swagger-ui > section > div.topbar > div > div > a > span');

    swagger.attr("onclick", "backHome()");
    swagger.text("Back Home");
}

function SweetAlertCookie(sid) {
    swal({
        title: 'Pre Login',
        width: 600,
        titleText: 'Please Copy SessionID to: ',
        text: 'SCP-ServiceLayer-Cookie: ' + sid,
        type: 'success'
    })
}

function addPreLogin() {
    var execute = $('.execute');
    execute.attr("onclick", "preLogin()");
}

function getOrders() {
    window.sid = getCookie("B1SESSION");
    console.log(window.sid);

    $.ajax({
        type: "GET",
        url: "https://slcdemo.cfapps.sap.hana.ondemand.com/api_poc/api/b1s/v1/Orders",
        dataType: 'json',
        headers: {
            "Content-Type": "application/json",
            "X-Tenant-ID": "1111",
            "SCP-Virtual-Host-Token": "a27b0361f160d2ffaa696c51851b2793 "
        },
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            //实际操作的时候，返回的json对象中可能会有成功错误的判断标记，所以可能也需要判断一下
            console.log("返回的数据: " + JSON.stringify(data));
        },
        error: function (xhr, textStatus, error) {
            alert(JSON.stringify(xhr.responseJSON));

            console.log(JSON.stringify(xhr.responseJSON));
            console.log(textStatus);
            console.log(error);
        }
    });
}

var now_command;
var ajaxResponese = {};
var responesestatusCode = '';
var now_selctor;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two second later');
}

function getCurlResult() {
    // demo();
    $.ajax({
        async: false,
        type: "GET",
        url: proxy_url + 'hi',
        contentType: 'application/json',
        dataType: 'JSON',
        success: function (data) {
            if (data.haschanged === true) {
                ajaxResponese = data.body;
                responesestatusCode = data.statusCode;
                console.log("statusCode: " + data.statusCode);
            }
            else {
                ajaxResponese = 'Start Send CURL, Press Execute Button again';
                responesestatusCode = '';
                console.log("no changed");
            }


        },
        error: function (xhr, textStatus, error) {

            console.log("error");
            console.log(JSON.stringify(xhr.responseJSON));

            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}

function postTheAjax() {

    var sendCul = {};
    var session = getCookie("B1SESSION");
    sendCul.curl = now_command;
    sendCul.sid = session;
    sendCul.selector = now_selctor;
    var sculobj = JSON.stringify(sendCul);
    var stu = JSON.stringify(sculobj);
    var constu = JSON.parse(stu);

    $.ajax({
        async: false,
        type: "POST",
        url: proxy_url,
        contentType: 'application/json',
        dataType: 'JSON',
        // crossDomain: true,
        data: constu,
        success: function (data) {
            //实际操作的时候，返回的json对象中可能会有成功错误的判断标记，所以可能也需要判断一下
            console.log("返回的数据: " + data.backResult);
            getCurlResult();
        },
        error: function (xhr, textStatus, error) {

            console.log("error");
            console.log(JSON.stringify(xhr.responseJSON));

            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}

function findClass(element, className) {
    var foundElement = null, found;

    function recurse(element, className, found) {
        for (var i = 0; i < element.childNodes.length && !found; i++) {
            var el = element.childNodes[i];
            var classes = el.className !== undefined ? el.className.split(" ") : [];
            for (var j = 0, jl = classes.length; j < jl; j++) {
                if (classes[j] === className) {
                    found = true;
                    foundElement = element.childNodes[i];
                    break;
                }
            }
            if (found)
                break;
            recurse(element.childNodes[i], className, found);
        }
    }

    recurse(element, className, false);
    return foundElement;
}

var nowCounter = 1;

//TODO 获得对应位置的curl信息
function addCurl() {
    var csr = nowBt.parentElement.parentElement.lastElementChild;
    now_selctor = nowBt.parentElement.parentElement.children[1].lastChild.lastChild.lastElementChild.value;
    console.log(csr);
    if (nowBt.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild !== null) {
        if (nowBt.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.firstElementChild !== null) {
            if ((nowBt.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.firstElementChild.firstElementChild !== null)) {
                if ((nowBt.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.firstElementChild.firstElementChild.lastElementChild) !== null) {
                    if ((nowBt.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.firstElementChild.firstElementChild.lastElementChild.lastElementChild.value) !== null) {
                        now_command = nowBt.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.firstElementChild.firstElementChild.lastElementChild.lastElementChild.value;
                    }
                }

            }
        }

    }

    console.log(now_command);
    postTheAjax();

    var jelm = $(findClass(csr, 'meresponses-inner'));
    // jelm.remove('.opblock-section-header');
    jelm.remove();
    // $("<div class=\"opblock-section-header\"><h4>Responses</h4><label><span>Response content type</span><div class=\"content-type-wrapper execute-content-type\"><select class=\"content-type\"><option value=\"application/json\">application/json</option><option value=\"application/xml\">application/xml</option></select></div></label></div>").appendTo(csr);
    var jelm2 = $(findClass(csr, 'JArea'));
    jelm2.remove();
    var jelm3 = $(findClass(csr, 'responseCode'));
    jelm3.remove();
    $("<div class='meresponses-inner'><div><h3>Curl</h3><div class=\"copy-paste\"><textarea readonly=\"\" class=\"mecurl\" style=\"white-space: normal;\">" + now_command + "</textarea></div></div></div>").appendTo(csr);

    $("<div class='responseCode'><h3>Response Code: " + responesestatusCode + "</h3></div>").appendTo(csr);

    var now_reuslt_id = 'result' + nowCounter.toString();
    $("<div class='JArea'>" +
        "<pre class='JAresult'>" +
        "</pre>" +
        "</div>").appendTo(csr);

    // var j = {"name": "binchen","name2": "binchen",};
    // j = JSON.stringify(j); // '{"name":"binchen"}'


    $(findClass(csr, 'JAresult')).html(syntaxHighlight(ajaxResponese));


    //发送请求，如果成功则进行填充
    //Ajax 进行请求，发送CURL command string


}

function preLogin() {
    var student = {};
    student.CompanyDB = "SBODEMOUS";
    student.Password = "manager";
    student.UserName = "manager";

    var stu = JSON.stringify(student);
    $.ajax({
        type: "POST",
        url: "https://slcdemo.cfapps.sap.hana.ondemand.com/api_poc/api/b1s/v1/Login",
        dataType: 'json',
        headers: {
            "Content-Type": "application/json",
            "X-Tenant-ID": "1",
            "SCP-Virtual-Host-Token": "a27b0361f160d2ffaa696c51851b2793 "
        },
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: stu,
        success: function (data) {
            //实际操作的时候，返回的json对象中可能会有成功错误的判断标记，所以可能也需要判断一下
            console.log("返回的数据: " + data.SessionId);
            // var message = "SCP-ServiceLayer-Cookie: " + data.SessionId;
            // SweetAlertCookie(data.SessionId);
            // alert(message);
            console.log("返回的数据: " + data.SessionTimeout);
            document.cookie = "B1SESSION=" + (data.SessionId);
            checkAllClick();

        },
        error: function (xhr, textStatus, error) {
            checkAllClick();

            console.log("error");
            console.log(JSON.stringify(xhr.responseJSON));

            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });

}

function sendCookie() {
    var sid = getCookie("B1SESSION");
    console.log(sid);

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/cook",
        dataType: 'json',
        headers: {
            "Content-Type": "application/json",
            "X-Tenant-ID": "1",
            "SCP-Virtual-Host-Token": "a27b0361f160d2ffaa696c51851b2793 "
        },
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            //实际操作的时候，返回的json对象中可能会有成功错误的判断标记，所以可能也需要判断一下
            console.log("返回的数据: " + data);
        },
        error: function (xhr, textStatus, error) {
            alert(JSON.stringify(xhr.responseJSON));

            console.log(JSON.stringify(xhr.responseJSON));
            console.log(textStatus);
            console.log(error);
        }
    });
}

//extend opblock
function clickOpbolck() {
    var t = $('.opblock');
    var a = t * addEventListener("click", clickTryOut());
    console.log(a);
}

//click the try-out__btn
function clickTryOut() {
    var try_out = $('.try-out__btn');
    var a = try_out * addEventListener("click", console.log(try_out.length));
}

var nowBt;

//点击try之后添加一个input框，让用户输入后面的URL
function addInputArea() {
    var tbcs = $('.table-container');

    if ("undefined" !== typeof (tbcs)) {
        for (let i3 = 0; i3 !== tbcs.length; i3++) {

            const tbc = tbcs[i3];
            var rootEl = tbc.parentElement.parentElement.parentElement.parentElement;
            var txtCont = rootEl.children[0].children[1].children[0].children[0].textContent;
            txtCont = txtCont.split('(')[0];
            if ("undefined" === typeof(tbc.visitInput)) {

                tbc.visitInput = true;
                $("<h4>Selector and Filter Here</h4><div class=\"input-group\"><span class=\"input-group-addon\"> " + txtCont + "</span><input type=\"text\" class=\"form-control\" aria-describedby=\"basic-addon3\"></div>").appendTo(tbc);
            }
        }
    }


}


//点击execute
function clickExecuteBt() {
    var executeBts = $('.execute');
    for (var i1 = 0; i1 !== executeBts.length; i1++) {
        if (typeof((executeBts[i1]).visit) === "undefined") {
            nowBt = executeBts[i1];
            executeBts[i1].addEventListener('click', function () {
                addCurl();
            });
        }
        (executeBts[i1]).visit = true;
    }
}

function fillRes(responses_wrapper) {

}

function checkAllClick() {
    addInputArea();
    var h = ('#swagger-ui > section > div.swagger-ui');
    var c = h * addEventListener("click", function () {
        addInputArea();
        clickExecuteBt();

    });

}

function fillSid() {
    document.removeEventListener('change', 'handler');
    var alltable = $('.table-container');
    for (var i = 0; i !== alltable.length; i++) {
        var t = alltable[i];
        var serviceLayer_Cookie = t.lastChild.lastChild.lastChild.lastChild.lastChild;
        window.sid = getCookie("B1SESSION");
        if (typeof(serviceLayer_Cookie.value) !== "undefined") {
            if (serviceLayer_Cookie.value.length < 12) {
                serviceLayer_Cookie.value = 'B1SESSION= ' + window.sid;
                serviceLayer_Cookie.addEventListener('input', function (evt) {
                    console.log('input: ' + this.value);

                });
                console.log('change');
            }
            else {
                console.log('>12');
            }
        }
        else {
            console.log("undefined");
        }

        console.log(window.sid);
    }


}