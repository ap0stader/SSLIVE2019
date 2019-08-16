// danmu.js
// 弹幕有关函数，仅针对live.html页面

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
    if (data == "success") {
        growl.show({ text: "弹幕发送成功！", type: "custom", imgsrc: "/src/img/growl/ok.gif", autoclose: 1000 });
    }
    // TODO 增加处理审查的代码
}