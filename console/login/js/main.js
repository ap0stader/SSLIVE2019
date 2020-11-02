	function load(){
		if($.cookie('token')=="yes"){
			sucess($.cookie('user'));
		}
		$('#loading').hide();
	}
	document.onkeydown=function(){ss()}
	function ss()
	{
		if(event.keyCode==13)
		{
			$('#bu').click();
		}
	}
	function sucess(name=$('#um').val()){
		$.cookie('user',name,{ expires: 7 , path: '/' })
		$.cookie('token', 'yes', { expires: 7 , path: '/' });
		window.location.href="../console.html";
	}
	function submita(){
		//显示加载特效
		$('#loading').show();
		let username = $('#um').val();
		let password = $('#pd').val();
		let str = username + '#' + password;
		let mean=2;//模式选择
		let ciphertext='';
		switch(mean){
			case 1://md5加密
			ciphertext = $.md5(str);
			break;
			case 2://sha256加密
			ciphertext = sha256_digest(str);
			break;
		}
		SHOWING=$.ajax({
                type: "POST",
                url: './Verify.php',
				async:true,  //使用异步的方式,true为异步方式
                data: {'PW':ciphertext,'MEAN':mean},
                success: function (result) {
                    if(result=="success"){
						$("#tips").text("密码正确");
						setTimeout('sucess()', 1000);
					}else{
						$("#tips").text("密码或用户名错误");
					}
                },
                error: function() {
					//本地模式(无php状态下),不能用sha256,会被解密
					if(mean==1&&ciphertext=="86a18ddedabf5be9c8bb16f53de79986"){
						setTimeout('sucess()', 1000);
					}else{
						alert('服务器或网络异常')
					}
                }
            });
			$.when(SHOWING).done(function () {
				$('#loading').hide();
			});
		
	}