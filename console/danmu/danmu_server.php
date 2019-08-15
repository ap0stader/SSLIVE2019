<?php
// 创建websocket服务器对象，监听0.0.0.0:9505端口
// https://wiki.swoole.com/wiki/page/14.html
$websocket = new swoole_websocket_server("0.0.0.0", 9505, SWOOLE_PROCESS, SWOOLE_TCP | SWOOLE_SSL);

// 配置证书文件
// https://wiki.swoole.com/wiki/page/274.html
$websocket->set(
    array(
        // https://wiki.swoole.com/wiki/page/278.html
        'daemonize' => 1,
        // https://wiki.swoole.com/wiki/page/318.html
        'ssl_cert_file' => './cert/cert.pem',
        'ssl_key_file' => './cert/cert.key',
        // https://wiki.swoole.com/wiki/page/280.html
        'log_file' => './log/log.log'
    )
);

//监听WebSocket连接打开事件
$websocket->on('open', function ($websocket, $request) {
    file_put_contents("./log/php.log", date("Y-m-d H:i:s", $request->server['request_time']) + "    " + $request->server['remote_addr'] + "    " +  $request->fd);
    $websocket->push("OpenSuccessful");
});

//监听WebSocket消息事件
$websocket->on('message', function ($websocket, $frame) {
    // //记录收到的消息，可以写到日志文件中
    // echo "Message: {$frame->data}\n";

    // //遍历所有连接，循环广播
    // foreach ($websocket->connections as $fd) {
    //     //如果是某个客户端，自己发的则加上isnew属性，否则不加
    //     if ($frame->fd == $fd) {
    //         $websocket->push($frame->fd, $frame->data . ',"isnew":""');
    //     } else {
    //         $websocket->push($fd, "{$frame->data}");
    //     }
    // }
});

//监听WebSocket连接关闭事件
$websocket->on('close', function ($websocket, $fd) {
    
});

$websocket->start();
