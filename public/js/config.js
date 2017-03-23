require.config({
	baseUrl:'/public',
	paths:{
		jquery:'assets/jquery/jquery.min',
		cookie:'assets/jquery-cookie/jquery.cookie',
		echarts:'assets/echarts/echarts.min',
		template:'assets/artTemplate/template',
		bootstrap:'assets/bootstrap/js/bootstrap',
		nprogress:'assets/nprogress/nprogress',
		datepicker:'assets/bootstrap-datepicker/js/bootstrap-datepicker',
		language:'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		validate : 'assets/validate/jquery-validate',
		uploadify : 'assets/uploadify/jquery.uploadify',
		region : 'assets/jquery-region/jquery.region',
		ckeditor : 'assets/ckeditor/ckeditor',
		form : 'assets/jquery-form/jquery.form',
		util:'js/util',
		overlay:'js/overlay'
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		},
		language:{
			deps:['jquery','datepicker']
		},
		validate:{
			deps:['jquery']
		},
		uploadify:{
			deps:['jquery']
		},
		ckeditor:{
			exports:'CKEDITOR',
			deps:['jquery']
		}
	}
})