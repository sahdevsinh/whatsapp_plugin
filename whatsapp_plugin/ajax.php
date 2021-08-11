<?php
require_once(__DIR__ . '/../../config.php');
require_once($CFG->libdir.'/clilib.php');      // cli only functions
require_once($CFG->libdir.'/cronlib.php');
global $DB,$CFG;
$setting = $DB->get_records_sql('select id,instanceid,token from '.$CFG->prefix.'whatsappkey limit 1');
$pageid=0;
foreach($setting as $s){
	$pageid=$s->id;
	$instanceId=$s->instanceid;
	$token=$s->token;
}
			// Send a request UPDATE `cocoon_local_whatsapp_time` SET `last_text` ='📃 Document',last_chat_time='1617784782' WHERE `user_id` =8
$imgExts = array("gif", "jpg", "jpeg", "png", "tiff", "tif");
$docfiles=array('doc','docx','htm','html','odt','pdf','xls','xlsx','ods','ppt','pptx','txt');
$domainlisr=array("com", "org", "net", "int", "edu", "gov","mil",'aero', 'asia', 'biz', 'cat', 'com', 'coop', 'info', 'int', 'jobs', 'mobi', 'museum', 'name', 'net', 'org', 'post', 'pro', 'tel', 'travel', 'xxx', 'ac', 'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mlc', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'st', 'su', 'sv', 'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tr', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'um', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'za', 'zm', 'zw');
$videotype=array("mp4");
$mp3file=array('oga');
if(!empty($_REQUEST['newusertimedelete'])){
	if($_REQUEST['newusertimedelete']=='delete'){
		if(!empty($_REQUEST['users'])){
			($DB->execute("Delete from `".$CFG->prefix."local_whatsapp_time` WHERE `id` =".$_REQUEST['users']));
		}
	}
}
if($_REQUEST['newusertime']=='addnewuser'){
	$userslist=explode(",",$_REQUEST['users']);
	foreach($userslist as $u){
		$userslia=$DB->get_records_sql('select id from '.$CFG->prefix.'local_whatsapp_time where user_id='.$u);
		if(empty($userslia)){
			$all_rows=array('user_id'=>$u,'last_chat_time'=>time(),'course_id'=>0);
			$DB->insert_record('local_whatsapp_time', $all_rows);
		}
	}
}
if($_REQUEST['action']=='loadcatmore'){
	if(empty($_REQUEST['id'])){
		$_REQUEST['id']=1;
		$whatsapp = $DB->get_records_sql('select w.*,w.id as wid from '.$CFG->prefix.'local_whatsapp w left join '.$CFG->prefix.'local_whatsapp_time as t on w.id=t.local_whatsappid where w.page=1 and w.course_id not in(select id from '.$CFG->prefix.'course where enddate<'.time().' and enddate>0) order by t.last_chat_time desc limit 10');
	}else{
		$whatsapp = $DB->get_records_sql('select w.*,w.id as wid from '.$CFG->prefix.'local_whatsapp w left join '.$CFG->prefix.'local_whatsapp_time as t on w.id=t.local_whatsappid where w.page='.$_REQUEST['id'] .' and w.course_id not in(select id from '.$CFG->prefix.'course where enddate<'.time().' and enddate>0) order by t.last_chat_time desc limit 10');
	}
	//echo ('select w.*,w.id as wid from '.$CFG->prefix.'local_whatsapp w left join '.$CFG->prefix.'local_whatsapp_time as t on w.id=t.local_whatsappid where w.page='.$_REQUEST['id'] .' and w.course_id not in(select id from '.$CFG->prefix.'course where enddate<'.time().' and enddate>0) order by t.last_chat_time desc limit 10');
	$coursewkey=array();
	foreach($whatsapp as $key=>$v){
		$coursewkey[$v->course_id]=$v->whatsappid;
	}
	$courses = $DB->get_records_sql('select category,id from '.$CFG->prefix.'course');
					$catcoursename=array();
					$catidnumber=array();
					   foreach($courses as $cat){
						if(!empty($cat->category)){
							$catcourse[$cat->category][]=$cat->id;
							$category = $DB->get_record('course_categories',array('id'=>$cat->category));
							$catcoursename[$cat->category]=$category->name;
							$catidnumber[$cat->category]=$category->idnumber;
						}
					}
					$i=0;
						foreach($catcourse as $key=>$v12){
						if(!empty($v12)){
							$uphonenum1=array();
							$context = get_context_instance(CONTEXT_COURSE,$v12);
							 $teacher=(get_users($context));
							 foreach($teacher as $v){
								 $phomenum=str_replace('-','',$v->phone1);
								$uphonenum='';
								if(strlen($phomenum)<12){
									$uphonenum='972'.str_replace('-','',$phomenum);
								}else{
									$uphonenum=str_replace('-','',$phomenum);
								}
								$uphonenum=str_replace('+','',$phomenum);
								if(substr($uphonenum,0,1)=="0"){
									$uphonenum1[]='972'.substr($uphonenum,1).'@c.us';
								}else{
									$uphonenum1[]=$uphonenum.'@c.us';
								}
							 }
						if(!empty($uphonenum1)){	 ?>
						<div class="chat-list-item" data-search="<?php echo addslashes(strtolower($catcoursename[$key]));?>" data-cids="<?php echo $catidnumber[$key];?>" data-courseid="<?php echo $key;?>" data-id="<?php echo implode(",",$uphonenum1);?>">
                            <div class="chat-item-img">
                                <div class="chat-item-img-inner">
									 <img src="images/group-icon.png" alt="">
                                </div>
                            </div>
                            <div class="chat-item-right">
                                <div class="chat-item-title no-data-bottom" role="button">
                                    <h4><span><?php echo $catcoursename[$key];?></span></h4>
                                    <span class="cat-date"><?php //echo date('d/m/Y',$courseh->last_chat_time);?></span>
                                </div>
                                <div class="chat-last-msg">
                                  <div class="chat-last-msg-text">
								  <?php //echo $courseh->last_text;?>
                                  </div>
                                  <div class="chat-last-msg-right">
                                      <div class="chat-unread hide"></div>
                                      <div class="chat-checkbox">
                                          <input type="checkbox" id="catcheck<?php echo $i;?>" name="catcheck<?php echo $i;?>" value="<?php echo implode(",",$uphonenum1);?>">
                                          <label for="catcheck<?php echo $i;?>"></label>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>
						<?php $i++;}
							}
						}
}
if($_REQUEST['action']=='loadcoursesmore'){
	if(empty($_REQUEST['instanceId']) || empty($_REQUEST['token'])){
		$_REQUEST['instanceId']=$instanceId;
		$_REQUEST['token']=$token;
	}
	if(empty($_REQUEST['id'])){
		$_REQUEST['id']=1;
	}
	if(!empty($_REQUEST['existid'])){
		$whatsapp = $DB->get_records_sql('select w.*,w.id as wid from '.$CFG->prefix.'local_whatsapp w left join '.$CFG->prefix.'local_whatsapp_time as t on w.id=t.local_whatsappid where w.page='.$_REQUEST['id'] .' and w.course_id not in(select id from '.$CFG->prefix.'course where enddate<'.time().' and enddate>0) and w.whatsappid not in('.implode(",",$_REQUEST['existid']).') order by t.last_chat_time desc limit 10');
		$userrighthtml="";
		ob_start();
		foreach($whatsapp as $key=>$v){
			$url = 'https://eu10.chat-api.com/instance'.$_REQUEST['instanceId'].'/dialog?token='.$_REQUEST['token'].'&chatId='.($v->whatsappid);
			$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
			$result=file_get_contents($url, false, $options);
			$groupdetails=json_decode($result);
			$pnums=array();
			if(!empty($groupdetails->metadata)){
				foreach($groupdetails->metadata->participants as $vt){
					if(strlen($vt)>9){
					$pnums[]=str_replace('@c.us','',$vt);
					}
				}
			}
			if(empty($pnums)){
				$DB->execute("Delete from `".$CFG->prefix."local_whatsapp` WHERE id=".$v->wid);
				$DB->execute("Delete from `".$CFG->prefix."local_whatsapp_time` WHERE local_whatsappid=".$v->wid);
			}else{
			$userrighthtml.='<div class="chat-right-list coursediv hide course'.$v->whatsappid.'" datawid="'.$v->whatsappid.'" data-users="'.implode(",",$pnums).'"></div>';
							$courseh=$DB->get_record('local_whatsapp_time',array('local_whatsappid'=>$v->wid),'*');
							if(empty($courseh)){
								$all_rows=array('course_id'=>$v->course_id,'last_chat_time'=>time(),'user_id'=>0,'local_whatsappid'=>$v->wid);
								$lstid=$DB->insert_record('local_whatsapp_time', $all_rows);
								$courseh=$DB->get_record('local_whatsapp_time',array('local_whatsappid'=>$v->wid),'*');
							}
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
							$coursearray[]=$v->course_id;
							$coursewkey[$v->course_id]=$v->whatsappid;
							$coursearray1[]=$v->course_id;
							$wcid[]=$v->whatsappid;//$_REQUEST['instanceId'].'/dialog?token='.$_REQUEST['token']
							$url = 'https://eu10.chat-api.com/instance'.$_REQUEST['instanceId'].'/dialog?token='.$_REQUEST['token'].'&chatId='.($v->whatsappid);
							$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
							$result=file_get_contents($url, false, $options);
							$groupdetails=json_decode($result);
							$pnums=array();
							$url = 'https://api.chat-api.com/instance'.$_REQUEST['instanceId'].'/me?token='.$_REQUEST['token'];
							// Make a POST request
							$options = stream_context_create(['http' => [
									'method'  => 'POST',
									'header'  => 'Content-type: application/json',
								]
							]);
							$result = json_decode(file_get_contents($url, false, $options));
							// str_replace
							$pnums[]=str_replace('@c.us','',$result->id);
							if(!empty($groupdetails->metadata)){
								foreach($groupdetails->metadata->participants as $vt){
									$pnums[]=str_replace('@c.us','',$vt);
								}
							}
							$i++;?>
                        <div class="chat-list-item <?php echo $active;?>" data-time-last="<?php echo $courseh->last_chat_time;?>" data-users='<?php echo implode(",",$pnums);?>' data-url="<?php echo $v->joinurl;?>" data-idnum="<?php echo $cdidnumber;?>" data-search="<?php echo addslashes(strtolower($v->name));?>" data-cids="<?php echo $cdidnumber;?>"  data-courseid="<?php echo $v->course_id;?>" data-id="<?php echo $v->whatsappid;?>">
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
					   <?php
							}
					   }
		$htmlbol=ob_get_contents();
		ob_clean();
	}
	echo json_encode(array('countc'=>count($whatsapp),'coursehtml'=>$htmlbol,'righthtml'=>$userrighthtml));
}
if($_REQUEST['action']=='loadstudentsmore'){
	if(!empty($_REQUEST['existid'])){
		$users = $DB->get_records_sql('SELECT u.phone1,u.firstname,u.lastname,u.id,u.id as uid FROM '.$CFG->prefix.'user u left join '.$CFG->prefix.'local_whatsapp_time as t on t.user_id=u.id where phone1<>"" and u.suspended=0 and u.id not in(select user_id from '.$CFG->prefix.'local_whatsapp_time where archive=1) and u.id not in('.implode(",",$_REQUEST['existid']).')  order by t.last_chat_time desc limit 10');
		ob_start();
		$userrighthtml="";
		if(!empty($users)){
		foreach($users as $u){
			$userrighthtml.='<div class="chat-right-list hide user'. $u->id.'"></div>';
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
								if(!empty($course->idnumber)){
									$idnumber[]=$course->idnumber;
								}
								$ic++;
							}
							$userarray[]=$u->id;?>
						<div class="chat-list-item <?php echo $active;?>" data-search="<?php echo strtolower(addslashes($u->firstname.' '.$u->lastname)).','.$uphonenum.','.$u->email;?>" data-userid="<?php echo $u->id;?>" data-id="<?php echo $uphonenum.'@c.us';?>" data-cids="<?php echo implode(",",$idnumber);?>">
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
                            <div class="chat-info" id="user<?php echo $u->id;?>" data-toggle="tooltip" title="<div class='chat-create'><ul><li><a href='#' class='archive' data-uid='<?php echo $u->id;?>'>Archive </a></li><li><a href='<?php echo new moodle_url('/user/profile.php?id='.$u->id);?>'>Contact Info</a></li><li><a href='#' datalasttid='<?php echo $courseh->id;?>' data-rid='user<?php echo $u->id;?>' data-name='<?php echo addslashes($u->firstname.' '.$u->lastname);?>' data-id='<?php echo $uphonenum.'@c.us';?>' class='userdeletechat userin'>Delete chat</a></li><li><a href='#' class='mutenoti <?php echo ($courseh->mute==1)? 'hide':'';?>'>Mute notifications</a></li><li><a href='#' class='unmutenoti <?php echo ($courseh->mute==1)? '':'hide';?>'>Unmute notifications</a></li><li><a href='#' class='userpinchat <?php echo ($courseh->pin==1)? 'hide':'';?>'>Pin chat</a></li><li><a href='#' class='userunpinchat <?php echo ($courseh->pin==1)? '':'hide';?>'>Unpin chat</a></li></ul></div>">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </div>
                        </div>
						<?php
						}
					   $i++;
					   }
		}
		$htmluser=ob_get_contents();
		ob_clean();
		echo json_encode(array('countstd'=>count($users),'stdhtml'=>$htmluser,'righthtml'=>$userrighthtml));
	}else{

	}
}
if($_REQUEST['flag']=='archiveuser'){
	if(!empty($_REQUEST['id'])){
		$DB->execute("UPDATE `".$CFG->prefix."local_whatsapp_time` SET archive=1 WHERE `user_id` =".$_REQUEST['id']);
	}
}
if($_REQUEST['flag']=='update'){
		if(!empty($_REQUEST['course_id'])){
			$DB->execute("UPDATE `".$CFG->prefix."local_whatsapp_time` SET `last_text` = '".addslashes($_REQUEST['last_text'])."',last_chat_time=".$_REQUEST['time']." WHERE `course_id` =".$_REQUEST['course_id']);
		}
		if(!empty($_REQUEST['use_id'])){
			$DB->execute("UPDATE `".$CFG->prefix."local_whatsapp_time` SET `last_text` ='".addslashes($_REQUEST['last_text'])."',last_chat_time=".$_REQUEST['time']." WHERE `user_id`=".$_REQUEST['use_id']);
		}
}
if($_REQUEST['flag']=='updatenewcdids'){
		if(!empty($_REQUEST['dtextid'])){
			var_dump($DB->execute("UPDATE `".$CFG->prefix."local_whatsapp_time` SET `last_text` = '".addslashes($_REQUEST['last_text'])."',last_chat_time=".$_REQUEST['time']." WHERE `id` =".$_REQUEST['dtextid']));
		}
}
//
if(!empty($_REQUEST['deletegroup'])){
		if(!empty($_REQUEST['id'])){
			$DB->execute("Delete from `".$CFG->prefix."local_whatsapp` WHERE `id` =".$_REQUEST['id']);
			$DB->execute("Delete from `".$CFG->prefix."local_whatsapp_time` WHERE `local_whatsappid` =".$_REQUEST['id']);
		}
}
if($_REQUEST['mute']=='mutenotification'){
		if(!empty($_REQUEST['lastdata'])){
			$DB->execute("UPDATE `".$CFG->prefix."local_whatsapp_time` SET mute=".$_REQUEST['mutet']." WHERE `id` =".$_REQUEST['lastdata']);
		}
}
if($_REQUEST['pin']=='pin'){
		if(!empty($_REQUEST['lastdata'])){
			$DB->execute("UPDATE `".$CFG->prefix."local_whatsapp_time` SET pin=".$_REQUEST['pinv']." WHERE `id` =".$_REQUEST['lastdata']);
		}
}
if($_REQUEST['delf']=='deletegroupmsg'){
		$url = 'https://eu10.chat-api.com/instance'.$_REQUEST['instanceId'].'/messages?token='.$_REQUEST['token'].'&chatId='.$_REQUEST['id'];
		$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
		$result=file_get_contents($url, false, $options);
		$whatsappmessages=json_decode($result);
		foreach($whatsappmessages->messages as $m){
			$url = 'https://eu10.chat-api.com/instance'.$_REQUEST['instanceId'].'/deleteMessage?token='.$_REQUEST['token'].'&messageId='.($m->id);
			$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
			$result=file_get_contents($url, false, $options);
			$whatsappmessages=json_decode($result);
		}
		if($_REQUEST['lastdata']>0){
			$DB->execute("UPDATE `".$CFG->prefix."local_whatsapp_time` SET `last_text`='' WHERE `id` =".$_REQUEST['lastdata']);
		}
		echo json_encode(array('flag'=>1));
}
if(isset($_REQUEST['flag']) && $_REQUEST['flag']=='addnewrowmulti'){
	if(!empty($_REQUEST['id'])){
		$setting = $DB->get_records_sql('select instanceid,token from '.$CFG->prefix.'whatsappkey where id='.$_REQUEST['id']);
		foreach($setting as $s){
			$instanceId=$s->instanceid;
			$token=$s->token;
		}
	}
	if(!empty($_REQUEST['groupname'])){
		if(!empty($_REQUEST['joinurl'])){
			$url = 'https://eu10.chat-api.com/instance'.$instanceId.'/joinGroup?token='.$token.'&url='.$_REQUEST['joinurl'];
			$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
			$result=file_get_contents($url, false, $options);
			$whatsapp=json_decode($result);
			if(!empty($whatsapp->chatId)){
				if(($_REQUEST['alluser']) && !empty($_REQUEST['course'])){
					$allstudents=$DB->get_records_sql("SELECT c.id AS courseid,c.fullname,u.username,u.firstname, u.lastname,u.email,u.phone1 FROM ".$CFG->prefix."role_assignments ra JOIN ".$CFG->prefix."user u ON u.id = ra.userid JOIN ".$CFG->prefix."role r ON r.id = ra.roleid JOIN ".$CFG->prefix."context cxt ON cxt.id = ra.contextid JOIN ".$CFG->prefix."course c ON c.id = cxt.instanceid WHERE ra.userid = u.id AND ra.contextid = cxt.id AND cxt.instanceid = c.id and u.phone1<>'' and c.id=".$_REQUEST['course']);
					foreach($allstudents as $k){
						$s=$k->phone1;
						$phomenum=str_replace('-','',$s);
						$uphonenum='';
						$uphonenum1="";
						if(strlen($phomenum)<12){
							$uphonenum='972'.str_replace('-','',$phomenum);
						}else{
							$uphonenum=str_replace('-','',$phomenum);
						}
						$uphonenum=str_replace('+','',$phomenum);
						if (substr($uphonenum,0,1)=="0"){$uphonenum1 = '972'.substr($uphonenum,1);}else{$uphonenum1=$uphonenum;}
						if(!empty($uphonenum1)){
							$data =["participantChatId"=>$uphonenum1.'@c.us',"groupId"=>$whatsapp->chatId];
							$json = json_encode($data); // Encode data to JSON
							$url = 'https://api.chat-api.com/instance'.$instanceId.'/addGroupParticipant?token='.$token;
							// Make a POST request
							$options = stream_context_create(['http' => [
									'method'  => 'POST',
									'header'  => 'Content-type: application/json',
									'content' => $json
								]
							]);
							$result = file_get_contents($url, false, $options);
							}
					}
				}
				$course=0;
				if($_REQUEST['course']>0){
						$course=$_REQUEST['course'];
						$allstudents=$DB->get_records_sql("SELECT c.id AS courseid,c.fullname,u.username,u.firstname, u.lastname,u.email,u.phone1 FROM ".$CFG->prefix."role_assignments ra JOIN ".$CFG->prefix."user u ON u.id = ra.userid JOIN cocoon_role r ON r.id = ra.roleid JOIN ".$CFG->prefix."context cxt ON cxt.id = ra.contextid JOIN ".$CFG->prefix."course c ON c.id = cxt.instanceid WHERE ra.userid = u.id AND ra.contextid = cxt.id AND cxt.instanceid = c.id and (r.archetype='manager' or r.archetype='teacher') and u.phone1<>'' and c.id=".$_REQUEST['course']);

					foreach($_REQUEST['students'] as $k){
						$s=$k;
						$phomenum=str_replace('-','',$s);
						$uphonenum='';
						$uphonenum1="";
						if(strlen($phomenum)<12){
							$uphonenum='972'.str_replace('-','',$phomenum);
						}else{
							$uphonenum=str_replace('-','',$phomenum);
						}
						$uphonenum=str_replace('+','',$phomenum);
						if (substr($uphonenum,0,1)=="0"){$uphonenum1 = '972'.substr($uphonenum,1);}else{$uphonenum1=$uphonenum;}
						if(!empty($uphonenum1)){
							$data =["participantChatId"=>$uphonenum1.'@c.us',"groupId"=>$whatsapp->chatId];
							$json = json_encode($data); // Encode data to JSON
							$url = 'https://api.chat-api.com/instance'.$instanceId.'/addGroupParticipant?token='.$token;
							// Make a POST request
							$options = stream_context_create(['http' => [
									'method'  => 'POST',
									'header'  => 'Content-type: application/json',
									'content' => $json
								]
							]);
							$result = file_get_contents($url, false, $options);
							}
					}
				}
				$ins = (object)array('name' =>trim($_REQUEST['groupname']),'course_id' =>$course,'page'=>$_REQUEST['id'],'whatsappid'=>$whatsapp->chatId,'joinurl'=>$_REQUEST['joinurl']);
				$ids=$DB->insert_record('local_whatsapp', $ins);
				$insnew=(object)array('course_id'=>$course,'last_chat_time'=>time(),'user_id'=>0,'local_whatsappid'=>$ids);
				$hid=$DB->insert_record('local_whatsapp_time', $insnew);
				$flag=1;
			}else{
				$flag=2;
			}
			echo json_encode(array('flag'=>$flag,"message"=>$whatsapp->message));
		}else{
			$uphonenum1=array();
			if(($_REQUEST['alluser']==1) && !empty($_REQUEST['course'])){
					$allstudents=$DB->get_records_sql("SELECT c.id AS courseid,c.fullname,u.username,u.firstname, u.lastname,u.email,u.phone1 FROM ".$CFG->prefix."role_assignments ra JOIN ".$CFG->prefix."user u ON u.id = ra.userid JOIN ".$CFG->prefix."role r ON r.id = ra.roleid JOIN ".$CFG->prefix."context cxt ON cxt.id = ra.contextid JOIN ".$CFG->prefix."course c ON c.id = cxt.instanceid WHERE ra.userid = u.id AND ra.contextid = cxt.id AND cxt.instanceid = c.id and c.id=".$_REQUEST['course']);
					foreach($_REQUEST['students'] as $k){
						$phomenum=str_replace('-','',$k);
						$uphonenum='';
						if(strlen($phomenum)<12){
							$uphonenum='972'.str_replace('-','',$phomenum);
						}else{
							$uphonenum=str_replace('-','',$phomenum);
						}
						$uphonenum=str_replace('+','',$phomenum);
						if(substr($uphonenum,0,1)=="0"){
							$uphonenum1[]='972'.substr($uphonenum,1);
						}else{
							$uphonenum1[]=$uphonenum;
						}
					}
				}
				if(empty($uphonenum1)){
					$url = 'https://api.chat-api.com/instance'.$instanceId.'/me?token='.$token;
							// Make a POST request
							$options = stream_context_create(['http' => [
									'method'  => 'POST',
									'header'  => 'Content-type: application/json',
								]
							]);
							$result = json_decode(file_get_contents($url, false, $options));
							// str_replace
							$uphonenum1[]=str_replace('@c.us','',$result->id);
				}
			$data =["groupName"=>mb_substr(trim($_REQUEST['groupname']),0,25),'phones'=>implode(",",$uphonenum1)];
			$json = json_encode($data);
			$url = 'https://eu10.chat-api.com/instance'.$instanceId.'/group?token='.$token;
			$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json','content' => $json)));
			$result=file_get_contents($url, false, $options);
			$whatsapp=json_decode($result);
			if(!empty($whatsapp->chatId)){
				$course=0;
				if($_REQUEST['course']>0){
						$course=$_REQUEST['course'];
				}
				$ins = (object)array('name' =>substr(trim($_REQUEST['groupname']),0,25), 'course_id' =>$course,'page'=>$_REQUEST['id'],'whatsappid'=>$whatsapp->chatId,'joinurl'=>$whatsapp->groupInviteLink);
				$lid=$DB->insert_record('local_whatsapp', $ins);
				$insnew=array('local_whatsappid'=>(int)$lid,'course_id'=>$course,'last_chat_time'=>time(),'user_id'=>0);
				$hid=$DB->insert_record('local_whatsapp_time', $insnew);
				$flag=1;
			}else{
				$flag=2;
			}
			if($_REQUEST['redicttohome']==1){
				header('location:'. new moodle_url('/blocks/whatsapp_plugin/whatsapp.php'));
				die();
			}
		echo json_encode(array('flag'=>$flag,"message"=>$whatsapp->message,'json'=>$json));
		}
	}
}if($_REQUEST['flag']=='addnewrow'){
	//$_REQUEST['student']=json_decode($_REQUEST['student']);
	if(!empty($_REQUEST['id'])){
		$setting = $DB->get_records_sql('select instanceid,token from '.$CFG->prefix.'whatsappkey where id='.$_REQUEST['id']);
		foreach($setting as $s){
			$instanceId=$s->instanceid;
			$token=$s->token;
		}
	}else{
		$_REQUEST['id']=1;
	}
	if(!empty($_REQUEST['groupname'])){
		if(!empty($_REQUEST['joinurl'])){
			$url = 'https://eu10.chat-api.com/instance'.$instanceId.'/joinGroup?token='.$token.'&url='.$_REQUEST['joinurl'];
			$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
			$result=file_get_contents($url, false, $options);
			$whatsapp=json_decode($result);
			if(!empty($whatsapp->chatId)){
				foreach($_REQUEST['student'] as $s){
					$phomenum=str_replace('-','',$s);
					$uphonenum='';
					$uphonenum1="";
					if(strlen($phomenum)<12){
						$uphonenum='972'.str_replace('-','',$phomenum);
					}else{
						$uphonenum=str_replace('-','',$phomenum);
					}
					$uphonenum=str_replace('+','',$phomenum);
					if (substr($uphonenum,0,1)=="0"){$uphonenum1 = '972'.substr($uphonenum,1);}else{$uphonenum1=$uphonenum;}
					if(!empty($uphonenum1)){
						$data =["participantChatId"=>$uphonenum1.'@c.us',"groupId"=>$whatsapp->chatId];
						$json = json_encode($data); // Encode data to JSON
						$url = 'https://api.chat-api.com/instance'.$instanceId.'/addGroupParticipant?token='.$token;
						// Make a POST request
						$options = stream_context_create(['http' => [
								'method'  => 'POST',
								'header'  => 'Content-type: application/json',
								'content' => $json
							]
						]);
						$result = file_get_contents($url, false, $options);
						}
				}
				$course=0;
				if($_REQUEST['course']>0){
						$course=$_REQUEST['course'];
				}
				$ins = (object)array('name' =>trim($_REQUEST['groupname']),'course_id' =>$course,'whatsappid'=>$whatsapp->chatId,'page'=>$_REQUEST['id'],'joinurl'=>$_REQUEST['joinurl']);
				$ids=$DB->insert_record('local_whatsapp', $ins);
				$insnew=(object)array('course_id'=>$course,'last_chat_time'=>time(),'user_id'=>0,'local_whatsappid'=>$ids);
				$hid=$DB->insert_record('local_whatsapp_time', $insnew);
				$flag=1;
			}else{
				$flag=2;
			}
			echo json_encode(array('flag'=>$flag));
		}else{
			$arraystd=array();
			if(!is_array($_REQUEST['student'])){
				$arraystd=array($_REQUEST['student']);
			}else{
				$arraystd=$_REQUEST['student'];
			}
			$uphonenum1=array();
			foreach($arraystd as $s){
				$phomenum=str_replace('-','',$s);
				$uphonenum='';
				if(strlen($phomenum)<12){
					$uphonenum='972'.str_replace('-','',$phomenum);
				}else{
					$uphonenum=str_replace('-','',$phomenum);
				}
				$uphonenum=str_replace('+','',$phomenum);
				if (substr($uphonenum,0,1)=="0"){$uphonenum1[] = '972'.substr($uphonenum,1);}else{$uphonenum1[] =$uphonenum;}
			}
			$data =["groupName"=>$_REQUEST['groupname'],'phones'=>implode(",",$uphonenum1)];
			$json = json_encode($data);
			$url = 'https://eu10.chat-api.com/instance'.$instanceId.'/group?token='.$token;
			$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json','content' => $json)));
			$result=file_get_contents($url, false, $options);
			$whatsapp=json_decode($result);
			if(!empty($whatsapp->chatId)){
				$course=0;
				if($_REQUEST['course']>0){
						$course=$_REQUEST['course'];
				}
				$ins = (object)array('name' =>substr(trim($_REQUEST['groupname']),0,25), 'course_id' =>$course,'whatsappid'=>$whatsapp->chatId,'page'=>$_REQUEST['id'],'joinurl'=>$whatsapp->groupInviteLink);
				$lid=$DB->insert_record('local_whatsapp', $ins);
				$insnew=array('local_whatsappid'=>(int)$lid,'course_id'=>$course,'last_chat_time'=>time(),'user_id'=>0);
				$hid=$DB->insert_record('local_whatsapp_time', $insnew);
				$flag=1;
			}else{
				$flag=2;
			}
		echo json_encode(array('flag'=>$flag));
		}
	}
}
//updatekeygen
if(isset($_REQUEST['updatekeygen'])){
	if(!empty($_REQUEST['token']) && !empty($_REQUEST['email'])){
		$curl = curl_init();
		// set our url with curl_setopt()
		curl_setopt($curl, CURLOPT_URL,"http://moodlms.com/api/get_one_domin_detail/?token=".$_REQUEST['token']."&email=".$_REQUEST['email'].'&domain='. new moodle_url('/'));
		// return the transfer as a string, also with setopt()
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$headers=array("Access-Control-Allow-Origin"=>"*","Access-Control-Allow-Headers"=>"*");
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		$response = curl_exec($curl);
		curl_close($curl);
		$data=json_decode(json_decode($response));
		$flag1=$data->flag;
		$message=$data->message;
		if($flag1==1){//flag=='success'
			$DB->execute("UPDATE ".$CFG->prefix."whatsappkey SET emailid = '".$_REQUEST['email']."',licensekey='".$_REQUEST['token']."' WHERE id=".$_REQUEST['id']);
			echo json_encode(array('flag'=>'success'));
		}else{
			echo json_encode(array('flag'=>'fail'));
		}
	}
}
if(isset($_REQUEST['unsubupdatekey'])){
	($DB->execute("UPDATE ".$CFG->prefix."whatsappkey SET status=0 WHERE id=".$_REQUEST['id']));
}
if(isset($_REQUEST['updatenameonly'])){
	($DB->execute("UPDATE ".$CFG->prefix."whatsappkey SET accoutname='".$_REQUEST['name_c']."' WHERE id=".$_REQUEST['id']));
}if(isset($_REQUEST['resubscribe'])){
	($DB->execute("UPDATE ".$CFG->prefix."whatsappkey SET status=1 WHERE id=".$_REQUEST['id']));
}
if($_REQUEST['updatekeywidget']){
	$DB->execute("UPDATE ".$CFG->prefix."widgetwhatsapp_key SET instanceid='".$_REQUEST['instanceid']."',token='".$_REQUEST['token']."' WHERE id=".$_REQUEST['id']);
}
if(isset($_REQUEST['updatekey'])){
	if(!empty($_REQUEST['instanceid']) && !empty($_REQUEST['token']) && !empty($_REQUEST['id'])){
		$url = 'https://api.chat-api.com/instance'.$_REQUEST['instanceid'].'/status?token='.$_REQUEST['token'];
		$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
		$result=file_get_contents($url, false, $options);
		$status=json_decode($result);
		$isvaild=0;
		foreach($status as $k=>$r){
			if($k=='accountStatus'){
				$isvaild++;
			}
		}
		if($isvaild==0){
			echo json_encode(array('flag'=>1,'error'=>'Invaild instanceid or token.'));
		}else{
			($DB->execute("UPDATE ".$CFG->prefix."whatsappkey SET accoutname='".$_REQUEST['name_c']."',instanceid = '".$_REQUEST['instanceid']."',status=1,token='".$_REQUEST['token']."' WHERE id=".$_REQUEST['id']));
			echo json_encode(array('flag'=>2));
		}
	}elseif(!empty($_REQUEST['name_c']) && !empty($_REQUEST['id'])){
		($DB->execute("UPDATE ".$CFG->prefix."whatsappkey SET accoutname='".$_REQUEST['name_c']."' WHERE id=".$_REQUEST['id']));
			echo json_encode(array('flag'=>2));
	}
}
if($_REQUEST['updategroupname']){
	if($_REQUEST['gid']>0){
		$DB->execute("UPDATE `".$CFG->prefix."local_whatsapp` SET `name`='".$_REQUEST['gname']."' WHERE page=".$_REQUEST['pageid']." and `course_id` =".$_REQUEST['gid']);
	}
}
if($_REQUEST['page']=='removegroup'){
	if(!empty($_REQUEST['courseid'])){
		$DB->execute('delete from '.$CFG->prefix.'local_whatsapp where whatsappid="'.$_REQUEST['courseid'].'"');
	}
die();
}
if($_REQUEST['page']=='loaduserlist'){
	$users = $DB->get_records('user');
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
							$userarray[]=$u->id;?>
						<div class="chat-list-item <?php echo $active;?>" data-userid="<?php echo $u->id;?>" data-id="<?php echo $uphonenum.'@c.us';?>">
                            <div class="chat-item-img">
                                <div class="chat-item-img-inner">
                                    <img src="images/user.jpg" alt="">
                                    <span class="user-online"></span>
                                </div>
                            </div>
                            <div class="chat-item-right">
                                <div class="chat-item-title">
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
                                          <input type="checkbox" id="checku<?php echo $i;?>" name="checku<?php echo $i;?>" value="">
                                          <label for="checku<?php echo $i;?>"></label>
                                      </div>
                                  </div>
                                </div>
                            </div>
                            <div class="chat-info" id="user<?php echo $i;?>" data-toggle="tooltip" title="<div class='chat-create'><ul><li><a href='#'>Archive chat</a></li><li><a href='#'>Mute notifications</a></li><li><a href='#'>Exit Group</a></li></ul></div>">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </div>
                        </div>
						<?php
						}
					   $i++;
					   }
	die();
}
?>