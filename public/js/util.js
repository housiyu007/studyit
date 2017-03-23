define(['jquery'], function($) {

    return {
        showMes: function(pathname) {
            $(".navs a[href='" + pathname + "']").addClass("active").closest().show();
        },
        ps:function(pname){
        	var pathname = location.search;
        	pathname = pathname.slice(1);
        	var obj = {};
			if(pathname){
				var arr = pathname.split('&');
				for(var i=0;i<arr.length;i++){
					var key = arr[i].split('=');
					obj[key[0]] = key[1];
				}
			}
			return obj[pname];
        }
    }
})
