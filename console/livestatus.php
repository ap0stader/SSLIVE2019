<?php
// 解决跨域问题
header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods:POST');
//判断post来源
if(strpos($_SERVER['HTTP_REFERER'],$_SERVER['HTTP_HOST'])){
	
	// 获取POST中的cmd数据
$cmd = $_POST["cmd"];
// 读取livestatus.json文件
$json_string = file_get_contents("./livestatus.json");
// 将JSON转化为PHP对象
$data = json_decode($json_string);
// 为Live赋值
$data->Live = ($cmd == "start");
// 将PHP对象转化为JSON
$json_strings = json_encode($data);
// 写入livestatus.json文件
$code = file_put_contents("./livestatus.json", $json_strings);
if ($code > 0) {
   echo "success";
} else {
   echo $code;
}	
}else{
echo '来源不明';
}
