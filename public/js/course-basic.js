define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){

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

			//子集分类处理
			$("#topCategory").change(function(){
				var cg_id = $(this).val();
				$.ajax({
                    type : 'get',
                    url : '/api/category/child',
                    data : {cg_id:cg_id},
                    dataType : 'json',
                    success : function(data){
                        var tpl = '{{each list as item}}<option value="{{item.cg_id}}">{{item.cg_name}}</option>{{/each}}';
                        var render = template.compile(tpl);
                        var html = render({list:data.result});
                        $('#childCategory').html(html);
                    }
                });
			});

			//富文本
			CKEDITOR.replace('ckeditor',{
                toolbarGroups : [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] }
                ]
            });

			$("#basicForm").validate({
				sendForm:false,
				valid:function(){
					// 同步更新富文本的内容变化
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
					$(this).ajaxSubmit({
						type:'post',
						url:'/api/course/update/basic',
						dataType:'json',
						success:function(data){
							if(data.code==200){
								location.href='/course/picture?cs_id=' + data.result.cs_id;
							}
						}
					});
				}
			});

		}
	});

});