// danmu.js
// 弹幕有关函数，仅针对live.html页面
create_socket();

function add_danmu(text, color, size, position) {
    console.log(text + color + size + position)
}

// send_danmu("Hello", "Red", "Big", "Center")
function send_danmu(text, color, size, position) {
    // 合成data字符串
    var data_obj = '{"text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '"}';
    websocket.send('{"command":"send_danmu","data":' + data_obj + '}');
}

function send_danmu_response(data) {
    console.log(data);
}

websocket.onopen = function (evt) {
    console.log("open");
};

websocket.onclose = function (evt) {
    console.log("close");
};