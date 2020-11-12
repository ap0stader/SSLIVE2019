<?php
$user=array('suit');
$pw=array('lovesuit');
for($x=0;$x<count($user);$x++)
{
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