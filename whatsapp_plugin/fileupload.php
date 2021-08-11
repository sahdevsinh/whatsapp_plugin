<?php 
require_once(__DIR__ . '/../../config.php');
require_once($CFG->libdir.'/clilib.php');      // cli only functions
require_once($CFG->libdir.'/cronlib.php');
global $DB;
if(!empty($_GET['id'])){
	$setting = $DB->get_records_sql('select * from '.$CFG->prefix.'whatsappkey where id='.$_GET['id']);
}else{
	$setting = $DB->get_records('whatsappkey');
}
foreach($setting as $s){
		$instanceId=$s->instanceid;
		$token=$s->token;
	}
	$files = scandir('uploadfile/');
	foreach($files as $f){
		if($f!='.' || $f!='..'){
			unlink("uploadfile/".$f);
		}
	}
if(!empty($_FILES['messagefile'])){
	$file_name=$_FILES['messagefile']['name'];
    $file_size=$_FILES['messagefile']['size'];
    $file_tmp=$_FILES['messagefile']['tmp_name'];
    $file_type=$_FILES['messagefile']['type'];
   $file_ext=strtolower(end(explode('.',$_FILES['messagefile']['name'])));
   move_uploaded_file($file_tmp,"uploadfile/".$file_name);
	$type = pathinfo("uploadfile/".$file_name, PATHINFO_EXTENSION);
	$data = file_get_contents("uploadfile/".$file_name);
	$base64 = 'data:@file/'. $type .';base64,' . base64_encode($data);
	$chatIdlist=explode(",",$_REQUEST['sendphones']);
	foreach($chatIdlist as $valnew){//
		if($valnew!=0 && !empty($valnew)){
			$data =json_encode(array('chatId'=>$valnew,'body'=>$base64,"filename"=>$file_name));
			$url = 'https://api.chat-api.com/instance'.$instanceId.'/sendFile?token='.$token;
			// Make a POST request
			$options = stream_context_create(['http' => [
					'method'  => 'POST',
					'header'  => 'Content-type: application/json',
					'content' => $data
				]
			]);
			// Send a request
			$result = file_get_contents($url, false, $options);
			var_dump($result);
		}
	}
	//unlink("uploadfile/".$file_name);
}
if(!empty($_REQUEST['fileurlin'])){
	$file_name=$_FILES['data']['name'];
    $file_tmp=$_FILES['data']['tmp_name'];
	$file_ext=strtolower(end(explode('.',$_FILES['data']['name'])));
	move_uploaded_file($file_tmp,"uploadfile/".$file_name.".ogg");
	$type = pathinfo("uploadfile/".$file_name.".ogg", PATHINFO_EXTENSION);
	$data = file_get_contents("uploadfile/".$file_name.".ogg");
	$base64 = 'data:@file/'. $type .';base64,' . base64_encode($data);
	$chatIdlist=explode(",",$_REQUEST['sendphones']);
	foreach($chatIdlist as $valnew){
			$data =json_encode(array('chatId'=>$valnew,'body'=>$base64,'caption'=>$_REQUEST['duration'],"filename"=>$file_name.'.ogg'));
			$url = 'https://api.chat-api.com/instance'.$instanceId.'/sendFile?token='.$token;
			// Make a POST request
			$options = stream_context_create(['http' => [
					'method'  => 'POST',
					'header'  => 'Content-type: application/json',
					'content' => $data
				]
			]);
			// Send a request
			$result = file_get_contents($url, false, $options);
			var_dump($result);
	}
	//		unlink("uploadfile/".$file_name);
}