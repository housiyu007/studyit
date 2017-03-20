define(['jquery','echarts','cookie','overlay'],function($,echarts){


	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	var pathname = location.pathname;

	var flag = $.cookie('PHPSESSID');
	if(!flag && pathname.indexOf('login') == -1){
		location.href = '/login'
	}

        $("#loginform").submit(function(){
            var forData = $(this).serialize();
            $.ajax({
                type:'post',
                url:'/api/login',
                data:forData,
                dataType:'json',
                success:function(data){
                    if(data.code==200){
                        var logInfo = JSON.stringify(data.result);
                        $.cookie('logInfo',logInfo,{path:'/'});
                        location.href='/index/index';
                    }
                },
                error:function(){
                    alert('请输入正确的用户名&密码');
                }
            })

            return false;
        })

$("#logoutId").click(function(){
	$.ajax({
		type:"post",
		url:"/api/logout",
		dataType:"json",
		success:function(data){
			location.href="/login";
		}
	})
})

	    var obj = JSON.parse($.cookie('logInfo'));
    $('.aside .profile img').attr('src', obj.tc_avatar);
    $('.aside .profile h4').html(obj.tc_name);



});
