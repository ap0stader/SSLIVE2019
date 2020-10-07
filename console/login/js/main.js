function load(){
	if($.cookie('ver')=="yes"){
	sucess();
	}
	}
	function sucess(){
		$.cookie('ver', 'yes', { expires: 7 , path: '/' });
		window.location.href="../console.html";
	}
	function submita(){
		let username = $('#um').val();
		let password = $('#pd').val();
		let str = username + '#' + password;
		let ciphertext = $.md5(str);
		if(ciphertext=="5453077ed8f5377a0319605198cd1e2a"){
			$("#tips").text("密码正确");
			setTimeout('sucess()', 1000);
		}else{
			$("#tips").text("密码或用户名错误");
		}
	}