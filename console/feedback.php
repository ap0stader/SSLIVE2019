<?php
// 解决跨域问题
header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods:POST');

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

// 使用Medoo框架
require  './lib/Medoo.php';

use Medoo\Medoo;

// 新建Medoo对象
$database = new Medoo([
    'database_type' => 'mysql',
    'database_name' => 'sslive',
    'server' => 'feedback.ssersay.cn',
    'username' => 'root',
    // TOOO 填写数据库密码
    'password' => 'PASSWORD',
    'charset' => 'utf8',
    'port' => 3309,
]);

// 查询该IP提交的反馈总数
$count = $database->count("feedback", [
    "ip" => $ip,
]);

// 如果该IP提交的反馈总数在20以内则调用Medoo写入数据库
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
