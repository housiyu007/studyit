//添加讲师
define(['jquery','util','template','datepicker','language','validate','form'],function($,util,template){

	util.setMenu('/teacher/list');
	
	var tc_id = util.ps('tc_id');
	if(tc_id){
		$.ajax({
			type:'get',
			url:'/api/teacher/edit',
			data:{tc_id:tc_id},
			dataType:'json',
			success:function(data){
				data.result.tInfo = "编辑讲师";
				var html = template('teacherEdit',data.result);
				$('#teacherInfo').html(html);
				checkForm('/api/teacher/update');
			}
		});
	}else{
		var html = template('teacherEdit',{tInfo:'添加讲师',tc_gender:0});
		$('#teacherInfo').html(html);
		checkForm('/api/teacher/add');
	}


	//表单验证方法
	function checkForm(url){
		$("#teacherForm").validate({
			sendForm:false,
			valid:function(){
				$(this).ajaxSubmit({
					type:'post',
					url:url,
					dataType:'json',
					success:function(data){
						if(data.code == 200){
                            location.href = '/teacher/list';
                        }
					}
				})
			},
            eachInvalidField : function(){
                $(this).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            eachValidField : function(){
                $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
            },
            description : {
                tcName : {
                    required : '用户名不能为空'
                },
                tcPass : {
                    required : '密码不能为空',
                    pattern : '只能是六位数字'
                },
                joinDate : {
                    required : '入职日期不能为空'
                }
            }
		})
	}
});