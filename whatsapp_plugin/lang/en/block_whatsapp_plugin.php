<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Strings for component 'block_whatsapp_plugin', language 'en', branch 'MOODLE_20_STABLE'
 *
 * @package    block_whatsapp_plugin
 * @copyright  2015 Stephen Bourget
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
global $DB,$CFG;
if($_GET['section']=='blocksettingwhatsapp_plugin'){
$tablecheck=$DB->get_records_sql("SHOW TABLES LIKE '".$CFG->prefix."whatsappkey'");
$widkey=$DB->get_records_sql("SHOW TABLES LIKE '".$CFG->prefix."widgetwhatsapp_key'");
if(!empty($widkey)){
	$widgetlist=$DB->get_records("widgetwhatsapp_key",array(), $sort='', $fields='*', $limitfrom=0, $limitnum=2);
	if(empty($widgetlist)){
		$all_rows=array('instanceid'=>0,'token'=>0);
		$lstid=$DB->insert_record('widgetwhatsapp_key', $all_rows);
		$lstid=$DB->insert_record('widgetwhatsapp_key', $all_rows);
	}
	if(count($widgetlist)==1){
		$all_rows=array('instanceid'=>0,'token'=>0);
		$lstid=$DB->insert_record('widgetwhatsapp_key', $all_rows);
	}
}
if(!empty($tablecheck)){
$keys = $DB->get_records('whatsappkey');
$instanceid=0;
$token=0;
$id=0;
foreach($keys as $v2){
	$id=$v2->id;
	$instanceid=$v2->instanceid;
	$licensekey=$v2->licensekey;
	$token=$v2->token;
	$email=$v2->emailid;
}
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "http://moodlms.com/api/get_one_domin_detail/?productid=1758&token=".$licensekey."&email=".$email.'&domain='. new moodle_url('/'));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($curl);
curl_close($curl);
$data=json_decode(json_decode($response));
$keyname=array();
if($data->numlicense>count($keys)){
	$maxl=$data->numlicense-count($keys);
	for($h=0;$h<$maxl;$h++){
		$ins =(object)array('accoutname'=>'Account '.($h+1),'instanceid'=>0,'token'=>0,'status'=>0,'licensekey'=>$licensekey,'emailid'=>$email); 
		$ids=$DB->insert_record('whatsappkey', $ins);
	}
	$keys = $DB->get_records('whatsappkey');
}
$keys = $DB->get_records('whatsappkey');
$flag=0;
ob_start();
$users = $DB->get_records_sql('select * from '.$CFG->prefix.'user where phone1<>"" and suspended=0 and id not in (select user_id from '.$CFG->prefix.'local_whatsapp_time where archive=1)');
$users1 = $DB->get_records_sql('select * from '.$CFG->prefix.'user where phone1<>"" and suspended=0 and id not in (select user_id from '.$CFG->prefix.'local_whatsapp_time)');
$orderby="";
if(isset($_GET['name'])){$orderby=" order by w.name ".$_GET['name'];}
if(isset($_GET['courseid'])){$orderby=" order by c.idnumber ".$_GET['courseid'];}
if(isset($_GET['whatappid'])){$orderby=" order by w.whatsappid ".$_GET['whatappid'];}
$local_whatsapp = $DB->get_records_sql('SELECT * from '.$CFG->prefix.'course as c right join '.$CFG->prefix.'local_whatsapp as w on c.id=w.course_id where w.course_id not in(select id from '.$CFG->prefix.'course where enddate<'.time().' and enddate>0) '.$orderby);
if(empty($_GET['cpage'])){$_GET['cpage']=1;}
$limit=10;
$sc=0;
if($_GET['cpage']>0){
	$sc=($_GET['cpage']-1)*10;
}
$orderby="";
if(isset($_GET['name'])){$orderby="order by c.name ".$_GET['name'];}
if(isset($_GET['courseid'])){$orderby="order by c.idnumber ".$_GET['courseid'];}
$course = $DB->get_records_sql('SELECT c.* from '.$CFG->prefix.'course as c where c.id not in(select course_id from '.$CFG->prefix.'local_whatsapp) '.$orderby);
$coursestudebt = $DB->get_records_sql('SELECT *,ut.id as utid from '.$CFG->prefix.'user as u join '.$CFG->prefix.'local_whatsapp_time ut on ut.user_id=u.id group by u.id');
//secho ('SELECT *,count(*) as tnumr from '.$CFG->prefix.'course where id not in(select course_id from '.$CFG->prefix.'local_whatsapp) limit '.$sc.',10');
$tablecheck=$DB->get_records_sql("SHOW TABLES LIKE '".$CFG->prefix."widgetwhatsapp_key'");
	$flagforw=0;
	if(!empty($tablecheck)){
		$keyswid=$DB->get_record('widgetwhatsapp_key',array(),'*');
		$flagforw=1;
	}
 ?>
<div class="loaderdiv"><div id="loader"></div></div>
  <ul class="nav nav-tabs m-0">
    <li  class="active"><a data-toggle="tab" href="#menu2">Group Setting</a></li>
    <li><a data-toggle="tab" href="#menu1">Instance & Token</a></li>
    <?php /*<li><a data-toggle="tab" href="#menu4">Student List</a></li>*/?>
	<?php /*<li><a data-toggle="tab" href="#menu3" <?php if(empty($widkey)){ echo 'style=""';}?>>Widget Setting</a></li>*/?>
   </ul>
  <div class="tab-content">
  <input type="hidden" name="ajaxurl" id="ajaxurl" value="<?php echo new moodle_url('/blocks/whatsapp_plugin/ajax.php');?>">
    <div id="menu4" class="tab-pane whatsapp-form fade">
		<h3>Student list <button type="button" class="btn btn-primary addnewstudent pull-right" data-toggle="modal" data-target="#addnewusertime">Add New Student</button></h3>
		<?php if(!empty($coursestudebt)){?>
		<div class="table-responsive">
		<?php $flagnum=(int) ($GLOBALS['whatsppapnumusers']);?>
			<table cellpadding="5" cellspacing="5" class="table">
				<tr><th>User name</th><th>Phone Number</th><th>Action</th></tr>
				<?php 
				foreach($coursestudebt as $ud){
					echo "<tr><td>".$ud->firstname." ".$uy->lastname."</td><td>".$ud->phone1.'</td><td><input type="button" data-toggle="modal" data-target="#removeuser"  value="Delete" data-id="'.$ud->utid.'" class="btn btn-default btn-user-delete"></td></tr>';
					$flagnum--;
				}
				?>
			</table>
		</div>
		<?php }?>
	</div>
	<div id="menu1" class="tab-pane whatsapp-form fade">
      <h3>Instance & Token (Your license key : <?php echo $licensekey;?>)</h3>
      <p>
      <div class="table-responsive">
	 <table cellpadding="5" cellspacing="5" class="table"><tr><th>Account Name</th><th>Instance Id</th><th>Token</th><th></th><th></th></tr>
	 <?php 
	 $ui=0;
	 foreach($keys as $k5){
		 $keyname[$k5->id]=$k5->accoutname;
		  if($data->numlicense>$ui){
			  $ui++;
		  $status=$k5->status;
		  $flagr=0;
		  if($k5->status==0){
			  $url = 'https://api.chat-api.com/instance'.$k5->instanceid.'/status?token='.$k5->token;
				$options = stream_context_create(array('http' => array('method'  => 'GET','header'  => 'Content-type: application/json')));
				$result=file_get_contents($url, false, $options);
				$statusn=json_decode($result);
				$flagr=1;
				foreach($statusn as $k=>$r){
					if($k=='accountStatus'){
						$flagr++;
						$k5->instanceid="";
						$k5->token="";
					}
				}
		  }?>
		<tr><td><input type="text" name="name<?php echo $v->id;?>"  class="name_c" id="name_c<?php echo $k5->id;?>" value="<?php echo $k5->accoutname;?>" placeholder="Enter Name"><?php //echo $k5->id;?></td><?php if($status!=1){?><td><input type="hidden" name="id" value="<?php echo $k5->id;?>" class="keyid">
		  <input type="text" name="instanceid" class="instanceid" value="<?php echo $k5->instanceid;?>"></td><td><input type="text" name="token" class="token" value="<?php echo $k5->token;?>"></td><?php }else{?><td><input type="hidden" name="id" value="<?php echo $k5->id;?>" class="keyid">*****</td><td>*****</td><?php }?><td><a href="<?php echo new moodle_url('/blocks/whatsapp_plugin/whatsapp.php?id='. $k5->id);?>" class="<?php if($status!=1){?> hide <?php }?>">Go to front page</a></td><td><?php if($flagr>0){?><input type="button" value="Resubscribe" class="resubscribe btn"><input type="button" name="update" value="Update" class="updatekey btn"><?php }elseif($status!=1){?><input type="button" name="update" value="Update" class="updatekey btn"><?php }else{?><input type="button" value="Unsubscribe" class="unsubscribe btn"><input type="button" value="Update" class="updatenameonly btn"><?php }?></td></tr>
	 <?php 
		  }
	 }?>
	</table>
        </div>
	</p>
    </div>
    <div id="menu2" class="tab-pane whatsapp-form fade active show">
      <h3><button type="button" class="btn btn-primary addnewpopup pull-right" data-toggle="modal" data-target="#addnewgroup">Add New Group</button> Group Setting</h3>
      <div class="table-responsive">
<table cellpadding="5" cellspacing="5" class="table">
<tr class="panel-group">
	<th>#</th>
	<th><a href="<?php echo ($_GET['name']=='asc')? '?section=blocksettingwhatsapp_plugin&name=desc':'?section=blocksettingwhatsapp_plugin&name=asc';?>"><?php if($_GET['name']=='asc'){echo '<i class="fa fa-arrow-down" aria-hidden="true"></i>';}elseif($_GET['name']=='desc'){echo '<i class="fa fa-arrow-up" aria-hidden="true"></i>';}?> Name</a></th>
	<th><a href="<?php echo ($_GET['courseid']=='asc')? '?section=blocksettingwhatsapp_plugin&courseid=desc':'?section=blocksettingwhatsapp_plugin&courseid=asc';?>"><?php if($_GET['courseid']=='asc'){echo '<i class="fa fa-arrow-down" aria-hidden="true"></i>';}elseif($_GET['courseid']=='desc'){echo '<i class="fa fa-arrow-up" aria-hidden="true"></i>';}?> Course Id<a></th>
	<th><a href="<?php echo ($_GET['whatappid']=='asc')? '?section=blocksettingwhatsapp_plugin&whatappid=desc':'?section=blocksettingwhatsapp_plugin&whatappid=asc';?>?whatappid=asc"><?php if($_GET['whatappid']=='asc'){echo '<i class="fa fa-arrow-down" aria-hidden="true"></i>';}elseif($_GET['whatappid']=='desc'){echo '<i class="fa fa-arrow-up" aria-hidden="true"></i>';}?> Whatsapp Id</a></th>
	<th>Join Url</th>
	<th>Phone</th>
	<th>Action</th>
</tr>
<?php 
$cindex=1;
foreach($local_whatsapp as $v){ ?>
	<tr class="panel-group">
		<td class="media-middle"><?php echo $cindex;?></td>
		<td class="media-middle"><?php echo $v->name;?></td>
		<td class="media-middle"><?php echo ($v->course_id>0)? $v->idnumber:'';?></td>
		<td class="media-middle"><?php echo $v->whatsappid;?></td>
		<td class="media-middle"><?php echo $v->joinurl;?></td>
		<td class="media-middle"><?php echo $keyname[$v->page];?></td>
		<td class="media-middle"><input type="button" value="Delete" data-id="<?php echo $v->id;?>" data-name="<?php echo $v->name?>" class="btn btn-default btn-delete"></td>
		</tr>
<?php 	$cindex++;
}
$tcnumbers=0;
foreach($course as $v){
$tcnumbers=$v->tnumr;	?>
	<tr class="panel-group singlecourse">
		<td class="media-middle"><?php echo $cindex;?></td>
		<td class="media-middle"><input type="hidden" class="course_id" name="id<?php echo $v->id;?>" value="<?php echo $v->id;?>" id="id<?php  echo $v->id;?>"><input type="text" name="shortname<?php echo $v->id;?>" id="shortname<?php echo $v->id;?>" class="shortname" value="<?php echo $v->shortname;?>" placeholder="Enter group name"></td>
		<td class="media-middle"><?php echo ($v->idnumber>0)? $v->idnumber:'';?></td>
		<td class="media-middle"><input type="text" name="joinurl<?php echo $v->id;?>"  class="joinurl" id="joinurl<?php echo $v->id;?>" value="" placeholder="Enter join url"></td>
		<td class="media-middle" colspan="2"><div class="checkboxallusers pull-left"><input type="checkbox" class="alluser" id="alluser<?php echo $v->id;?>" value="alluser">Add All Users </div>
		<select name="phonetwo" class="form-control col-sm-6 phonetwo pull-right">
					<?php foreach($keys as $c){
						if($c->status==1){
							echo '<option value="'.$c->id.'">'.$c->accoutname.'</option>';
						}
					}?>
				</select></td>
		<td> <input type="button" value="Update" class="btn pull-right add_new_group"></td>
	</tr>
<?php 	$cindex++;}?>
</table>
<nav aria-label="Page navigation example">
  <ul class="pagination">
<?php 
if(ceil($tcnumbers/10)>1 && ($_GET['cpage']!=1)){
	echo '<li class="page-item"><a href="javascript:void(0);">'.$iy.'</a></li>';
}
for($iy=1;$iy<ceil($tcnumbers/10);$iy++){
	if((int) $_GET['cpage']==$iy){
		echo '<li class="page-item"><a href="javascript:void(0);">'.$iy.'</a></li>';
	}else{
		echo '<li class="page-item"><a href="'.new moodle_url('admin/settings.php?section=blocksettingwhatsapp_plugin&cpage=').$iy.'">'.$iy.'</a></li>';
	}
}?></ul>
</nav>
        </div>
<!-- Modal -->
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
					<?php foreach($course as $c){
						//if($c->status==1){
							echo '<option value="'.$c->id.'">'.$c->shortname.'</option>';
						//}
					}?>
				</select>
			  </div>
			  <?php if(count($keys)>1){?>
			  <div class="form-group">
				<label for="phonekey">Phone </label>
				<select name="phonekey" class="form-control" id="phonekey">
					<?php foreach($keys as $c){
						if($c->status==1){
							echo '<option value="'.$c->id.'">'.$c->accoutname.'</option>';
						}
					}?>
				</select>
			  </div>
			  <?php }else{
				  echo '<input type="hidden" name="phonekey" id="phonekey" value="'.$id.'">';
			  }?>
			  <div class="form-group">
				<label for="student">Users </label>
				<select name="student[]" class="form-control student" multiple="true" id="student">
					<?php foreach($users as $u){
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
    </div>
	<div id="menu3" class="tab-pane whatsapp-form fade">
		<h3>Widget Setting</h3>
		<?php if(empty($flagforw)){
			echo '<div class="alert alert-danger" role="alert">Please install widget plugin</div>';
		}else{?>
		<div class="table-responsive">
			<table cellpadding="5" cellspacing="5" class="table"><tr><td></td><th>Instance Id</th><th>Token</th><th></th></tr>
			<?php 
			$stud=0;
			foreach($widgetlist as $g1){?>
			<tr><td><input type="hidden" class="idofkey" value="<?php echo $g1->id;?>"><?php if($stud==0){echo 'Student Key';$stud++;}else{echo 'Teacher Key';}?></td><td><input type='text' name='widget_iid<?php echo $g1->id;?>' class="widget_iid" value="<?php echo (!empty($g1->instanceid))? $g1->instanceid :'';?>"></td><td><input type='text' name='widget_tok' class="widget_tok" value="<?php echo (!empty($g1->token))? $g1->token :'';?>"></td><td><input type='button' value="update" class="updatewidget btn"></td></tr>
			<?php }?>
	 </table>
	 </div>
		<?php }?>
	</div>
  </div>
<div class="modal sign_up_modal fade in" id="deletegroup" tabindex="-1" role="dialog" aria-labelledby="addnewgroupLabel" aria-hidden="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div class="modal-body">
		<input type="hidden" id="deletegroupid" value="">
		<div class="delete-message-text"><h2 class='msgdel'>Are you sure you want to Delete?</h2><h2>&nbsp;</h2></div>
		<div class="clearfix"><a href="javascript:void(0);" role="button" class="btn btn-primary yes-message pull-right">Yes</a><a href="javascript:void(0);" role="button" class="btn pull-right btn-default no-message" data-dismiss="modal">No</a></div>
	  </div>
	</div>
  </div>
</div>
<div class="modal sign_up_modal fade in" id="unsubscribepopup" tabindex="-1" role="dialog" aria-labelledby="addnewgroupLabel" aria-hidden="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div class="modal-body">
		<input type="hidden" id="updatestatusid" value="">
		<div class="delete-message-text"><h2 class='msgdel'>Are you sure you want to Unsubscribe?</h2><h2>&nbsp;</h2></div>
		<div class="clearfix"><a href="javascript:void(0);" role="button" class="btn btn-primary yes-message pull-right">Yes</a><a href="javascript:void(0);" role="button" class="btn pull-right btn-default no-message" data-dismiss="modal">No</a></div>
	  </div>
	</div>
  </div>
</div>
<div class="modal sign_up_modal fade in" id="removeuser" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div class="modal-body">
		<input type="hidden" value="" id="removetimeuserid">
		<div class="delete-message-text"><h2 class='msgdel'>Are you sure you want to Delete user?</h2><h2>&nbsp;</h2></div>
		<div class="clearfix"><a href="javascript:void(0);" role="button" class="btn btn-primary yes-messageuser pull-right">Yes</a><a href="javascript:void(0);" role="button" class="btn pull-right btn-default no-message" data-dismiss="modal">No</a></div>
	  </div>
	</div>
  </div>
</div>
<div class="modal sign_up_modal fade in" id="addnewusertime" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div class="modal-body">
	  <?php if($flagnum>0){?>
		<div class="form-group" data-mlen="<?php echo ($flagnum);?>">
				<label for="groupname">Student</label>
				<select name="student1[]" class="form-control studentnewtime" multiple="true" id="studentnewtime" data-mlen="<?php echo ($flagnum);?>">
					<?php foreach($users1 as $u){
						echo '<option value="'.$u->id.'">'.$u->firstname.' '.$u->lastname.'</option>';
					}?>
				</select>
		</div>
		<div class="clearfix"><a href="javascript:void(0);" role="button" class="btn btn-primary yesaddnewuser pull-right">Add Users</a><a href="javascript:void(0);" role="button" class="btn pull-right btn-default" data-dismiss="modal">Close</a></div>
		<?php 
	  }else{
		  ?><div class="form-group"><?php 
		echo "You need to buy more student access";  
		?><div class="clearfix"><a href="javascript:void(0);" role="button" class="btn pull-right btn-default" data-dismiss="modal">Close</a></div><?php 
	  }?>
	  </div>
	</div>
  </div>
</div>
<script src="<?php echo new moodle_url('/blocks/whatsapp_plugin/js/bootstrap.js');?>"></script>
<script src="<?php echo new moodle_url('/blocks/whatsapp_plugin/js/admincustom.js?v='.time());?>"></script>
<link href="<?php echo new moodle_url('/blocks/whatsapp_plugin/css/bootstrap.css');?>" rel="stylesheet" type="text/css" />
<link href="<?php echo new moodle_url('/blocks/whatsapp_plugin/css/admincustom.css?v='.time());?>" rel="stylesheet" type="text/css" />
<?php 
$htmlget=ob_get_contents();
ob_clean();
}
}else{
	$htmlget="";
}
$string['recapchainfo'] = 'Whatsapp Setting';
$string['norecaptcha'] = 'No ReCAPTCHA';
$string['recapchainfo_description'] = $htmlget;
$string['defaulthighestgrades']= $htmlget;
$string['activity_results:addinstance'] = 'Add a new activity results block';

$string['pluginname'] = 'Whatsapp plugin';
$string['privacy:metadata'] = 'The Whatsapp plugin block only shows data stored in other locations.';
