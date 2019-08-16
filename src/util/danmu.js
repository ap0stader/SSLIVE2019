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
    } else if (data == 'block') {
        window.alert('您的弹幕涉嫌违规，已屏蔽，请注意您的言行！！！')
    } else if (data == 'failed') {
        window.alert('您的弹幕发送失败，请您在页面底部找到问题反馈进行反馈。')
    }
}