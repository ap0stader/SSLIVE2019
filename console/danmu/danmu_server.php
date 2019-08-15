<?php
date_default_timezone_set('Asia/Shanghai');
// 创建websocket服务器对象，监听0.0.0.0:9505端口
// https://wiki.swoole.com/wiki/page/14.html
$websocket = new swoole_websocket_server("0.0.0.0", 9505, SWOOLE_PROCESS, SWOOLE_TCP | SWOOLE_SSL);

// 配置证书文件
// https://wiki.swoole.com/wiki/page/274.html
$websocket->set(
    array(
        // https://wiki.swoole.com/wiki/page/278.html
        // 'daemonize' => 1,
        // https://wiki.swoole.com/wiki/page/318.html
        'ssl_cert_file' => './cert/cert.pem',
        'ssl_key_file' => './cert/cert.key',
        // https://wiki.swoole.com/wiki/page/280.html
        'log_file' => './log/log.log'
    )
);

// 监听WebSocket连接打开事件
// https://wiki.swoole.com/wiki/page/401.html
$websocket->on('open', function ($websocket, $request) {
    $file = fopen("./log/php.log", "a");

    fwrite($file, "Open    " . date("Y-m-d H:i:s", $request->server['request_time']) . "    " . $request->server['remote_addr'] . "    " .  $request->fd . "\n");
});

// 监听WebSocket消息事件
// https://wiki.swoole.com/wiki/page/402.html
$websocket->on('message', function ($websocket, $frame) {
    $file = fopen("./log/danmu.log", "a");
    // https://wiki.swoole.com/wiki/page/24.html
    // https://wiki.swoole.com/wiki/page/987.html
    fwrite($file, "Send    " . date("Y-m-d H:i:s") . "    " . $websocket->getClientInfo($frame->fd)["remote_ip"] . "    " . $frame->fd . "    " . $frame->data . "    " . "\n");
    $data = json_decode($frame->data);
    if ($data->command == 'send') {
        // TODO 加入审查代码
        $send = json_encode($data->data);
        // 遍历所有连接，循环广播
        // https://wiki.swoole.com/wiki/page/427.html
        foreach ($websocket->connections as $fd) {
            $websocket->push($fd, '{"todo":"add","origin":"null","data":' . $send . '}');
        }
        $websocket->push($fd, '{"todo":"response-send","origin":"send","data":"success"}');
    }
});

// 监听WebSocket连接关闭事件
// https://wiki.swoole.com/wiki/page/p-event/onClose.html
$websocket->on('close', function ($websocket, $fd) {
    $file = fopen("./log/php.log", "a");
    fwrite($file, "Shut    " . date("Y-m-d H:i:s", $websocket->getClientInfo($fd)["last_time"]) . "    " . $websocket->getClientInfo($fd)["remote_ip"] . "    " . $fd . "\n");
});

$websocket->start();
