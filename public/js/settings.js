define(['jquery', 'template', 'ckeditor', 'region', 'validate', 'form', 'datepicker', 'language', 'uploadify'], function($,template,CKEDITOR) {
    //查询个人信息
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function(data) {
            var html = template('settingsTpl', data.result);
            $("#settingsInfo").html(html);

            // //文件上传
            // $("#upfile").uploadify({
            //     width: 120,
            //     height: 120,
            //     buttonText: '',
            //     fileObjName: 'tc_avatar',
            //     swf: '/public/assets/uploadify/uploadify.swf',
            //     uploader: '/api/uploader/avatar',
            //     onUploadSuccess: function(file, data) {
            //         data = JSON.parse(data);
            //         $('.preview img').attr('src',data.result.path);
            //     }
            // })

            //三级联动
            $(".hometown").region({
                url: '/public/assets/jquery-region/region.json'
            });

            //富文本处理
            CKEDITOR.replace('ckeditor', {
                toolbarGroups: [
                    { name: 'clipboard', groups: ['clipboard', 'undo'] },
                    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] }
                ]
            });


            //表单提交
            $("#settingsForm").validate({
                sendForm: false,
                valid : function() {
                	
                    for (var instance in CKEDITOR.instances) {
                        CKEDITOR.instances[instance].updateElement();
                    }

                    var p = $("#p").find('option:selected').text();
                    var c = $("#c").find('option:selected').text();
                    var d = $("#d").find('option:selected').text();
                    var hometown = p + '|' + c + '|' + d;

                    $(this).ajaxSubmit({
                        type: 'post',
                        url: '/api/teacher/modify',
                        data: {tc_hometown : hometown},
                        dataType: 'json',
                        success: function(data) {
                            if(data.code == 200){
                            	location.href='#';
                            }
                        }
                    });
                }
            });
        }
    })
})
