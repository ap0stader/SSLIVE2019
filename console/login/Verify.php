<?php
$user=array('suit');
$pw=array('lovesuit');
for($x=0;$x<count($user);$x++)
{
    if($_POST['PW']==md5($user[$x].'#'.$pw[$x])){
		echo "success";
		break;
	}
}

?>