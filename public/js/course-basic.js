define(['jquery','template','util'],function($,template,util){

	util.showMes('/course/add');

	var cs_id = util.ps('cs_id');

	//渲染页面
	$.ajax({
		type:'get',
		url:'/api/course/basic',
		data:{cs_id:cs_id},
		dataType:'json',
		success:function(data){
			var html = template('basicTpl',data.result);
			$("#basicInfo").html(html);
		}
	})

})