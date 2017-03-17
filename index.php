


<?php 
	$path = 'index';
	$filename = 'index';
if(array_key_exists('PATH_INFO',$_SERVER)){//判断路径是否存在
	$url=$_SERVER['PATH_INFO'];//获取根目录之后的路径
	$str = substr($url,1);//去掉第一个字符串截取
	$arr = explode('/',$str);//按照/来分割字符串成数组
	if(count($arr)==2){
		$path = $arr[0];
		$filename = $arr[1];
	}
}else{
	$filename = 'login';
}
include('./view/'.$path.'/'.$filename.'.html');//载入页面
 ?>