define(['jquery','template','util','bootstrap','validate','form'],function($,template,util){
	util.showMes('/course/add');
	var cs_id=util.ps('cs_id');

	//渲染页面
	$.ajax({
		type:'get',
		url:'/api/course/lesson',
		data:{cs_id:cs_id},
		dataType:'json',
		success:function(data){
			if(data.code==200){
				var html = template('lessonTpl',data.result);
				$("#lessonInfo").html(html);

				//添加课时
				$("#addLesson").click(function(){
					var html = template('lessonModalTpl',{operation:'添加课时'});
                    $('#lessonModalInfo').html(html);
                    $("#lessonModal").modal();
                    //提交添加信息
					courseTime('/api/course/chapter/add');
				})

				//编辑课时
				$(".editLesson").click(function(){
					var ctId = $(this).attr('data-ctId');
					$.ajax({
						type:'get',
						url:'api/course/chapter/edit',
						data:{ct_id:ctId},
						dataType:'json',
						success:function(data){
							data.result.operation='编辑课时';
							var html = template('lessonModalTpl',data.result);
							$("lessonModalInfo").html(html);
							//提交编辑信息
							courseTime('/api/course/chapter/modify');
							$("#lessonModal").modal();
						}
					})
				})

				//提交
				function courseTime(url){
					$("#lessonForm").validate({
							sendForm:false,
							valid:function(){
		                        var free = $('#isFree').prop('checked')?1:0;
								$(this).ajaxSubmit({
									type:'post',
									url:url,
									dataType:'json',
									data:{ct_cs_id:cs_id,ct_is_free:free},
									success:function(data){
										if(data.code == 200){
		                                        location.href = '/course/lesson?cs_id=' + cs_id;
		                                    }
									}
								})
							}
						})
				}
			}
		}
	})
})