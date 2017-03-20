define(['jquery', 'template', 'util','overlay'], function($, template, util) {
    util.showMes(location.pathname);

    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function(data) {
            var html = template("teacherlistId", { list: data.result });
            $("#teacherList").html(html);

            //查看讲师信息
            $(".teacherBtn").find("a:eq(0)").click(function() {
                var tcId = $(this).parent().attr("data-tcid");
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: { tc_id: tcId },
                    dataType: 'json',
                    success: function(data) {
                        if (data.code == 200) {
                            data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g, ' ');
                            var html = template('teachermesId', data.result);
                            $("#teacherModalMes").html(html);
                            //模块显示
                            $("#teacherModal").modal();
                        }
                    }
                })

            });

            //启用和注销讲师
            $(".teacherBtn").find("a:eq(2)").click(function() {
                var tc_id = $(this).parents('td').attr("data-tcid");
                var tc_status = $(this).parents('td').attr("data-status");
                var that = this;
                $.ajax({
                    typs: 'post',
                    url: '/api/teacher/handle',
                    data: { tc_id: tc_id, tc_status: tc_status },
                    dataType: 'json',
                    success: function(data) {
                        // console.log(data.result);
                        if (data.result.tc_status == 0) {
                            $(that).text('启 用');
                        } else {
                            $(that).text('注 销');
                        }
                        $(that).parents('td').attr('data-status', data.result.tc_status);
                    }
                })
            });
        }
    })
})
