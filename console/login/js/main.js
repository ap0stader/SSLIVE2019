	function load(){
		if($.cookie('token')=="yes"){
			sucess($.cookie('user'));
		}
	}
	function sucess(name=$('#um').val()){
		$.cookie('user',name,{ expires: 7 , path: '/' })
		$.cookie('token', 'yes', { expires: 7 , path: '/' });
		window.location.href="../console.html";
	}
	function submita(){
		let username = $('#um').val();
		let password = $('#pd').val();
		let str = username + '#' + password;
		let ciphertext = $.md5(str);
		$.ajax({
                type: "POST",
                url: './Verify.php',
				async:true,  //使用异步的方式,true为异步方式
                data: {'PW':ciphertext},
                success: function (result) {
                    if(result=="success"){
						$("#tips").text("密码正确");
						setTimeout('sucess()', 1000);
					}else{
						$("#tips").text("密码或用户名错误");
					}
                },
                error: function() {
					//本地模式(无php状态下)
					if(ciphertext=="86a18ddedabf5be9c8bb16f53de79986"){
						setTimeout('sucess()', 1000);
					}else{
						alert('网络异常')
					}
                }
            });
	}