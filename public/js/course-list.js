define(['jquery','template','util'],function($,template,util){
	util.showMes('/course/list');

	$.ajax({
		type:'get',
		url:'/api/course',
		dataType:'json',
		success:function(data){
			if(data.code==200){
				console.log(data.result);
				var html = template('listTpl',{list:data.result});
				$("#listInfo").html(html);
			}
		}
	});
})