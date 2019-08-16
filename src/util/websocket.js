// websocket.js
// 建立WebSocket
var websocket;

function create_socket() {
    websocket = new WebSocket('wss://backend.ssersay.cn:9505');
    websocket.onmessage = function (evt) {
        var json = $.parseJSON(evt.data);
        // 请在此处注册利用websocket的各个事件
        if (json.todo == "add_danmu") {
            add_danmu(json.data.text, json.data.color, json.data.size, json.data.position);
        } else if (json.todo == "response") {
            switch (json.origin) {
                case "send_danmu":
                    send_danmu_response(json.data)
                    break;
                default:
                    console.log("todo:" + json.todo);
                    console.log("origin:" + json.origin);
                    console.log("data:" + json.data);
                    break;
            }
        }
    };
    websocket.onerror = function (evt) {
        window.alert("WebSocket服务发生了错误，请您在页面底部找到问题反馈进行反馈");
    };
    websocket.onopen = function (evt) {
        console.log("Open");

    }
    websocket.onclose = function (evt) {
        console.log(evt);
        create_socket();
    };
}