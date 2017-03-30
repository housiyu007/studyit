define(['jquery', 'template', 'util','uploadify'], function($, template, util) {
    util.showMes('/course/add');
    var cs_id = util.ps('cs_id');

    //渲染页面
    $.ajax({
        type: 'get',
        url: '/api/course/picture',
        data: { cs_id: cs_id },
        dataType:'json',
        success: function(data) {
            var html = template('pictureTpl', data.result);
            $("#pictureInfo").html(html);

            // var preview = $('.preview img'),jcrop_api;

            // 上传图片
            $('#upfile').uploadify({
                width : 80,
                height : 'auto',
                buttonText : '选择图片',
                buttonClass : 'btn btn-success btn-sm',
                fileObjName:'cs_cover_original',
                itemTemplate : '<span></span>',
                formData : {cs_id:cs_id},
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/cover',
                onUploadSuccess : function(file,data){
                    data = JSON.parse(data);
                    $('.preview img').attr('src',data.result.path);
                    $('#cropPic').prop('disabled',false);
                }
            });
        }
    })
})
