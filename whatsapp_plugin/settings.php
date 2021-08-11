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
 * Defines the form for editing activity results block instances.
 *
 * @package    block_activity_results
 * @copyright  2016 Stephen Bourget
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;
$GLOBALS['whatsppapnumusers']=0;
if ($ADMIN->fulltree) {
    // Default high scores.
	 purge_caches();
	 global $DB,$CFG;
	 if(!empty($_REQUEST['section']=='blocksettingwhatsapp_plugin')){
	 $tablecheck=$DB->get_records_sql("SHOW TABLES LIKE '".$CFG->prefix."whatsappkey'");
	if(!empty($tablecheck)){
			$keys = $DB->get_records_sql('select * from '.$CFG->prefix.'whatsappkey where id=1');
			if(count($keys)==0){
				$ins =(object)array('instanceid'=>0,'token'=>0,'status'=>0,'licensekey'=>'0','token'=>0,'emailid'=>'0'); 
				$ids=$DB->insert_record('whatsappkey', $ins);
				$keys = $DB->get_records('whatsappkey');
			}
			$flag=2;
			$instanceid=0;
			$token=0;
			$id=0;
			foreach($keys as $v2){
				$id=$v2->id;
				$instanceid=$v2->instanceid;
				$licensekey=$v2->licensekey;
				$email=$v2->emailid;
			}
			$message="";
			if(!empty($email) && !empty($licensekey)){
				$curl = curl_init();
				// set our url with curl_setopt()
				curl_setopt($curl, CURLOPT_URL,"http://moodlms.com/api/get_one_domin_detail/?productid=1758&token=".$licensekey."&email=".$email.'&domain='. new moodle_url('/'));
				// return the transfer as a string, also with setopt()
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
				$headers=array("Access-Control-Allow-Origin"=>"*","Access-Control-Allow-Headers"=>"*");
				curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
				$response = curl_exec($curl);
				// close curl resource to free up system resources
				// (deletes the variable made by curl_init)
				curl_close($curl);
				$data=json_decode(json_decode($response));
				$flag1=$data->flag;
				$message=$data->message;
				$GLOBALS['whatsppapnumusers']=$data->data->numusers;
				if($flag1>0){
					$flag=$flag1;
				}
			}
			$nodatabase=0;
	}else{
		$flag=2;
		$nodatabase=1;
	}
		if($flag==2){
			if($nodatabase!=1){
				if(!empty($message)){
					$message='<div class="alert alert-danger" role="alert">'.$message.'</div>';
				}
			$htmldelt=$message.'<input type="hidden" name="keyid" value="'.$id.'" id="keyid"><input type="hidden" name="ajaxurl" id="ajaxurl" value="'. new moodle_url('/blocks/whatsapp_plugin/ajax.php').'"><input type="hidden" name="domaindetails" id="domaindetails" value="'. new moodle_url('/').'"><div class="form-group enter_token"><label for="yourtoken">Enter Your license key</label><input type="text" class="form-control" id="yourtoken" name="yourtoken" placeholder="Enter Your license key"></div><div class="form-group enter_token"><label for="emailidadd">Enter Your emailid</label><input type="text" class="form-control" id="emailidadd" name="emailidadd" placeholder="Enter emailid"></div><input type="button" name="submit" class="btn btn-primary" id="whatsappkey" value="Submit"><script src="'. new moodle_url('/blocks/whatsapp_plugin/js/admincustom.js?v=s'.time()).'"></script><link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link href="'.new moodle_url('/blocks/whatsapp_plugin/css/admincustom.css?v='.time()).'" rel="stylesheet" type="text/css" />';
			}else{
				$htmldelt='';
			}
		}else{
			//$DB->execute('delete from '.$CFG->prefix.'local_whatsapp where whatsappid="'.$_REQUEST['courseid'].'"');
			$keys = $DB->get_records('whatsappkey');
			foreach($keys as $v2){
				$id=$v2->id;
				$instanceid=$v2->instanceid;
				$token=$v2->licensekey;
				$email=$v2->emailid;
			}
			//$description = get_string('recapchainfo_description', 'local_whatsapp');
			$htmldelt=new lang_string('defaulthighestgrades', 'block_whatsapp_plugin');
		}
    $setting = new admin_setting_configtext('block_whatsapp_plugin/config_showbest',$htmldelt,
        new lang_string('defaulthighestgrades_desc', 'block_whatsapp_plugin'), 12, PARAM_INT);
    $setting->set_locked_flag_options(admin_setting_flag::ENABLED, false);
    $settings->add($setting);
	 }
}
