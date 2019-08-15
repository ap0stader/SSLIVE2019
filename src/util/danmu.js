// danmu.js
// 弹幕有关函数
function add_danmu(text, color, size, position) {
    
}

function send_danmu(text, color, size, position) {
    // 合成data字符串
    var data_obj = '{"text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '"}';
    websocket.send('{"command":"send_danmu","data":' + data_obj + '}');
}

function send_danmu_response(data) {
    
}