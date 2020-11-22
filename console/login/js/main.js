function htmlSpecialChars(str)  
//来源 https://www.cnblogs.com/web-leader/p/4742362.html  
    {    
            var s = "";  
            if (str.length == 0) return "";  
            for   (var i=0; i<str.length; i++)  
            {  
                switch (str.substr(i,1))  
                {  
                    case "<": s += "&lt;"; break;  
                    case ">": s += "&gt;"; break;  
                    case "&": s += "&amp;"; break;  
                    case " ":  
                        if(str.substr(i + 1, 1) == " "){  
                            s += " &nbsp;";  
                            i++;  
                        } else s += " ";  
                        break;  
                    case "\"": s += "&quot;"; break;  
                    case "\n": s += "<br>"; break;  
                    default: s += str.substr(i,1); break;  
                }  
            }  
            return s;  
        }  
function load() {
    //验证token
    if ($.cookie('user') != null && $.cookie('token') != null && $.cookie('time') != null) {
        $.post("../CHEACKIN.php", {
            a: $.cookie('user'),
            b: $.cookie('time'),
            c: $.cookie('token')
        },
        function(result) {
            if (result == "valid") {
                sucess($.cookie('user'));
            }
        });
    }
    //加载遮蔽罩关闭
    $('#loading').hide();
}
document.onkeydown = function() {
    //回车提交
    if (event.keyCode == 13) {
        $('#bu').click();
    }
}
function sucess(name = $('#um').val()) {
    let now = (new Date()).getTime();
    //取token 设置cookie
    $.post("../CHEACKIN.php", {
        a: name,
        b: now,
        c: '1'
    },
    function(result) {
        $.cookie('user', name, {
            expires: 7,
            path: '/'
        });
        $.cookie('token', result, {
            expires: 7,
            path: '/'
        });
        $.cookie('time', now, {
            expires: 7,
            path: '/'
        });
        window.location.href = "../console.html";
    });
}
function submita() {
    //显示加载特效
    $('#loading').show();
    //用jq取值
    let username = $('#um').val();
    let password = $('#pd').val();
	//这里调用了用户输入，本应该进行安全排查替换，但是本处暂时没在php中用，所以就执行了简易的替换，希望注意用户输入，
	//本处可能出现的漏洞参考XSS跨站攻击，务必谨慎
	//其实因为下面有加密，此处的替换也可有可无了，但是以防止下面的if语句出现问题还是替换一下
	username=htmlSpecialChars(username); 
	password=htmlSpecialChars(password);
    if (username == "" || password == "") {
        $("#tips").text("密码或用户名不能为空");
        $('#loading').hide();
    } else {
		//用加密传输可以避免一定程度的暴力破解密码，参考Burp Suite
		//也可以防止一些XSS跨站攻击命令的执行
        let str = username + '#' + password;
        let mean = 1; //模式选择
        let ciphertext = '';
        switch (mean) {
        case 1:
            //md5加密
            ciphertext = $.md5(str);
            break;
        case 2:
            //sha256加密
            ciphertext = sha256_digest(str);
            break;
        }
        SHOWING = $.ajax({
            type: "POST",
            url: './Verify.php',
            async: true,
            //使用异步的方式,true为异步方式
            data: {
                'PW': ciphertext,
                'MEAN': mean
            },
            success: function(result) {
                if (result == "success") {
                    $("#tips").text("用户名和密码正确");
                    setTimeout('sucess()', 1000);
                } else {
                    $("#tips").text("密码或用户名错误");
                }
            },
            error: function() {
                $("#tips").text('服务器或网络异常')
            }
        });
        $.when(SHOWING).done(function() {
            $('#loading').hide();
        });
    }
}