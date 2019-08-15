// Console版
// 建立WebSocket
var websocket = new WebSocket('wss://backend.ssersay.cn:9505');

websocket.onopen = function (evt) {
    console.log("Open");
};

websocket.onmessage = function (evt) {
    console.log("Retrieved data from server: " + evt.data);
    var json = $.parseJSON(evt.data);
    console.log("todo:" + json.todo);
    console.log("origin:" + json.origin);
    console.log("data:" + json.data);
};

websocket.onclose = function (evt) {
    console.log("Disconnected");
};

websocket.onerror = function (evt, e) {
    console.log('Error occured: ' + evt.data);
};

function send() {
    // 合成data字符串
    var data_obj = '{"text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '"}';
    websocket.send('{"command":"send","data":' + data_obj + '}');
}