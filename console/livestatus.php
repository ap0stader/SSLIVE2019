<?php
//功能: 开始直播
// 解决跨域问题
header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods:POST');
//用referer防止CSFR跨站攻击，CSFR请自行百度，也有其他方式比如带token，记个代办以后可能补
if( stripos( $_SERVER[ 'HTTP_REFERER' ] ,$_SERVER[ 'SERVER_NAME' ]) !== false ){
	//验证token是否正确
	$a=$_COOKIE["user"];
	$b=$_COOKIE["time"];
	$c=$_COOKIE["token"];
	$X=substr($c, 0, 3);//取key
	$random_chars="fsajfsjhs";//注意这里要和CHEACKIN.php同步
	//验证token md5和过期
	if($c==$X.md5($X.$a.$random_chars.$b)&&(time()-$b)/86400000<=7){
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
		echo "不要尝试在没token的情况下登录了，先去登录吧，刷新下页面就可以登录";
	}
}else{
	echo "求求了别CSRF跨站攻击了";
}
