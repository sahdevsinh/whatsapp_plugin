<?php
/**
 * @package     local_whatsapp
 * @author      Albedous
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @var stdClass $plugin
 */
require_once(__DIR__ . '/../../config.php');
global $DB,$CFG,$SITE,$USER;
 if(!($USER->id>0)){
	 header('location:'.new moodle_url('/'));
	die();
 }
$faviconurl=($DB->get_records_sql('select * from '.$CFG->prefix.'files where filearea="favicon" and component="theme_'.$CFG->theme.'" limit 1'));
$faviname="";
foreach($faviconurl as $tr){
	$faviname=($tr->filename);
}
//echo 'https://cerapoda.com/moodle/pluginfile.php/1/theme_edumy/favicon/1625224308/sigma.png<br>';
$PAGE->set_url(new moodle_url('/blocks/whatsapp_plugin/whatsapp.php'));
$PAGE->set_context(\context_system::instance());
$title = get_string('headerlogo', 'theme_'.$PAGE->theme->name);
if(empty($_GET['id'])){
	$setting = $DB->get_records_sql('select * from '.$CFG->prefix.'whatsappkey limit 1');
}else{
	$setting = $DB->get_records_sql('select * from '.$CFG->prefix.'whatsappkey where id='.$_GET['id']);
}
$catcourse=array();
/*$instanceId="210498";
$token="2wiciu5rlc4ehwbc";*/
foreach($setting as $s){
	$_GET['id']=$s->id;
	$instanceId=$s->instanceid;
	$token=$s->token;
	$tokenkey=$s->licensekey;
	$email=$s->emailid;
}
	$whatsapp = $DB->get_records_sql('select w.*,w.id as wid from '.$CFG->prefix.'local_whatsapp w left join '.$CFG->prefix.'local_whatsapp_time as t on w.id=t.local_whatsappid where w.page='.$_GET['id'] .' and w.course_id not in(select id from '.$CFG->prefix.'course where enddate<'.time().' and enddate>0) order by t.last_chat_time desc limit 3');

	$users = $DB->get_records_sql('SELECT u.*,u.id as uid FROM '.$CFG->prefix.'user u left join '.$CFG->prefix.'local_whatsapp_time as t on t.user_id=u.id where phone1<>"" and u.suspended=0 and u.id not in(select user_id from '.$CFG->prefix.'local_whatsapp_time where archive=1) order by t.last_chat_time desc limit 3');
	$userspopup = $DB->get_records_sql('SELECT u.*,u.id as uid FROM '.$CFG->prefix.'user u left join '.$CFG->prefix.'local_whatsapp_time as t on t.user_id=u.id where phone1<>"" and u.suspended=0 and u.id not in(select user_id from '.$CFG->prefix.'local_whatsapp_time where archive=1) order by t.last_chat_time desc limit 3');
	$curl = curl_init();
		// set our url with curl_setopt()
		curl_setopt($curl, CURLOPT_URL,"http://moodlms.com/api/get_one_domin_detail/?productid=1758&token=".$tokenkey."&email=".$email.'&domain='. new moodle_url('/'));
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$headers=array("Access-Control-Allow-Origin"=>"*","Access-Control-Allow-Headers"=>"*");
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		$response = curl_exec($curl);
		curl_close($curl);
		$data=json_decode(json_decode($response));
		$flag1=$data->flag;
		if(!($flag1==1)){array();
			header('location:'.new moodle_url('/admin/settings.php?section=blocksettingwhatsapp_plugin'));
			die();
		}

$domainlisr=array("com", "org", "net", "int", "edu", "gov","mil",'aero', 'asia', 'biz', 'cat', 'com', 'coop', 'info', 'int', 'jobs', 'mobi', 'museum', 'name', 'net', 'org', 'post', 'pro', 'tel', 'travel', 'xxx', 'ac', 'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mlc', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'st', 'su', 'sv', 'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tr', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'um', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'za', 'zm', 'zw');
$docfiles=array('doc','docx','htm','html','odt','pdf','xls','xlsx','ods','ppt','pptx','txt','csv');
$imgExts = array("gif", "jpg", "jpeg", "png", "tiff", "tif");
$videotype=array("mp4");
$mp3file=array('oga','mp3','ogg');
		$url = 'https://eu10.chat-api.com/instance'.$instanceId.'/status?token='.$token;
		// Make a POST request
		$options = stream_context_create(['http' => [
				'method'  => 'GET',
				'header'  => 'Content-type: application/json'
			]
		]);
		// Send a request
		$result=file_get_contents($url, false, $options);
		$status=json_decode($result);
		if(empty($status->accountStatus)){
			header('location:'.new moodle_url('/admin/settings.php?section=blocksettingwhatsapp_plugin'));
			die();
		}
if(empty($whatsapp)){
				$url = new moodle_url('/blocks/whatsapp_plugin/ajax.php').'?flag=addnewrowmulti&alluser=&joinurl=&course=&groupname=Welcome to moodle Whatsapp&redicttohome=1&id='.$_GET['id'];
				header('location:'.$url);
				die();
			/*	$options = stream_context_create(['http' => ['method'  => 'POST','header'  => 'Content-type: application/json',]]);
				$result = json_decode(file_get_contents($url, false, $options));
				$whatsapp = $DB->get_records_sql('select w.*,w.id as wid from '.$CFG->prefix.'local_whatsapp w left join '.$CFG->prefix.'local_whatsapp_time as t on w.id=t.local_whatsappid where w.page='.$_GET['id'] .' order by t.last_chat_time desc');*/
			}
$course = $DB->get_records_sql('SELECT id,shortname from '.$CFG->prefix.'course where id not in(select course_id from '.$CFG->prefix.'local_whatsapp)');
		?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Chat</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/png" href="<?php echo new moodle_url('/pluginfile.php/1/theme_'.$CFG->theme.'/favicon/'.$CFG->themerev.'/'.$faviname);?>" />
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo new moodle_url('/blocks/whatsapp_plugin/css/style.css');?>" rel="stylesheet" type="text/css" />
	<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="<?php echo new moodle_url('/blocks/whatsapp_plugin/js/custom.js');?>"></script>
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
</head>
<body>
<?php
if($status->accountStatus=='loading'){
	?>
	<div class="accountloading">
		<div class="modal" tabindex="-1" role="dialog" style="display:block !important;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
		<h3>WhatsApp error</h3>
      </div>
      <div class="modal-body">
        <p>WhatsApp is open on another computer or browser. Click “logout” to QR scan code here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary logout" data-href="https://api.chat-api.com/instance<?php echo $instanceId;?>/logout?token=<?php echo $token;?>">Logout</button>
        <a  class="btn btn-secondary gottohome">Go To home page</a>
      </div>
    </div>
  </div>
</div>
	</div>
	<div class="loaderdiv"><div id="loader"></div></div>
	<?php
	die();
}
?>
<section class="main <?php echo $status->accountStatus;?>">
		<input type="hidden" name="pageid" id="pageid" value="<?php echo $_GET['id'];?>"><?php ///ix5pcbcjdn85yd37//?>
		<input type="hidden" name="ajaxloadmore" id="ajaxloadmore" value="0"><?php ///ix5pcbcjdn85yd37//?>
		<input type="hidden" name="ajaxloadmessage" id="ajaxloadmessage" value="0"><?php ///ix5pcbcjdn85yd37//?>
		<input type="hidden" name="token" id="token" value="<?php echo $token;?>"><?php ///ix5pcbcjdn85yd37//?>
		<input type="hidden" name="instanceId" id="instanceId" value="<?php echo $instanceId;?>"><?php ///210498//?>
		<input type="hidden" name="ajaxurl" id="ajaxurl" value="<?php echo new moodle_url('/blocks/whatsapp_plugin/ajax.php');?>">
		<input type="hidden" name="forwardid" id="forwardid" value="">
		<?php
		if($status->accountStatus!='authenticated'){
		$url = 'https://api.chat-api.com/instance'.$instanceId.'/qr_code?token='.$token;
		?>
			<iframe src="<?php echo $url;?>" class="qr_iframe" id="iframeqrcode"></iframe>
			<div class="divreloadqr"><a href="?id=<?php echo $_GET['id'];?>" class="reload_qr_code btn">Reload</a>&nbsp; &nbsp; &nbsp;
			<a href="<?php echo new moodle_url('/');?>" class="reload_qr_code btn">Go to Home </a></div>
		<?php }?>
        <div class="chat-wrapper <?php echo ($status->accountStatus=='authenticated')?'':'hide';?>">
		<a href="<?php echo new moodle_url('/');?>" class="homelink">Go to Home </a>
		    <div class="chat-wrapper-inner ">
                <div class="chat-left">
                   <div class="chat-left-inner">
                    <div class="chat-left-top">
                        <div class="chat-categoty" data-link="userlist">
                           Chat
                           <i class="fa fa-comment" aria-hidden="true"></i>
                        </div>
                        <div class="chat-categoty active" data-link="courselist">
                           Group
                           <i class="fa fa-users" aria-hidden="true"></i>
                        </div>
                        <div class="chat-categoty" data-link="categorylist">
                           Chategories
                           <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                        <div class="chat-setting">
                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                            <div class="chat-create">
                                <ul>
                                    <li><a href="#" data-toggle="modal" data-target="#addnewgroup" >Add new group</a></li>
                                    <li class="accountsetting"><a href="<?php echo new moodle_url('/admin/settings.php?section=local_whatsapp'); ?>">Account settings</a></li>
                                    <li><a href="javascript:void(0);" id="gotologout">QR code</a></li>
                                    <li><a href="javascript:void(0);" id="logout">Log out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="chat-left-search">
                        <form action="" method="post">
                            <input type="search" class="search" name="" placeholder="Search" style="max-width:calc(100% - 120px);" />
							<select class="studentsearch form-control">
								<option value="">All</option>
								<option value="courseid">Course ID</option>
							</select>
                            <input type="submit" class="search-submit" value="Search">
							<div class="chat-checkbox selectall" style="float:right;top:-35px;right:-10px;">
                                <input type="checkbox" id="checkall" name="checkall" value="">
                                <label for="checkall"></label>
                            </div>
                        </form>
						<button name="btnforward" id="btnforward" class="hide btn btn-primary">Forward</button>
						<button name="cenforward" id="cenforward" class="hide btn btn-default">Cancel</button>
						<span class="forward_text hide">Forward Message To:</span>
                    </div>
                    <div class="chat-list">
                       <div class="chat-list-inner"><?php /*notfull*/?>
						<div class=" courselist listoflist notfull">
						<div class="orderdiv">
					   <?php

					   $i=0;
					   $wid="";
					   $coursearray=array();
					   $coursearray1=array(0);
					   $allcoursesc=array();
					   $coursewkey=array();
					   $wcid=array();
					   $zerocid = '';
							foreach($whatsapp as $key=>$v){
							$courseh=$DB->get_record('local_whatsapp_time',array('local_whatsappid'=>$v->wid),'*');
							if(empty($courseh)){
								$all_rows=array('course_id'=>$v->course_id,'last_chat_time'=>time(),'user_id'=>0,'local_whatsappid'=>$v->wid);
								$lstid=$DB->insert_record('local_whatsapp_time', $all_rows);
							}else{
								if($courseh->local_whatsappid==0){
									$DB->execute("UPDATE `cocoon_local_whatsapp_time` SET local_whatsappid=".$v->wid." WHERE id=".$courseh->id);
								}
							}
							$courseh=$DB->get_record('local_whatsapp_time',array('local_whatsappid'=>$v->wid),'*');

							if(!empty($v->course_id)){
								$csingle=$DB->get_record('course',array('id'=>$v->course_id),'*');
								$cdidnumber=$csingle->idnumber;
								$cdshortname=$csingle->shortname;
							}else{
								$cdidnumber='';
								$cdshortname='';
							}
						$active="";
							if($courseh->mute==1){
								$active='mutenotification';
							}
							if($courseh->pin==1){
								$active=' pinchat';
							}
							$coursearray[]=$v->whatsappid;
							$coursewkey[$v->course_id]=$v->whatsappid;
							$coursearray1[]=$v->course_id;
							$wcid[]=$v->whatsappid;
							$i++;
							$url = 'https://eu10.chat-api.com/instance'.$instanceId.'/dialog?token='.$token.'&chatId='.($v->whatsappid);
							$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
							$result=file_get_contents($url, false, $options);
							$groupdetails=json_decode($result);
							$pnums=array();
							foreach($groupdetails->metadata->participants as $vt){
								$pnums[]=str_replace('@c.us','',$vt);
							}?>
                        <div class="chat-list-item <?php echo $active;?>" data-time-last="<?php echo $courseh->last_chat_time;?>" data-textid="<?php echo $courseh->id;?>" data-users='<?php echo implode(",",$pnums);?>' data-url="<?php echo $v->joinurl;?>" data-idnum="<?php echo $cdidnumber;?>" data-search="<?php echo addslashes(strtolower($v->name));?>" data-cids="<?php echo $cdidnumber;?>" data-courseid="<?php echo $v->course_id;?>" data-id="<?php echo $v->whatsappid;?>">
                            <div class="chat-item-img">
                                <div class="chat-item-img-inner">
                                    <img src="images/group-icon.png" alt="">
                                </div>
                            </div>
                            <div class="chat-item-right">
                                <div class="chat-item-title <?php if(empty($courseh->last_text)){echo 'no-data-bottom';}?>" role="button">
                                    <h4><span><?php echo $v->name;?></span></h4>
                                    <span class="user-date"><?php echo date('d/m/Y',$courseh->last_chat_time);?></span>
                                </div>
                                <div class="chat-last-msg">
                                  <div class="chat-last-msg-text"><?php echo stripslashes($courseh->last_text);?></div>
                                  <div class="chat-last-msg-right">
                                      <div class="chat-unread hide"></div>
                                      <div class="chat-checkbox">
                                          <input type="checkbox" id="check<?php echo $i;?>" name="check<?php echo $i;?>" value="<?php echo $v->whatsappid;?>">
                                          <label for="check<?php echo $i;?>"></label>
                                      </div>
                                  </div>
                                </div>
                            </div>
							<span class='mute-vol'><i class="fa fa-volume-off" aria-hidden="true"></i></span>
							<span class='mute-pin'><i class="fa fa-thumb-tack" aria-hidden="true"></i></span>
                            <div class="chat-info" id="group<?php echo $v->id;?>" data-toggle="tooltip" title="<div class='chat-create'><ul><li><a href='#' datalasttid='<?php echo $courseh->id;?>' data-rid='course<?php echo $v->wid;?>' data-name='<?php echo str_replace(array('"',"'"),array("&#34;","&#39;"),$v->name);?>' data-id='<?php echo $v->whatsappid;?>' class='userdeletechat groupin'>Delete chat</a></li><li><a href='#' class='mutenoti <?php echo ($courseh->mute==1)? 'hide':'';?>'>Mute notifications</a></li><li><a href='#' class='unmutenoti <?php echo ($courseh->mute==1)? '':'hide';?>'>Unmute notifications</a></li><li><a href='#' class='userpinchat <?php echo ($courseh->pin==1)? 'hide':'';?>'>Pin chat</a></li><li><a href='#' class='userunpinchat <?php echo ($courseh->pin==1)? '':'hide';?>'>Unpin chat</a></li><li><a href='#' class='addnewusercourse' data-users='<?php echo implode(",",$pnums);?>' data-coursename='<?php echo str_replace(array('"',"'"),array("&#34;","&#39;"),$cdshortname);?>' data-groupname='<?php echo str_replace(array('"',"'"),array("&#34;","&#39;"),$v->name);?>' datawid='<?php echo $v->whatsappid;?>'>Add Users</a></li></ul></div>">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </div>
                        </div>
					   <?php }
					   ?>
					   </div>
					   </div><?php //notfull ?>
					   <div class="userlist hide listoflist notfull">
						<div class="orderdiv"><?php
					   $i=0;
					   $userarray=array();
					   foreach($users as $u){
						   $phomenum=str_replace('-','',$u->phone1);
							$uphonenum="";
							if(strlen($phomenum)<12){
								$uphonenum='972'.str_replace('-','',$phomenum);
							}else{
								$uphonenum=str_replace('-','',$phomenum);
							}
							$uphonenum=str_replace('+','',$phomenum);
							if(substr($uphonenum,0,1)=="0") $uphonenum = '972'.substr($uphonenum,1);
							$courseh=$DB->get_record('local_whatsapp_time',array('user_id'=>$u->id,'course_id'=>0),'*');
							if(empty($courseh)){
								$all_rows=array('user_id'=>$u->id,'last_chat_time'=>time(),'course_id'=>0);
								$DB->insert_record('local_whatsapp_time', $all_rows);
							}
							$courseh=$DB->get_record('local_whatsapp_time',array('user_id'=>$u->id,'course_id'=>0),'*');
						if(!empty($uphonenum)){
							if($u->picture){
								$src=new moodle_url('/user/pix.php/'.$u->id.'/f1.jpg');
							}else{
								$src='images/user.jpg';
							}
							$active="";
							if($courseh->mute==1){
								$active='mutenotification';
							}
							if($courseh->pin==1){
								$active.=' pinchat';
							}
							$cid=enrol_get_users_courses($u->id, true);
							$idnumber=array();
							$courseid="";
							$ic=0;
							foreach($cid as $key=>$course){
								if($ic==0){
								$courseid=$course->id;
								}
								if(!empty($cdidnumber)){
									$idnumber[]=$cdidnumber;
								}
								$ic++;
							}
							$userarray[]=$u->id;?>
						<div class="chat-list-item <?php echo $active;?>" data-search="<?php echo strtolower($u->firstname.' '.$u->lastname).','.$uphonenum.','.$u->email;?>" data-cids="<?php echo implode(",",$idnumber);?>" data-userid="<?php echo $u->id;?>" data-id="<?php echo $uphonenum.'@c.us';?>">
                            <div class="chat-item-img">
                                <div class="chat-item-img-inner">
                                    <img src="<?php echo $src;?>" alt="<?php echo strtolower($u->firstname.' '.$u->lastname);?>">
                                    <span class="user-online hide"></span>
                                </div>
                            </div>
                            <div class="chat-item-right">
                                <div class="chat-item-title <?php if(empty($courseh->last_text)){echo 'no-data-bottom';}?>" role="button">
                                    <h4><span><?php echo ($u->firstname.' '.$u->lastname);?></span></h4>
                                    <span class="user-date"><?php echo date('d/m/Y',$courseh->last_chat_time);?></span>
                                </div>
                                <div class="chat-last-msg">
                                  <div class="chat-last-msg-text">
								  <?php echo stripslashes($courseh->last_text);?>
                                  </div>
                                  <div class="chat-last-msg-right">
                                      <div class="chat-unread hide"></div>
                                      <div class="chat-checkbox">
                                          <input type="checkbox" id="checku<?php echo $i;?>" name="checku<?php echo $i;?>" value="<?php echo $uphonenum.'@c.us';?>">
                                          <label for="checku<?php echo $i;?>"></label>
                                      </div>
                                  </div>
                                </div>
                            </div>
							<span class='mute-vol'><i class="fa fa-volume-off" aria-hidden="true"></i></span>
							<span class='mute-pin'><i class="fa fa-thumb-tack" aria-hidden="true"></i></span>
                            <div class="chat-info" id="user<?php echo $u->id;?>" data-toggle="tooltip" title="<div class='chat-create'><ul><li><a href='#' class='archive' data-uid='<?php echo $u->id;?>'>Archive </a></li><li><a href='<?php echo new moodle_url('/user/profile.php?id='.$u->id);?>'>Contact Info</a></li><li><a href='#' datalasttid='<?php echo $courseh->id;?>' data-rid='user<?php echo $u->id;?>' data-name='<?php echo htmlentities($u->firstname.' '.$u->lastname);?>' data-id='<?php echo $uphonenum.'@c.us';?>' class='userdeletechat userin'>Delete chat</a></li><li><a href='#' class='mutenoti <?php echo ($courseh->mute==1)? 'hide':'';?>'>Mute notifications</a></li><li><a href='#' class='unmutenoti <?php echo ($courseh->mute==1)? '':'hide';?>'>Unmute notifications</a></li><li><a href='#' class='userpinchat <?php echo ($courseh->pin==1)? 'hide':'';?>'>Pin chat</a></li><li><a href='#' class='userunpinchat <?php echo ($courseh->pin==1)? '':'hide';?>'>Unpin chat</a></li></ul></div>">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </div>
                        </div>
						<?php
						}
					   $i++;
					   }
					   ?></div>
					   </div><?php //notfull?>
						<div class="categorylist hide listoflist notfull">
						<div class="orderdiv"></div>
						</div>
                       </div>
                    </div>
                    </div>
                </div>
                <div class="chat-right">
                    <div class="chat-right-inner">
                        <div class="chat-right-top">
                            <div class="right-search">
                                <div class="right-searchbar">
                                    <input type="search" class="search" id="rightsidesearch" name="" placeholder="Search">
                                </div>
                                <div class="right-search-icon"></div>
                                <div class="right-search-data">
                                    <ul></ul>
                                </div>
                            </div>
                            <div class="right-info">
                                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                <div class="chat-create hide">
                                    <ul>
                                        <li><a href="#" class="namegroup"><span class="hide divgroup"><input type="text" id="textnamegroup" value=""><input type="button" name="update" value="update"></span><span class="grouphtml"><span>Name of group </span><i class="fa fa-pencil" data-toggle="modal" data-target="#updategroupname" aria-hidden="true"></i></a></span></li>
                                        <li><a href="#" class="groupid">ID 5112550</a></li>
                                        <li><a href="#" class="copylink">Copy invite link</a></li>
                                        <?php /*<li><a href="#" class="groupexit">Exit group</a></li>*/?>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="chat-rightmain">
                           <div class="chat-right-list active course<?php echo $zerocid;?>">
							<h3 class="text-center">Welcome to WhatsApp Moodle for <?php  echo $SITE->fullname;?></h3>
							<p class="" style="margin:20px;">This platform is connected with WhatsApp API to your Moodle system. you can type your massages to your Moodle users and recive massages send to you from whatsapp. we hope that you will have a good experience with our system. for more information and more Moodle plugins you can visit our site at <a href="https://moodlms.com/">moodlms.com.</a></p>
						  <?php
						  $maxtime=$DB->get_records_sql('select max(last_chat_time) as maxtime from '.$CFG->prefix.'local_whatsapp_time limit 1');
						 $timegr1=0;
						 foreach($maxtime as $val){
							 $timegr1=$val->maxtime;
						 }
						  ?><input type="hidden" name="min_time_course" id="min_time_course" value="<?php echo $timegr1;?>">
                           </div>
						<?php foreach($coursearray as $key=>$vl){	?>
							<div class="chat-right-list hide course<?php echo $vl;?>" datawid="<?php echo $wcid[$key];?>"></div>
						<?php }?>
						<?php foreach($userarray as $v2){	?>
							<div class="chat-right-list hide user<?php echo $v2;?>"></div>
						<?php }?>
						</div>
						 <div class="emoji-popup">
                            <ul><li data-val="👅">👅</li><li data-val="🤗">🤗</li><li data-val="👍">👍</li><li data-val="🤛">🤛</li><li data-val="😄">😄</li><li data-val="😁">😁</li><li data-val="😆">😆</li><li data-val="🙂">🙂</li><li data-val="😇">😇</li><li data-val="😆">😆</li><li data-val="😅">😅</li><li data-val="😂">😂</li><li data-val="🤣">🤣</li><li data-val="😌">😌</li><li data-val="😉">😉</li><li data-val="🙃">🙃</li><li data-val="🙂">🙂</li><li data-val="😊">😊</li><li data-val="☺️">☺️</li><li data-val="😍">😍</li><li data-val="😘">😘</li><li data-val="😗">😗</li><li data-val="😙">😙</li><li data-val="😚">😚</li><li data-val="😋">😋</li><li data-val="😛">😛</li><li data-val="😎">😎</li><li data-val="🤓">🤓</li><li data-val="😝">😝</li><li data-val="😏">😏</li><li data-val="😒">😒</li><li data-val="😞">😞</li><li data-val="😔">😔</li><li data-val="😟">😟</li><li data-val="😕">😕</li><li data-val="😢">😢</li><li data-val="😩">😩</li><li data-val="😫">😫</li><li data-val="😖">😖</li><li data-val="😣">😣</li><li data-val="☹️">☹️</li><li data-val="🙁">🙁</li><li data-val="🤠">🤠</li><li data-val="🤑">🤑</li><li data-val="🤕">🤕</li><li data-val="🤒">🤒</li><li data-val="😪">😪</li><li data-val="😵">😵</li><li data-val="🤐">🤐</li><li data-val="🤢">🤢</li><li data-val="🤧">🤧</li><li data-val="😷">😷</li><li data-val="🤤">🤤</li><li data-val="😴">😴</li><li data-val="😲">😲</li><li data-val="😮">😮</li><li data-val="😧">😧</li><li data-val="😦">😦</li><li data-val="😯">😯</li><li data-val="😀">😀</li><li data-val="👐">👐</li><li data-val="🙌">🙌</li><li data-val="👏">👏</li><li data-val="🤝">🤝</li><li data-val="👍">👍</li><li data-val="👎">👎</li><li data-val="👊">👊</li><li data-val="✊">✊</li><li data-val="🤛">🤛</li><li data-val="✌️">✌️</li><li data-val="🤘">🤘</li><li data-val="👌">👌</li><li data-val="👈">👈</li><li data-val="👉">👉</li><li data-val="👆">👆</li><li data-val="👇">👇</li><li data-val="☝️">☝️</li><li data-val="✋">✋</li><li data-val="🤚">🤚</li><li data-val="️🖖️">🖖</li><li data-val="👋">👋</li><li data-val="🤙">🤙</li><li data-val="💪">💪</li><li data-val="🖕">🖕</li><li data-val="✍️">✍️</li><li data-val="🙏">🙏</li></ul>
                        </div>
                        <div class="chat-footer">
								<div class="audio_files">
								  <ul  class="list-unstyled listsendremove" id='ul'></ul>
								</div>
								<div class="file_nameview"></div>
                            <div class="chat-right-area hide">
                                <div class="chat-right-emoji">
									<i class="fa fa-smile-o" aria-hidden="true"></i>
								</div>
								<div class="chat-right-attach">
                                    <i class="fa fa-paperclip" aria-hidden="true"></i>
									<form method="post" class="formmessage">
									<input type="file" name="messagefile" class="messagefile">
									<input type="hidden" name="sendphones" class="sendphones" value="">
									</form>
                                </div>
                                <div class="chat-right-textarea" datap="<?php echo $wid;?>">
                                    <textarea id="message_write" placeholder="Type a message"></textarea>
									<input type="button" name="send" value="send">
                                </div>
								<div class="chat-right-voice">
									<div id='gUMArea'>
										<input type="radio" name="media" value="audio" checked style="display:none;">
										<button class="btn btn-default"  id='gUMbtn'><i class="fa fa-microphone" aria-hidden="true"></i></button>
									</div>
									<div id='btns'>
									  <button  class="btn btn-default" id='start' style="display:none;"><i class="fa fa-microphone" aria-hidden="true"></i></button>
									  <button  class="btn btn-default" id='stop' style="display:none;"><i class="fa fa-microphone text-danger" aria-hidden="true"></i></button>
									</div>
                                </div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
	<div class="modal sign_up_modal fade" id="updategroupname" tabindex="-1" role="dialog" aria-labelledby="addnewgroupLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div class="modal-body">
			<form class="updateform" method="post" action="">
			  <div class="form-group">
				<label for="groupnameu">Group Name</label>
				<input type="text" class="form-control" id="groupnameu" name="groupnameu" placeholder="Enter group name">
				<input type="hidden" name="courseidform" id="courseidform" value="">
			  </div>
			  <input type="submit" name="submit" class="btn btn-primary update" id="submit" value="Update">
			</form>
       </div>
    </div>
  </div>
</div>
<div class="modal fade" id="deletepopupuser" tabindex="-1" role="dialog" aria-labelledby="addnewgroupLabel" aria-hidden="false">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-body">
				<input type="hidden" id="grouporuserid" value="">
				<input type="hidden" id="grouporuseridclass" value="">
				<input type="hidden" id="datalasttid" value="">
				<div class="delete-message-text"><h2 class='msgdel'>Delete messages?</h2><h2>&nbsp;</h2></div>
				<div class="clearfix"><a href="javascript:void(0);" role="button" class="btn btn-primary del-message pull-right">Delete</a><a href="javascript:void(0);" role="button" class="btn cancel-del-popup pull-right btn-default" data-dismiss="modal">Cancel</a></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="archivepopup" tabindex="-1" role="dialog" aria-labelledby="addnewgroupLabel" aria-hidden="false">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-body">
				<input type="hidden" id="hiddenarchiveid" value="">
				<div class="archive-message-text"><h2>Are you sure you want to archive user '<span class='nameofuser'></span>'?</h2><h2>&nbsp;</h2></div>
				<div class="clearfix"><a href="javascript:void(0);" role="button" class="btn btn-primary archive-message pull-right">Yes</a><a href="javascript:void(0);" role="button" class="btn cancel-del-popup pull-right btn-default" data-dismiss="modal">No</a></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="deletepopup" tabindex="-1" role="dialog" aria-labelledby="addnewgroupLabel" aria-hidden="false">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-body">
				<input type="hidden" id="hiddeletemsgid" value="">
				<div class="delete-message-text"><h2>Delete messages?</h2><h2>&nbsp;</h2></div>
				<div class="clearfix"><a href="javascript:void(0);" role="button" class="btn btn-primary del-message pull-right">Delete</a><a href="javascript:void(0);" role="button" class="btn cancel-del-popup pull-right btn-default" data-dismiss="modal">Cancel</a></div>
			</div>
		</div>
	</div>
</div>
<div class="modal sign_up_modal fade" id="addusertogroup" tabindex="-1" role="dialog" aria-labelledby="addnewgroupLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div class="modal-body">
				<input type="hidden" name="gwid" value="" id="gwid">
			  <div class="form-group">
				<label for="groupname">Group Name</label>
					<div class="groupname"></div>
			  </div>
			  <div class="form-group">
				<label for="course">Course </label>
				<div class="cousename"></div>
			  </div>
			  <div class="form-group">
				<label for="studentnew">Users </label>
				<select name="studentnew[]" class="form-control selectpicker" multiple="true" id="studentnew" style="width:100%;" data-size="<?php echo (count($userspopup)<15)? count($userspopup): '15'; ?>">
					<?php foreach($userspopup as $u){
						$phomenum=str_replace('-','',$u->phone1);
							$uphonenum="";
							if(strlen($phomenum)<12){
								$uphonenum='972'.str_replace('-','',$phomenum);
							}else{
								$uphonenum=str_replace('-','',$phomenum);
							}
							$uphonenum=str_replace('+','',$phomenum);
							if(substr($uphonenum,0,1)=="0") $uphonenum = '972'.substr($uphonenum,1);
						echo '<option value="'.$uphonenum.'" data-search="'.strtolower($u->firstname.' '.$u->lastname).','.$uphonenum.'">'.$u->firstname.' '.$u->lastname.' ('.$uphonenum.')</option>';
					}?>
				</select>
			  </div>
			  <input type="button" name="submit" class="btn btn-primary" id="submitusernew" value="Add users">
			  <div class="addeduserlist"></div>
       </div>
    </div>
  </div>
</div>
<div class="modal sign_up_modal fade" id="addnewgroup" tabindex="-1" role="dialog" aria-labelledby="addnewgroupLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div class="modal-body">
				<input type="hidden" name="chatId" value="" id="chatIdfrm">
			  <div class="form-group">
				<label for="groupname">Group Name</label>
				<input type="text" class="form-control" id="groupname" name="groupname" placeholder="Enter group name">
			  </div>
			  <div class="form-group">
				<label for="joinurl">join Url</label>
				<input type="url" class="form-control" name="joinurl" id="joinurl" aria-describedby="joinurltext" placeholder="">
				<small id="joinurltext" class="form-text text-muted">If you have alredy group otherwise leave it's blank</small>
			  </div>
			  <div class="form-group">
				<label for="course">Course </label>
				<select name="course" class="form-control" id="course">
					<option value="">No Course</option>
					<?php
					$course = $DB->get_records_sql('SELECT * from '.$CFG->prefix.'course where id not in(select course_id from '.$CFG->prefix.'local_whatsapp)');
					foreach($course as $c){
						echo '<option value="'.$c->id.'">'.$c->shortname.'</option>';
					}?>
				</select>
			  </div><?php /*
			   <div class="form-group">
					<div class="chat-checkbox">
                                <input type="checkbox" id="usercheck" name="usercheck" value="">
                                <label for="usercheck"></label>
                    </div>
					<span>All users of course</span>
				</div>
				<?php */?>
			  <div class="form-group">
				<label for="student">Users </label>
				<select name="student[]" class="form-control student selectpicker" multiple="true" id="student" data-size="5" style="width:100%;">
					<?php foreach($userspopup as $u){
						$cid=enrol_get_users_courses($u->id, true);
						$courseid=array();
						foreach($cid as $key=>$course){
							$courseid[]="class-".$course->id;
						}
						echo '<option value="'.$u->phone1.'" class="'.implode(" ",$courseid).'">'.$u->firstname.' '.$u->lastname.'</option>';
					}?>
				</select>
			  </div>
			  <input type="button" name="submit" class="btn btn-primary" id="submitaddnew" value="Submit">
       </div>
    </div>
  </div>
</div>
<div class="loaderdiv"><div id="loader"></div></div>
</body>
</html>
<?php
//echo $OUTPUT->footer();
?>