<?php
//功能: token生成和验证
$a=$_POST['a'];//user
$b=$_POST['b'];//time
$c=$_POST['c'];//1 or token
$random_chars="fsajfsjhs";//字符key
 if($c=='1'){
	 //获取token
	 $r=mt_rand(100,999);//随机key
	 echo $r.md5($r.$a.$random_chars.$b);//输出结果
 }else{
	 //验证token
	$X=substr($c, 0, 3);//取随机key
	if($c==$X.md5($X.$a.$random_chars.$b)&&(time()-$b)/86400000<=7){//用时间戳限制登录时长为最长7天
		//有效
		echo "valid";
	}else{
		//无效token
		echo "true";
		
	}
 }
?>