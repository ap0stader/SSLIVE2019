	function load(){
		//验证token
		if($.cookie('user')!=null&&$.cookie('token')!=null&&$.cookie('time')!=null){
			$.post("../CHEACKIN.php",{a:$.cookie('user'),b:$.cookie('time'),c:$.cookie('token')},function(result){
				if(result=="valid"){
					sucess($.cookie('user'));
				}
			});
		}
		//加载遮蔽罩关闭
		$('#loading').hide();
	}
	document.onkeydown=function(){
		//回车提交
		if(event.keyCode==13)
		{
			$('#bu').click();
		}
	}
	function sucess(name=$('#um').val()){
		let now=(new Date()).getTime();
		//取token 设置cookie
		$.post("../CHEACKIN.php",{a:name,b:now,c:'1'},function(result){
			$.cookie('user',name,{ expires: 7, path: '/' });
			$.cookie('token', result, { expires: 7, path: '/' });
			$.cookie('time',now,{ expires: 7, path: '/' });
			window.location.href="../console.html";
		});
	}
	function submita(){
		//显示加载特效
		$('#loading').show();
		//用jq取值
		let username = $('#um').val();
		let password = $('#pd').val();
		if(username==""||password==""){
			$("#tips").text("密码或用户名不能为空");
			$('#loading').hide();
		}else{
			let str = username + '#' + password;
			let mean=1;//模式选择
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
							$("#tips").text("用户名和密码正确");
							setTimeout('sucess()', 1000);
						}else{
							$("#tips").text("密码或用户名错误");
						}
					},
					error: function() {
						$("#tips").text('服务器或网络异常')
					}
				});
				$.when(SHOWING).done(function () {
					$('#loading').hide();
				});
		}
	}