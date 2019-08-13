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
	'port' => 3306,
 
	// [optional] Table prefix
	'prefix' => '',
 
	// [optional] Enable logging (Logging is disabled by default for better performance)
	'logging' => true,
 
	// [optional] MySQL socket (shouldn't be used with server and port)
	'socket' => '/tmp/mysql.sock',
 
	// [optional] driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
	'option' => [
		PDO::ATTR_CASE => PDO::CASE_NATURAL
	],
 
	// [optional] Medoo will execute those commands after connected to the database for initialization
	'command' => [
		'SET SQL_MODE=ANSI_QUOTES'
	]
]);


// 连接数据库
$con = mysqli_connect("localhost:3306", "root", "lovesuit");

mysqli_select_db($con, "sslive");
if (mysqli_num_rows(mysqli_query($con, "SELECT Id FROM feedback WHERE IP='$ip'")) <= 5) {
    $result = mysqli_query($con, "INSERT INTO feedback VALUES(NULL,'$ip','$title','$content')");
    if (!$result){
        echo "错误！" . mysqli_error($con);
    } else {
        echo "success";
    }
} else {
    echo "您提交了过多的反馈";
}
mysqli_close($con);
