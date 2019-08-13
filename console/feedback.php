<?php
// 读取POST中的数据
$ua = $_POST["ua"];
$browser = $_POST["browser"];
$version = $_POST["version"];
$engine = $_POST["engine"];
$os = $_POST["os"];
$osVersion = $_POST["osVersion"];
$device = $_POST["device"];
$text = $_POST["text"];
$ip = $_SERVER['REMOTE_ADDR'];

require  './Medoo.php';

use Medoo\Medoo;

$database = new Medoo([
    // required
    'database_type' => 'mysql',
    'database_name' => 'sslive',
    'server' => 'feedback.ssersay.cn',
    'username' => 'root',
    'password' => 'lovesuit',

    // [optional]
    'charset' => 'utf8',
    'port' => 3309,
]);

$count = $database->count("feedback", [
    "ip" => $ip,
]);

if ($count < 20) {
    $result = $database->insert("feedback", [
        "ua" => $ua,
        "browser" => $browser,
        "version" => $version,
        "engine" => $engine,
        "os" => $os,
        "osVersion" => $osVersion,
        "device" => $device,
        "text" => $text,
        "ip" => $ip,
    ]);

    if ($database->error()[1] == NULL) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo "up";
}
