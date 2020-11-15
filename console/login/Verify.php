<?php
$user=array('suit');
$pw=array('lovesuit');
//循环账号密码(字典)集
for($x=0;$x<count($user);$x++)
{
	//验证账号密码是否正常
    if($_POST['MEAN']==1&&$_POST['PW']==md5($user[$x].'#'.$pw[$x])){
		echo "success";
		break;
	}else if($_POST['MEAN']==2){
		if($_POST['PW']==hash("sha256", $user[$x].'#'.$pw[$x])){
			echo "success";
			break;
		}
	}
}

?>