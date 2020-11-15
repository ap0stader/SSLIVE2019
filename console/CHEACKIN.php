<?php
$a=$_POST['a'];//user
$b=$_POST['b'];//time
$c=$_POST['c'];//1 or token
$random_chars="fsajfsjhs";
 if($c=='1'){
	 //获取模式
	 $r=mt_rand(100,999);//key
	 echo $r.md5($r.$a.$random_chars.$b);
 }else{
	$X=substr($c, 0, 3);//取key
	if($c==$X.md5($X.$a.$random_chars.$b)&&(time()-$b)/86400000<=7){
		//有效
		echo "valid";
	}else{
		//无效token
		echo "true";
		
	}
 }
?>