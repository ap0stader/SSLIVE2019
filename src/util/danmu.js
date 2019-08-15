// danmu.js
// 弹幕有关函数，仅针对live.html页面
create_socket();

function add_danmu(text, color, size, position) {
    var time = $('#danmu').data("nowTime") + 1;
    $("#danmu").danmu("addDanmu", [
        { "text": text, "color": color, "size": size, "position": position, "time": time }
    ]);
}

// send_danmu("Hello", "white", 1, 0)
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