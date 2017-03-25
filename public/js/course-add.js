define(['jquery','util','validate','form'],function($,util){
	util.showMes('/course/add');

	$("#courseForm").validate({
		sendForm:false,
		valid:function(){
			$(this).ajaxSubmit({
				type:'post',
				url:'/api/course/create',
				dataType:'json',
				success:function(data){
					console.log(data);
					if(data.code==200){
						location.href='/course/basic?cs_id=' + data.result.cs_id;
					}
				}
			});
		}
	});
});