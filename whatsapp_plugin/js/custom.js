//$(document).ready(function(){
$(window).on('load', function() {
	domainlisr=new Array("com", "org", "net", "int", "edu", "gov","mil",'aero', 'asia', 'biz', 'cat', 'com', 'coop', 'info', 'int', 'jobs', 'mobi', 'museum', 'name', 'net', 'org', 'post', 'pro', 'tel', 'travel', 'xxx', 'ac', 'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mlc', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'st', 'su', 'sv', 'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tr', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'um', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'za', 'zm', 'zw');
			docfiles=new Array('doc','docx','htm','html','odt','pdf','xls','xlsx','ods','ppt','pptx','txt','csv','xml','md');
			imgExts = new Array("gif", "jpg", "jpeg", "png", "tiff", "tif");
			videotype=new Array("mp4");
			mp3file=new Array('oga','mp3','ogg');
	setTimeout(function(){
		heightdiv=$('body').find('.chat-list').height();
		$('<style type="text/css" id="stylecssoption"></style><style type="text/css" id="stylecss">.orderdiv {max-height: '+heightdiv+'px !important;} .chat-right-list.active{height: '+(heightdiv - 5)+'px !important;}</style>').appendTo($('head'));
	},500);
	$( window ).resize(function() {
		heightdiv=$('body').find('.chat-list').height();
		$('head').find('#stylecss').html('.orderdiv {max-height: '+heightdiv+'px !important;} .chat-right-list.active{height: '+(heightdiv - 5)+'px !important;}');
	});
   $('.chat-setting').click(function(){
      $(this).toggleClass('active'); 
   });
   $('.right-info').click(function(){
      $(this).toggleClass('active'); 
   });
   $('body').on('click','.msg-info',function(){
	  $('body').find('.msg-info').removeClass('active');   
      $(this).addClass('active'); 
   });
   $('.accountsetting,.reload_qr_code').click(function(){
	   $('.loaderdiv').show();
   })
   // WhatsApp open in multiple 
   $('.accountloading .logout').click(function(){
	    $('.loaderdiv').show();
		$.get($(this).attr('data-href'), function (data) {
			setTimeout(function(){
				window.location.href=window.location.href
			},500);
		});
   })
   //mute and unmute 
    $('body').on('click','a.mutenoti',function(){
		$(this).addClass('hide');
		$(this).closest('.chat-create').find('.unmutenoti').removeClass('hide');
		$('body').find('.chat-list-item[data-id="'+$(this).closest('.chat-create').find('.userdeletechat').attr('data-id')+'"] .chat-info').attr('data-original-title',$(this).closest('.tooltip-inner').html());
		var token = $('#token').val();//'2wiciu5rlc4ehwbc';
		var instanceId =$('#instanceId').val();
		var timelagid=$(this).closest('.chat-create').find('.userdeletechat').attr('datalasttid');
		$('body').find('.chat-list-item[data-id="'+$(this).closest('.chat-create').find('.userdeletechat').attr('data-id')+'"]').addClass('mutenotification');
		$.ajax({
				type: 'POST',
				url: 'ajax.php?mute=mutenotification&token='+token+'&instanceId='+instanceId+'&mutet=1&lastdata='+timelagid,
				success: function(data){}
			});
	});
	$('body').on('click','a.unmutenoti',function(){
		$(this).addClass('hide');
		$(this).closest('.chat-create').find('.mutenoti').removeClass('hide');
		var token = $('#token').val();//'2wiciu5rlc4ehwbc';
		var instanceId =$('#instanceId').val();
		var timelagid=$(this).closest('.chat-create').find('.userdeletechat').attr('datalasttid');
		$(this).closest('.chat-create').find('.userdeletechat').attr('datalasttid');
		$('body').find('.chat-list-item[data-id="'+$(this).closest('.chat-create').find('.userdeletechat').attr('data-id')+'"]').removeClass('mutenotification');
		$.ajax({
				type: 'POST',
				url: 'ajax.php?mute=mutenotification&token='+token+'&instanceId='+instanceId+'&mutet=0&lastdata='+timelagid,
				success: function(data){
				}
			});
	});
	// click on pig 
	$('body').on('click','a.userpinchat',function(){
		$(this).addClass('hide');
		$(this).closest('.chat-create').find('.userunpinchat').removeClass('hide');
		var token = $('#token').val();//'2wiciu5rlc4ehwbc';
		var instanceId =$('#instanceId').val();
		var timelagid=$(this).closest('.chat-create').find('.userdeletechat').attr('datalasttid');
		$('body').find('.chat-list-item[data-id="'+$(this).closest('.chat-create').find('.userdeletechat').attr('data-id')+'"]').addClass('pinchat');
		$.ajax({
				type: 'POST',
				url: 'ajax.php?pin=pin&token='+token+'&instanceId='+instanceId+'&pinv=1&lastdata='+timelagid,
				success: function(data){}
			});
	});
	$('body').on('click','a.userunpinchat',function(){
		$(this).addClass('hide');
		$(this).closest('.chat-create').find('.userpinchat').removeClass('hide');
		var token = $('#token').val();//'2wiciu5rlc4ehwbc';
		var instanceId =$('#instanceId').val();
		var timelagid=$(this).closest('.chat-create').find('.userdeletechat').attr('datalasttid');
		$(this).closest('.chat-create').find('.userdeletechat').attr('datalasttid');
		$('body').find('.chat-list-item[data-id="'+$(this).closest('.chat-create').find('.userdeletechat').attr('data-id')+'"]').removeClass('pinchat');
		$.ajax({
				type: 'POST',
				url: 'ajax.php?pin=pin&token='+token+'&instanceId='+instanceId+'&pinv=0&lastdata='+timelagid,
				success: function(data){
				}
			});
	});
   // delete group message of user message
    $('body').on('click','a.userdeletechat',function(){
		popupmsh="";
		 if($(this).hasClass('userin')){
			popupmsh='Delete All messages of "'+$(this).attr('data-name')+'" user?'; 
		 }else{
			popupmsh='Delete messages of "'+$(this).attr('data-name')+'" group?';
		 }
		 $('#deletepopupuser').find('.delete-message-text h2.msgdel').html(popupmsh);
		$('#grouporuserid').val($(this).attr('data-id'));
		$('#grouporuseridclass').val($(this).attr('data-rid'));
		$('#datalasttid').val($(this).attr('datalasttid'));
		$('#deletepopupuser').modal({show: 'true',backdrop: 'static',keyboard: false});
   });
   // delete message
   $('#deletepopupuser').on('click','a.del-message',function(){
	   $('#deletepopupuser').find('.clearfix').hide();
	   $('#deletepopupuser').find('.clearfix').after('<p class="msg">Please Wait</p>');
	 	var token = $('#token').val();//'2wiciu5rlc4ehwbc';
		var instanceId =$('#instanceId').val();
		$.ajax({
				type: 'POST',
				url: 'ajax.php?delf=deletegroupmsg&id='+$('#grouporuserid').val()+'&token='+token+'&instanceId='+instanceId+'&lastdata='+$('#datalasttid').val(),
				success: function(data){
					var json=$.parseJSON(data);
					if(json.flag==1){
						$('#deletepopupuser').find('.clearfix').show();
						$('#deletepopupuser').find('p.msg').remove();
						$('#deletepopupuser').modal('toggle');
						$('body').find('.chat-right-list.'+$('#grouporuseridclass').val()).html('');
						$('body').find('.chat-list-item[data-id="'+$('#grouporuserid').val()+'"] .chat-last-msg').html('');
						$('body').find('.chat-list-item[data-id="'+$('#grouporuserid').val()+'"]').css('order','1001');
					}else{
						window.onbeforeunload = null;
						window.location.reload(true);
					}
				}
			});
   });
   // delete single message 
   $('body').on('click','.deletemsg',function(){
		 $('#deletepopup').modal({show: 'true'});
		$('#hiddeletemsgid').val($(this).closest('.msg-info').attr('msg-id'));
   });
   $('body').on('click','a.archive',function(){
		 $('#archivepopup').modal({show: 'true'});
		$('#hiddenarchiveid').val($(this).attr('data-uid'));
		$('#archivepopup').find('.nameofuser').html($(this).closest('.chat-create').find('.userdeletechat').attr('data-name'));
   });
   $('#archivepopup').on('click','a.archive-message',function(){
	   $('.loaderdiv').show();
	   $.ajax({type: 'POST',url: 'ajax.php?flag=archiveuser&id='+$('#hiddenarchiveid').val(),success: function(){
					$('#archivepopup').find('.clearfix').after('<div class="alert alert-success">User archived successfully.</div>');
					window.onbeforeunload = null;
					window.location.reload(true);
				}
			});
   }) 
    $('#deletepopup').on('click','a.del-message',function(){
		$('body').find('.msg-info[msg-id="'+$('#hiddeletemsgid').val()+'"]').closest('.chat-messagelist').html('<div class="chat-message-inner text"><div class="user-message"><div class="user-message-inner"><div class="user-text"><div class="user-text-inner"><span>This message is deleted</span></div></div></div></div></div>');
		$('#deletepopup').modal('toggle');
		var instanceId =$('#instanceId').val();
				var token = $('#token').val();//'2wiciu5rlc4ehwbc';
				var url = "https://api.chat-api.com/instance"+instanceId+"/deleteMessage?token="+token;
					var data = {
						messageId:$('#hiddeletemsgid').val(),
					};
				$.ajax(url, {
					data : JSON.stringify(data),
					contentType : 'application/json',
					type : 'POST'
				});
	})
	// file upload 
   $('input[type=file]').change(function() { 
		var lastv =$(this).val().substring($(this).val().lastIndexOf("\\") + 1, $(this).val().length);
	//	console.log(($(this).closest('.formmessage').find('.filename').hasClass('filename')));
		
		if($(this).closest('.formmessage').find('.filename').hasClass('filename')){
		$('.file_nameview').find('.filename').html(lastv);
		}else{
			var last = (lastv.substring(lastv.lastIndexOf(".") + 1, lastv.length));
			imgExts = new Array("gif", "jpg", "jpeg", "png", "tiff", "tif");
			if(imgExts.indexOf(last.toLowerCase()) != -1){imgp=readURL(this);}else{imgp='images/docs.png';}
			$('.file_nameview').html('<p class="filename"><img src="'+imgp+'" style="max-height:80px;">'+lastv+'</p>');
		}
   })
   $('body').on('submit','.formmessage',function(e){
	   e.preventDefault();
	   if($(this).closest('.chat-right-area').find('.formmessage .messagefile').val()){
		  if($('.listoflist.'+$('.chat-categoty.active').attr('data-link')).find('[type="checkbox"]:checked').length>0){
				var listofchatapi="0";
				$('.listoflist.'+$('.chat-categoty.active').attr('data-link')).find('[type="checkbox"]:checked').each(function( index ) {
					if($(this).is(":checked")){
						listofchatapi=listofchatapi+","+$(this).val();
					}
				});
				$('.chat-right-area').find('.sendphones').val(listofchatapi);
			}else{
				$(this).closest('.chat-right-area').find('.sendphones').val($('.chat-right-textarea').attr('datap'));
			}
			vdividar =$(this).closest('.chat-right-area').attr('id');
			$.ajax({
				type: 'POST',
				url: 'fileupload.php?id='+$('#pageid').val(),
				data: new FormData(this),
				dataType: 'json',
				contentType: false,
				cache: false,
				processData:false,
				beforeSend: function(){},
				success: function(){
					$('body').find('.chat-footer .messagefile').val('');
					$('body').find('.chat-footer .filename').html('');
				}
			});
			$('body').find('.chat-footer .messagefile').val('');
			$('body').find('.chat-footer .filename').html('');
		}
   })/*
    $('.right-searchbar .search').keyup(function () {
		
	})*/
		// Get the input box
	let input = document.getElementById('rightsidesearch');
	// Init a timeout variable to be used below
	let timeout = null;
	// Listen for keystroke events
	input.addEventListener('keyup', function (e) {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			gsearch=$('#rightsidesearch').val().toLowerCase();
			if($.trim(gsearch).length>3){
			$('.right-search-data ul').html('');
			$("body").find('.chat-right-list.active .user-text-inner').each(function(){
				if($(this).find('span').html().toLowerCase().indexOf(gsearch)>=0){
					var msgdate=new Date(1000*$(this).closest('.chat-messagelist').attr('data-time'));
					$sendername="";
					if($(this).closest('.chat-messagelist').hasClass('chat-message-out')){
						$sendername="Me";
					}else{
						$sendername=$(this).closest('.chat-messagelist').find('.use-name-no').html().split('<span>');
						$sendername=$sendername[0];
					}
					$('.right-search-data ul').append('<li class="searchli" role="button" data-time="'+$(this).closest('.chat-messagelist').attr('data-time')+'"><span class="search-date">'+msgdate.getDate()+'/'+msgdate.getMonth()+'/'+msgdate.getFullYear()+'</span><div class="search-result">'+$sendername+': '+$(this).html().replace(gsearch,'<span>'+gsearch+'</span>')+'</div></li>');
				}
			});
			}else{
				$('.right-search-data ul').html('<li><span class="search-date"></span><div class="search-result">Please enter more then 3 characters</div></li>');
			}
		}, 1000);
	});
   $('.chat-right-textarea input[type="button"]').click(function(){
	  $tval=$('#message_write').val();
	  $('body').find('.formmessage').trigger('submit');
	   if($('.'+$('.chat-categoty.active').attr('data-link')+' input[type="checkbox"]:checked').length>0){
			$('.'+$('.chat-categoty.active').attr('data-link')+' input[type="checkbox"]:checked').each(function( index ) {
				if($.trim($(this).val()) && $.trim($tval)){
					var token = $('#token').val();
					var instanceId =$('#instanceId').val();
					var url = "https://api.chat-api.com/instance"+instanceId+"/sendMessage?token="+token;
				//	var url = "http://moodlms.com/api/sendMessage/?";
					//if($(this).closest('.listoflist').hasClass('courselist') || $(this).closest('.listoflist').hasClass('categorylist')){
						var data = {
							chatId:$(this).val(),
							message:$tval
							};
				//	}else{
					/*	var data = {
							phone:$(this).val(), // Receivers phone
							body:$tval, // Message
						};*/
				//	}
					// Send a request
					$.ajax(url, {
						data : JSON.stringify(data),
						contentType : 'application/json',
						type : 'POST'
					});
				}
			}); 
		 }else{
			if($.trim($(this).closest('.chat-right-textarea').attr('datap')) && $.trim($(this).val())){
				var token = $('#token').val();
				var instanceId =$('#instanceId').val();
				var datap=$(this).closest('.chat-right-textarea').attr('datap').split(',');
				var url = "https://api.chat-api.com/instance"+instanceId+"/sendMessage?token="+token;
				//var url = "http://moodlms.com/api/sendMessage/?";
				for($i=0;$i<datap.length;$i++){
				//	if(datap[$i].length>20){
						var data = {
							chatId:datap[$i],
							message:$('#message_write').val()
							};
				/*	}else{
						var data = {
							phone:datap[$i], // Receivers phone
							body: $('#message_write').val(), // Message
						};*/
				//	}
					// Send a request
					$.ajax(url, {
						data : JSON.stringify(data),
						contentType : 'application/json',
						type : 'POST'
					});
				}
			}
		 }
			$('#message_write').val('');
			return false;
   })
    $('.chat-categoty').click(function(){
		$('.chat-categoty').removeClass('active');
		$('.listoflist').addClass('hide');
		$('.listoflist.'+$(this).attr('data-link')).removeClass('hide');
		$(this).addClass('active');
		if($(this).attr('data-link')=='userlist' || $(this).attr('data-link')=='courselist'){ 
			$('.studentsearch.form-control').removeClass('hide');
			$('.chat-left-search .search').attr('style','max-width:calc(100% - 120px);');
		}else{
			$('.studentsearch.form-control').addClass('hide');
			$('.chat-left-search .search').attr('style','max-width:calc(100% - 20px);');
		}
	})
	$('.studentsearch.form-control').change(function(){
	   gsearch=$('.chat-left-search .search').val().toLowerCase();
		sfv=$('.studentsearch.form-control').val();
		$(".chat-list-inner .chat-list-item").each(function( index ) {
			if(sfv=='courseid'){
				if($(this).attr('data-cids').indexOf(gsearch)>=0){
					$(this).removeClass('hide');
				}else{
					$(this).addClass('hide');
				}
			}else{
				if($(this).attr('data-search').indexOf(gsearch)>=0){
					$(this).removeClass('hide');
				}else{
					$(this).addClass('hide');
				}
			}
		});
   })
    $('.chat-left-search .search').keyup(function (e) {
		gsearch=$(this).val().toLowerCase();
		sfv=$('.studentsearch.form-control').val();
		$(".chat-list-inner .chat-list-item").each(function( index ) {
			if(sfv=='courseid'){
				if($(this).attr('data-cids').indexOf(gsearch)>=0){
					$(this).removeClass('hide');
				}else{
					$(this).addClass('hide');
				}
			}else{
				if($(this).attr('data-search').indexOf(gsearch)>=0){
					$(this).removeClass('hide');
				}else{
					$(this).addClass('hide');
				}
			}
		});
	})
   $('#message_write').keypress(function (e) {
		 var key = e.which;
		 if(key == 13 && !e.shiftKey){  // the enter key code
			$('.chat-right-textarea input[type="button"]').trigger('click');
			 e.preventDefault();
			 $('#message_write').val('');
			$('#message_write').html('');
		}
});  
$('body').on('click','.chat-create a.copylink',function(){
	//copy join url
$("#copytext").val($('.chat-list-item.active').attr('data-url'));
	var dummy = $('<input>').val($('.chat-list-item.active').attr('data-url')).appendTo('body').select();
 document.execCommand('copy');
});
// exit from group 
$('body').on('click','.chat-create a.exitgroup',function(){
	var token = $('#token').val();//'2wiciu5rlc4ehwbc';
	var instanceId =$('#instanceId').val();
  var chatitem=$('.chat-list-item.active').attr('data-courseid');
  var groupId=$('.chat-list-item.active').attr('data-id');
  var url = "https://api.chat-api.com/instance"+instanceId+"/status?token="+token;
			$.get(url, function (data1) {
				participantChatId=data1.id;
				var url = "https://api.chat-api.com/instance"+instanceId+"/leaveGroup?token="+token+"&chatId="+groupId;
						$.get(url, function (data) {
							$.ajax({
								type: 'POST',
								url: 'ajax.php?page=removegroup&courseid='+groupId,
								dataType: 'json',
								contentType: false,
								cache: false,
								processData:false,
								beforeSend: function(){},
								success: function(response){}
							});
							$('body').find('.chat-list-item[data-courseid="'+chatitem+'"]').remove();
						})
			})
  });
// start check All
$('#checkall').on('click',function(){
		$('body').find('.courselist:not(.hide) .chat-list-item:not(.hide) input:checkbox').prop('checked',$(this).is(":checked"));
		$('body').find('.userlist:not(.hide) .chat-list-item:not(.hide) input:checkbox').prop('checked',$(this).is(":checked"));
		$('body').find('.categorylist:not(.hide) .chat-list-item:not(.hide) input:checkbox').prop('checked',$(this).is(":checked"));	
		if($(this).is(":checked")){
			$('.chat-right-list.active').addClass('hide');
		}else{			
			$('.chat-right-list.active').removeClass('hide');
		}
			$('.chat-right-area').removeClass('hide');
	})
$('.chat-checkbox [type="checkbox"]').click(function(){
	if($('.chat-checkbox input[type="checkbox"]:checked').length>0){
		$('.chat-right-list.active').addClass('hide');
		$('.chat-right-area').removeClass('hide');
	}else{			
		$('.chat-right-list.active').removeClass('hide');
		if($('body').find('.chat-list-item.active').length==0){
			$('.chat-right-area').addClass('hide');
		}
	}
})
// end check All
	$('body').on('mouseover','.chat-create .fa.fa-pencil',function(){
		$('#groupnameu').val($('body').find('.chat-list-item.active h4 span').html());
		$('#courseidform').val($('body').find('.chat-list-item.active').attr('data-courseid'));
	});
	$('#updategroupname form').submit(function(e){
		e.preventDefault();
		if($.trim($('#groupnameu').val())==''){
			$('#groupnameu').after('<p class="error" style="color:red;">please enter group name.</p>');
			return false;
		}else{
			url="ajax.php?updategroupname=1&gid="+$('#courseidform').val()+"&gname="+$('#groupnameu').val()+'&pageid='+$('#pageid').val();
			$.get(url, function (data) {
				$('#updategroupname form #submit').after('<div class="alert alert-success fade in succmsg"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Success!</strong> Group name updated successfully.</div>');
				$('body').find('.chat-list-item.active h4 span').html($('#groupnameu').val());
				$('.right-info .chat-create .namegroup .grouphtml span').html($('#groupnameu').val());
				setTimeout(function(){
					$('#updategroupname form').find('.succmsg').remove();
					setTimeout(function(){
						$('#updategroupname').modal('hide');
					},100);
				},1000);
			})
		}
		
	})
	$('.right-search-data').on('click','ul li.searchli',function(){
			//$('body').find('.chat-right-list.active').animate({ scrollTop: $('body').find('.chat-right-list.active')[0].scrollHeight }, "slow");
			$('body').find('.chat-right-list.active').animate({ scrollTop: $('body').find('.chat-right-list.active .chat-messagelist[data-time="'+$(this).attr('data-time')+'"]').position().top}, 'slow');
	})
	$('body').on('click','.addeduserlist button',function(){
		 $('.loaderdiv').show();
		var token = $('#token').val();
		var instanceId =$('#instanceId').val();
		$(this).closest('.listuser').remove();
		var url = "https://api.chat-api.com/instance"+instanceId+"/removeGroupParticipant?token="+token+'&participantChatId='+$(this).attr('data-id')+'&groupId='+$('#addusertogroup').find('#gwid').val();
		$.get(url, function (data1) {
			$('#addusertogroup #submitusernew').after('<div class="alert alert-success">User remove successfully.</div>');
			var stuarray=Array();
			$('body').find('#addusertogroup .listuser').each(function(){
				stuarray.push($(this).attr('data-pnum'));
			});
			$('body').find('.addnewusercourse[datawid="'+$('#addusertogroup').find('#gwid').val()+'"]').attr('data-users',stuarray.join(','));
		setTimeout(function(){
			 $('.loaderdiv').hide();
			$('#addusertogroup').modal('hide');
			$('#addusertogroup ').find('.alert').remove();
			$('#addusertogroup ').find('.error').remove();
		},3000);
		});
	});
$('body').on('click','.addnewusercourse',function(){
	$optionhtml="";
	$('head').find('#stylecssoption').html('sssssssssssssss');
	$('#addusertogroup .addeduserlist').html('');
	$('#addusertogroup').find('.cousename').html($(this).attr('data-coursename'));
	$('#addusertogroup').find('.groupname').html($(this).attr('data-groupname'));
	$('#addusertogroup').find('#gwid').val($(this).attr('datawid'));
	var userlistm=$('body').find('.chat-list-item[data-id="'+$(this).attr('datawid')+'"]').attr('data-users');
	if (typeof userlistm !== 'undefined' && userlistm !== false){
		selusers=userlistm.split(',');
		for(var i=0;i<selusers.length;i++){
			var selt=selusers[i];
			if(selusers[i]>0){
				//$('#addusertogroup #studentnew option[value="'+selt+'"]').hide();
				$optionhtml=$optionhtml+' #select2-studentnew-results [id$="'+selt+'"]{display:none;}';
				$('#addusertogroup .addeduserlist').append('<div class="listuser" data-pnum="'+selt+'">'+$('body').find('.chat-list-item[data-id="'+selt+'@c.us"] h4 span').html()+'('+selt+')<button type="button" class="" data-id="'+selusers[i]+'@c.us" class="" title="Remove user"><span aria-hidden="true">×</span></button></div>');
			}
		}
		$('head') .find('#stylecssoption').html($optionhtml);
	}
	$('#addusertogroup').find('#studentnew').trigger("change");
	$('#addusertogroup').modal({show: 'true',backdrop: 'static',keyboard: false});
}) 
$('#addusertogroup #searchstudent').keyup(function (e) {
		gsearch=$(this).val().toLowerCase();
		$('#addusertogroup select option').each(function( index ) {
			if($(this).attr('data-search').indexOf(gsearch)>=0){
				$(this).removeClass('hide');
			}else{
				$(this).addClass('hide');
			}
		});
	})
$('#addusertogroup #submitusernew').click(function(){
	$('#addusertogroup').find('.error').remove();
	if($.trim($('#addusertogroup #studentnew').val())==''){
			$('#addusertogroup #studentnew').after('<p class="error" style="color:red;">please select user.</p>');
			return false;
	}else{
		$('body').find('.loaderdiv').show();
		var token = $('#token').val();
		var instanceId =$('#instanceId').val();
		var groupId=$('#addusertogroup').find('#gwid').val();
		var userlistm=$('body').find('.chat-list-item[data-id="'+groupId+'"]').attr('data-users');
		var lnarray=Array();
		$('#addusertogroup #studentnew :selected').each(function( index ) {
			lnarray[index]=$(this).val();
			userlistm=userlistm.replace($(this).val(),'');
			//if(!userlistm.includes($(this).val())){
				var url = "https://api.chat-api.com/instance"+instanceId+"/addGroupParticipant?token="+token+'&participantChatId='+$(this).val()+'@c.us&groupId='+groupId;
				console.log(url);
				$.get(url, function (data1) {console.log(data1);
				});
			//}
		})
		$('#addusertogroup #submitusernew').after('<div class="alert alert-success">User added successfully.</div>');
		lvalr=userlistm.split(',');
		for(iu=0;iu<lvalr.length;iu++){
			lnarray.push(lvalr[iu]);
		}
		setTimeout(function(){
			$('body').find('.addnewusercourse[datawid="'+groupId+'"]').attr('data-users',lnarray.join(','));
			$('body').find('.chat-list-item[data-id="'+groupId+'"]').attr('data-users',lnarray.join(','));
			$('body').find('.loaderdiv').hide();
			$('#addusertogroup').find('.alert').remove();
			$('#addusertogroup #studentnew').val('');
			$('#addusertogroup').modal("toggle");
		},4000);
	}
})
  $('.right-search-icon').click(function(){  
	$('.right-search-data ul').html('');  
	$('#rightsidesearch').val('');  
      $(this).parent('.right-search').toggleClass('active'); 
   });
   var righttop=0;
    $('body').on('click','.chat-list .chat-list-inner .chat-list-item .chat-item-title',function(){
		var righttop=0;
		if($(this).closest('.listoflist').hasClass('courselist')){
			if($('.right-info .chat-create').hasClass('hide')){
				$('.right-info .chat-create').removeClass('hide');
			}
			$('.right-info .chat-create .namegroup .grouphtml span').html($(this).find('h4 span').html());
			$('.right-info .chat-create .namegroup .divgroup .textnamegroup').val($(this).find('h4 span').html());
			$('.right-info .chat-create .groupid').html('ID '+$(this).closest('.chat-list-item').attr('data-idnum'));
		
		}else{ 
			if(!$('.right-info .chat-create').hasClass('hide')){
				$('.right-info .chat-create').addClass('hide');
			}
		}
		$('body').find('input:checkbox').prop('checked',false);
		$('.chat-right-area').removeClass('hide');
	//	if(!$(this).closest('.chat-list-item').hasClass('active')){
			$('.chat-right-textarea').attr('datap',$(this).closest('.chat-list-item').attr('data-id'));
			$('.chat-list-item.active').removeClass('active');
			$(this).closest('.chat-list-item').addClass('active');
				$('.chat-right-list').removeClass('active');
				$('.chat-right-list').addClass('hide');
				if($(this).closest('.listoflist').hasClass('courselist')){
					$('body').find('.chat-right-list[datawid="'+$(this).closest('.chat-list-item').attr('data-id')+'"]').removeClass('hide');
					$('body').find('.chat-right-list[datawid="'+$(this).closest('.chat-list-item').attr('data-id')+'"]').addClass('active');
				}
				if($(this).closest('.chat-list-item').attr('data-userid')){
					$('body').find('.chat-right-list.user'+$(this).closest('.chat-list-item').attr('data-userid')).removeClass('hide');
					$('body').find('.chat-right-list.user'+$(this).closest('.chat-list-item').attr('data-userid')).addClass('active');
					if($('body').find('.chat-right-list.user'+$(this).closest('.chat-list-item').attr('data-userid')).html().length==0){
						$('body').find('.chat-right-list.user'+$(this).closest('.chat-list-item').attr('data-userid')).html('<div class="loader"></div>');
					}
				}
			
		//}
	setTimeout(function(){
		if($('body').find('.chat-right-list.active').length>0){
			//$('body').find('.chat-right-list.active').animate({ scrollTop: $('body').find('.chat-right-list.active')[0].scrollHeight }, "slow");
			setTimeout(function(){
				$('body').find('.chat-right-list.active').animate({ scrollTop: $('body').find('.chat-right-list.active')[0].scrollHeight }, "slow");
			},1500);
		}
	},1500);
	});
	 
  $('#submitaddnew').click(function(){
		$('#addnewgroup').find('.error').remove();
		$('#addnewgroup').find('.alert').remove();
		if($.trim($('#addnewgroup #groupname').val())==''){
			$('#addnewgroup #groupname').after('<p class="error" style="color:red;">please enter group name.</p>');
			return false;
		}else{/*else if($.trim($('#addnewgroup #student').val())==''){ 
			$('#addnewgroup #student').after('<p class="error" style="color:red;">please select users.</p>');
			return false;
		}*/
		$('.loaderdiv').show();
			$('#submitaddnew').attr('disabled','disabled');
			newurl=$('#ajaxurl').val();
			//data={'groupname':$.trim($('#addnewgroup #groupname').val()),'student':$('#usercheckbox').val(),'flag':'addnewrow','joinurl':$('#joinurl').val(),'course':$('#addnewgroup #course').val(),'id':$('#pageid').val()};
			/*data={'groupname':$.trim($('#addnewgroup #groupname').val()),'alluser':alluser,'flag':'addnewrowmulti','joinurl':$('#joinurl').val(),'id':$('#pageid').val(),'course':$('#addnewgroup #course').val()};
			var alluser=0;
			if($('#addnewgroup .usercheck').is(":checked")){
				alluser=1;
			}*/
			var selected = [];
			for (var option of document.getElementById('student').options){
				if (option.selected) {
					selected.push(option.value);
				}
			}
			data={'groupname':$.trim($('#addnewgroup #groupname').val()),'students':selected,'flag':'addnewrowmulti','joinurl':$('#joinurl').val(),'id':$('#pageid').val(),'course':$('#addnewgroup #course').val()};
			$.ajax({
				url:newurl,
				type: 'POST',
				data:data,
				success: function (data) {
					$('.loaderdiv').hide();
					$('#submitaddnew').removeAttr('disabled');
					var json=$.parseJSON(data);
					if(json.flag==1){
						$('body').find('#submitaddnew').after('<div class="alert alert-success">New group created successfully.</div>');
					}else{
						$('body').find('#submitaddnew').after('<div class="alert alert-danger">Somthing is wrong with api try again later.</div>');	
					}
					setTimeout(function(){
						window.onbeforeunload = null;
						window.location.reload(true); 
					},500);
				},
				error: function () {
				  // handle error case here
				}
			});
		}
	})
	$('.chat-categoty').click(function(){
		$('.chat-categoty').removeClass('active');
		$('.listoflist').addClass('hide');
		$('.listoflist.'+$(this).attr('data-link')).removeClass('hide');
		$(this).addClass('active');
	})
   $(document).click(function(){
       if($(event.target).parents(".right-search").length < 1 && !$(event.target).hasClass("right-search")){
           $('.right-search').removeClass('active');
       }
   });   
    
   $(document).on("click touchstart",function(event){    
      if ($(event.target).parents(".msg-info").length < 1 && !$(event.target).hasClass("msg-info"))
      {
        $('.msg-info').removeClass('active');
      }
      if ($(event.target).parents(".right-info").length < 1 && !$(event.target).hasClass("right-info"))
      {
        $('.right-info').removeClass('active');
      }
       if ($(event.target).parents(".chat-setting").length < 1 && !$(event.target).hasClass("chat-setting"))
      {
        $('.chat-setting').removeClass('active');
      } 
	   if (jQuery(event.target).parents(".chat-right-emoji").length < 1 && !jQuery(event.target).hasClass("chat-right-emoji")) 
      {
        jQuery('.chat-right-emoji').removeClass('active');
        jQuery('.emoji-popup').removeClass('open'); 
      }  
   });    
      $('.emoji-popup ul li').click(function(){
	  $('.chat-right-textarea textarea').val($('.chat-right-textarea textarea').val()+$(this).attr('data-val'));
  })
  $('.chat-right-emoji').click(function(){
      $(this).addClass('active');
      $('.emoji-popup').addClass('open');   
   });   
  $(document).on('click', function (event) {
      if($(event.target).closest(".tooltip").length < 1){
        $('body').find('[data-toggle="tooltip"]').not(event.target).tooltip('hide');
      }
  });
  var ordernumber=999;
  setInterval(function(){
	  if($('#ajaxloadmore').val()==0){
		$('#ajaxloadmore').val(1);
	  newurl=$('#ajaxurl').val();
	  if($('.userlist.listoflist').hasClass('notfull')){
	  var existid=new Array;
			$('body').find(".userlist .orderdiv .chat-list-item").each(function( index ) {
				existid[index]=$(this).attr('data-userid');
			})
			data={'action':'loadstudentsmore','existid':existid};
			$.ajax({
				url:newurl,
				type: 'POST',
				data:data,
				success: function (data) {
					$('#ajaxloadmore').val(0);
					var result=JSON.parse(data);
					$('.userlist.listoflist').removeClass('notfull');
					if(result.countstd>0){
						$('.userlist.listoflist').addClass('notfull');
						$('body').find('.userlist.listoflist .orderdiv').append(result.stdhtml);
						$('body').find('.chat-rightmain').append(result.righthtml);
					}else{	
						var $tooltip = $('body').find('[data-toggle="tooltip"]');
						 $tooltip.tooltip({
						   html: true,
						   container: '.chat-left',     
						   trigger: 'manual',
						   placement: 'right',
						   delay: { "show": 100, "hide": 100 }
						 }).click(function (event) {});
						 $tooltip.on('click', function () {});							 
						  $(document).on('click','[data-toggle="tooltip"]', function (event) {
							  $('body').find('[data-toggle="tooltip"]').not(event.target).tooltip('hide');
							  $('body').find('#'+event.target.id).tooltip('show');
						  });
					}
				},
				error: function () {
				  // handle error case here
				}
			});
	  }
	  if($('.courselist.listoflist').hasClass('notfull')){
	  var existid=new Array;
			$('body').find(".courselist .orderdiv .chat-list-item").each(function( index ) {
				existid[index]='"'+$(this).attr('data-id')+'"';
			})
			data={'action':'loadcoursesmore','existid':existid,'id':$('#pageid').val()};
			$.ajax({
				url:newurl,
				type: 'POST',
				data:data,
				success: function (data) {
					$('#ajaxloadmore').val(0);
					var result=JSON.parse(data);
					if(result.countc>0){
						$('body').find('.courselist.listoflist .orderdiv').append(result.coursehtml);
						$('body').find('.chat-rightmain').append(result.righthtml);
					}else{
						$('.courselist.listoflist').removeClass('notfull');	
						var $tooltip = $('body').find('[data-toggle="tooltip"]');
						 $tooltip.tooltip({
						   html: true,
						   container: '.chat-left',     
						   trigger: 'manual',
						   placement: 'right',
						   delay: { "show": 100, "hide": 100 }
						 }).click(function (event) {});
						 $tooltip.on('click', function () {});							 
						  $(document).on('click','[data-toggle="tooltip"]', function (event) {
							  $('body').find('[data-toggle="tooltip"]').not(event.target).tooltip('hide');
							  $('body').find('#'+event.target.id).tooltip('show');
						  });
					}
						gsearch=$('.chat-left-search .search').val().toLowerCase();
					sfv=$('.studentsearch.form-control').val();
					$(".chat-list-inner .chat-list-item").each(function( index ) {
						if(sfv=='courseid'){
							if($(this).attr('data-cids').indexOf(gsearch)>=0){
								$(this).removeClass('hide');
							}else{
								$(this).addClass('hide');
							}
						}else{
							if($(this).attr('data-search').indexOf(gsearch)>=0){
								$(this).removeClass('hide');
							}else{
								$(this).addClass('hide');
							}
						}
					});
				},
				error: function () {
				  // handle error case here
				}
			});
	  }
	  if($('.categorylist.listoflist').hasClass('notfull')){
			data={'action':'loadcatmore','id':$('#pageid').val()};
			$.ajax({
				url:newurl,
				type: 'POST',
				data:data,
				success: function (data){
					$('#ajaxloadmore').val(0);
					$('body').find('.categorylist.listoflist .orderdiv').append(data);
					$('body').find('.categorylist.listoflist').removeClass('notfull');
				},
				error: function () {
				  // handle error case here
				}
			});
	  }
	  }
  },500);
    setInterval(function(){
	if($('#ajaxloadmessage').val()==0){
		$('#ajaxloadmessage').val(1);
		var token = $('#token').val();//'2wiciu5rlc4ehwbc';
		var instanceId =$('#instanceId').val();
	/*	$('.userlist .chat-list-item').each(function(){
			var dataid=$(this).attr('data-id');
		//	console.log(dataid);
			var url = "https://api.chat-api.com/instance"+instanceId+"/userStatus?token="+token+'&chatId='+$(this).attr('data-id');
			$.get(url, function (data) {
				if(data['status']=="available"){
					$('body').find('.chat-list-item[data-id="'+dataid+'"] .user-online.hide').removeClass('hide');
				}else{
					if(!$('body').find('.chat-list-item[data-id="'+dataid+'"] .user-online.hide').hasClass('hide')){
						$('body').find('.chat-list-item[data-id="'+dataid+'"] .user-online.hide').addClass('hide');
					}
				}
			});
		})*/ 
		var url = "https://api.chat-api.com/instance"+instanceId+"/status?token="+token;
		if(!$('body section.main').hasClass('authenticated')){
			$.get(url, function (data) {
				$('#ajaxloadmessage').val(0);
				if(data.accountStatus=='authenticated'){
					$('.loaderdiv').show();
					$('body section.main').addClass('authenticated');
					window.onbeforeunload = null;
					//window.location.href=window.location.href;
					window.location.reload(true);
					return false;
				}else{
					$('loaderdiv').show();
					document.getElementById('iframeqrcode').src += '';
				}
			})
		}
		var ordring=new Array();
		mintime=$('body').find('#min_time_course').val();
		if(isNaN(mintime)){
			mintime=0;
		}
		$lastid="0";
		myarray= new Array();
		var url = "https://api.chat-api.com/instance"+instanceId+"/messagesHistory?count=30&min_time="+(parseInt(mintime)+1)+"&token="+token;
		if($('body').find('#min_time_course').val()){
			$.get(url, function (data) { // Make a GET request
				$('#ajaxloadmessage').val(0);
				if(typeof data.messages.length !== "undefined"){
					for (var i = 0; i < data.messages.length; i++) { // For each message
						var message = data.messages[i];
						if(i==0){
							$('body').find('#min_time_course').val(message.time);
						}
						if(!$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').attr('time-msg-val')){
							$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').attr('time-msg-val',1);
						}
						if(message.chatId && ($('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').attr('time-msg-val')<message.time) && (!$('body').find('.chat-list-item[data-id="'+message.chatId+'"]').hasClass('mutenotification'))){
							if($('body').find('.chat-list-item[data-id="'+message.chatId+'"]').hasClass('numberor')){
								if(!(message.fromMe)){
									$uiy=parseInt($('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').attr('data-val'))+parseInt(1);
									$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').html($uiy);
									$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').attr('data-val',$uiy);
									$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').attr('time-msg-val',message.time);
								}
								$('body').find('.chat-list-item[data-id="'+message.chatId+'"]').css('order',ordernumber--);
								ordernumber=ordernumber--;
							}else{
								if(!(message.fromMe)){
								$('body').find('.chat-list-item[data-id="'+message.chatId+'"]').addClass('numberor');
								$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').attr('time-msg-val',message.time);
								$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').removeClass('hide');
								$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').html('1');
								$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-unread').attr('data-val',1);
								}
								$('body').find('.chat-list-item[data-id="'+message.chatId+'"]').css('order',ordernumber--);
								ordernumber=ordernumber--;
							}
							docfiles=new Array('doc','docx','htm','html','odt','pdf','xls','xlsx','ods','ppt','pptx','txt','csv','xml','md');
							imgExts = new Array("gif", "jpg", "jpeg", "png", "tiff", "tif");
							videotype=new Array("mp4");
							mp3file=new Array('oga','mp3','ogg');
							
							last_text=message.body;
							var rest = last_text.substring(0, last_text.lastIndexOf(".") + 1);
							var last = (last_text.substring(last_text.lastIndexOf(".") + 1, last_text.length));
							if(imgExts.indexOf(last.toLowerCase()) != -1){
							last_text="📷 Photo";
							}else if(docfiles.indexOf(last.toLowerCase()) != -1){
							last_text="📃 Document";
							}else if(videotype.indexOf(last.toLowerCase()) != -1){
							last_text="📹 Video";
							}else if(mp3file.indexOf(last.toLowerCase()) != -1){
							last_text="▶️ Audio";
							}
							if(last_text){$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-item-title').removeClass('no-data-bottom');}
							$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-last-msg-text').html(last_text);
							if($('body').find('.chat-list-item[data-id="'+message.chatId+'"]').hasClass('active')){
								console.log((i+'=='+data.messages.length-1));
								if(i==data.messages.length-1){
								$('body').find('.chat-right-list.active').animate({ scrollTop: $('body').find('.chat-right-list.active')[0].scrollHeight }, "slow");
								}
							}
						}
	
					}
				}
			});
		}
		chatId=$('body').find('.chat-footer .chat-right-textarea').attr('datap');
		if(chatId){
			var lastdate="";
			$('body').find('.chat-list-item[data-id="'+chatId+'"]').removeClass('numberor');
			datalasttime=parseInt($('body').find('.chat-right-list.active .chat-messagelist:last-child').attr('data-time'),10)+1;
			$('body').find('.chat-list-item[data-id="'+chatId+'"] .chat-unread').html('');
			$('body').find('.chat-list-item[data-id="'+chatId+'"] .chat-unread').addClass('hide');
			if(isNaN(datalasttime)){
				datalasttime=0;
			}
			if($('body').find('.chat-right-list.active').html()=='<div class="loader"></div>'){
			$('body').find('.chat-right-list.active').html('<p></p>');	
			}
			var url = "https://api.chat-api.com/instance"+instanceId+"/messagesHistory?token="+token+"&min_time="+datalasttime+"&count=1&chatId="+chatId;
			ordringkey=new Array();
			$.get(url, function (data) {
				$('#ajaxloadmessage').val(0);
				for(var i = 0; i < data.messages.length; i++){ // For each message
					var message = data.messages[i];
			if($('body').find('.chat-messagelist[data-time="'+message.time+'"]').length==0){
						last_text=message.body;
							var rest = last_text.substring(0, last_text.lastIndexOf(".") + 1);
							var last = (last_text.substring(last_text.lastIndexOf(".") + 1, last_text.length));
							if(imgExts.indexOf(last.toLowerCase()) != -1){
							last_text="📷 Photo";
							}else if(docfiles.indexOf(last.toLowerCase()) != -1){
							last_text="📃 Document";
							}else if(videotype.indexOf(last.toLowerCase()) != -1){
							last_text="📹 Video";
							}else if(mp3file.indexOf(last.toLowerCase()) != -1){
							last_text="▶️ Audio";
							}
							if(last_text){$('body').find('.chat-list-item[data-id="'+message.chatId+'"] .chat-item-title').removeClass('no-data-bottom');}
							$('body').find('.chat-list-item[data-id="'+chatId+'"]').find('.chat-last-msg-text').html(last_text);
							if($('body').find('.chat-list-item[data-id="'+chatId+'"]').hasClass('active')){
								if(i==data.messages.length-1){
							//	$('body').find('.chat-right-list.active').animate({ scrollTop: $('body').find('.chat-right-list.active')[0].scrollHeight }, "slow");
								}
							}
						if($('body').find('.chat-list-item[data-id="'+chatId+'"]').attr('data-courseid')>0){
							var url = "ajax.php?flag=update&pageid="+$('#pageid').val()+"&course_id="+$('body').find('.chat-list-item[data-id="'+chatId+'"]').attr('data-courseid')+"&time="+message.time+"&last_text="+last_text;
						}else if($('body').find('.chat-list-item[data-id="'+chatId+'"]').attr('data-userid')>0){
							var url = "ajax.php?flag=update&use_id="+$('body').find('.chat-list-item[data-id="'+chatId+'"]').attr('data-userid')+"&time="+message.time+"&last_text="+last_text;
						}else if($('body').find('.chat-list-item[data-id="'+chatId+'"]').attr('data-textid')>0){
							var url = "ajax.php?flag=updatenewcdids&pageid="+$('#pageid').val()+"&dtextid="+$('body').find('.chat-list-item[data-id="'+chatId+'"]').attr('data-textid')+"&time="+message.time+"&last_text="+last_text;
						}
						if(i==data.messages.length-1){
							if(url){
							if(url.length>4){
								$.get(url, function (data) {})
							}
						}						
						setTimeout(function(){
									$('body').find('.chat-right-list.active').animate({ scrollTop: $('body').find('.chat-right-list.active')[0].scrollHeight }, "slow");
							},500);
						}
					}
				}
			})
			nextdate='';
			var url = "https://api.chat-api.com/instance"+instanceId+"/messages?token="+token+"&min_time="+datalasttime+"&limit=30&chatId="+chatId;
			ordringkey=new Array();
			$.get(url, function (data) { // Make a GET request
			$('#ajaxloadmessage').val(0);
				for(var i = 0; i < data.messages.length; i++){ // For each message
					var message = data.messages[i];
					if(message.caption){
						var captiontxt=message.caption;
					}else{
						var captiontxt='';
					}
					if($('body').find('.chat-messagelist[data-time="'+message.time+'"]').length==0){
					if(message.fromMe){
						newstr=message.body.split(" ");
						bodystr="";
						for(var j=0; j<newstr.length;j++){
							var rest = newstr[j].substring(0, newstr[j].lastIndexOf(".") + 1);
							var last = (newstr[j].substring(newstr[j].lastIndexOf(".") + 1, newstr[j].length));
							if(imgExts.indexOf(last.toLowerCase()) != -1){
								bodystr=bodystr+" "+'<div class="chat-media"><img src="'+newstr[j]+'"><div class="caption">'+captiontxt+'</div></div>';
							}else if(docfiles.indexOf(last.toLowerCase()) != -1){
								bodystr=bodystr+" "+'<a href="'+newstr[j]+'" download="download"><img src="images/docs.png" style="max-height:80px;"></a>';
							}else if(videotype.indexOf(last.toLowerCase()) != -1){
								bodystr=bodystr+" "+'<div class="chat-media"><video autoplay muted loop controls><source src="'+newstr[j]+'" type="video/mp4"></video><div class="caption">'+captiontxt+'</div></div>';
							}else if(mp3file.indexOf(last.toLowerCase()) != -1){
								bodystr=bodystr+" "+'<audio controls><source src="'+newstr[j]+'" type="audio/mp3"></audio>';
							}else if((domainlisr.indexOf(last.toLowerCase()) != -1) && newstr[j].length>10){
									if(newstr[j].indexOf('http://') || newstr[j].indexOf('https://')){
										bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');
									}else{
										bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="http://'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');	
									}
							}else{
								if(newstr[j].indexOf('http://') != -1 || newstr[j].indexOf('https://') != -1){
									bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');
								}else{
									bodystr=bodystr+" "+newstr[j];
								}
							}
						}
						$mssagert="";
						nextdate=secondstoyymmdd(message.time);
						if((!(lastdate===nextdate))){
							if($('body').find('.chat-right-list.active .chatdata .today').length>0){
								//$mssagert="<div class='chatdata text-center'><span>"+lastdate+"</span></div>";
						//		$('body').find('.chat-right-list.active .chatdata .today').remove();
						//		$('body').find('.chat-right-list.active .chatdata .yesterday').remove();
							}else{
								$mssagert="<div class='chatdata text-center'>"+secondstoyymmddspan(message.time)+"</div>";
							}
							lastdate=secondstoyymmdd(message.time);
							lastdatesec=message.time;
						}
						//$('body').find('.chat-right-list.active').append('<li class="formme" data-time="'+message.time+'"><span>'+bodystr+'</span><h6>me</h6></li>');
						$mssagert=$mssagert+'<div class="chat-message-out chat-messagelist" data-time="'+message.time+'"><div class="chat-message-inner text"><span class="chat-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg></span><div class="user-message"><div class="user-message-inner"><div class="user-text"><div class="user-text-inner"><span><pre>'+bodystr+'</pre></span></div></div><div class="user-time">'+getTime(message.time)+'</div><div class="msg-info" msg-id="'+message.id+'"><i class="fa fa-angle-down" aria-hidden="true"></i><div class="chat-create"><ul><li><a href="javascript:void(0);" class="forward">Forwaed massage</a></li><li><a href="javascript:void(0);" class="deletemsg">Delete Massage</a></li></ul></div></div></div></div></div></div>';
						/*var d = new Date(); <li><a href="#">Replay</a></li><li><a href="#">Forwaed massage</a></li>
						  var n= d.getDate();
						  var m= d.getMonth()+1;
						  var y= d.getFullYear();
						if(date('Y-m-d',$v1array['time'])==y+"-"+m+"-"+n){
												echo '';
							}else{
												echo '<div class="user-time">'.date('d/m/Y',$v1array['time']).'</div>';
						}*/
			//			console.log('m-if='+$mssagert);
						$('body').find('.chat-right-list.active').find('.loader').hide();
						$('body').find('.chat-right-list.active').append($mssagert);
					}else{
						newstr=message.body.split(" ");
						bodystr="";
						for(var j=0; j<newstr.length;j++){
							var rest = newstr[j].substring(0, newstr[j].lastIndexOf(".") + 1);
							var last = newstr[j].substring(newstr[j].lastIndexOf(".") + 1, newstr[j].length);
							if(imgExts.indexOf(last) != -1){
								bodystr=bodystr+" "+'<div class="chat-media"><img src="'+newstr[j]+'"><div class="caption">'+captiontxt+'</div></div>';
							}else if(docfiles.indexOf(last) != -1){
								bodystr=bodystr+" "+'<a href="'+newstr[j]+'" download="download"><img src="images/docs.png" style="max-height:80px;"></a>';
							}else if(videotype.indexOf(last) != -1){
								bodystr=bodystr+" "+'<div class="chat-media"><video autoplay muted loop controls><source src="'+newstr[j]+'" type="video/mp4"></video><div class="caption">'+captiontxt+'</div></div>';
							}else if(mp3file.indexOf(last) != -1){
								bodystr=bodystr+" "+'<audio controls><source src="'+newstr[j]+'" type="audio/mp3"></audio>';
							}else if(domainlisr.indexOf(last) != -1 && newstr[j].length>10){
									if(newstr[j].indexOf('http://') || newstr[j].indexOf('https://')){
										bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');
									}else{
										bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="http://'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');	
									}
							}else{
								if(newstr[j].indexOf('http://') != -1 || newstr[j].indexOf('https://') != -1){
									bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');
								}else{
									bodystr=bodystr+" "+newstr[j];
								}
							}
						}
						$mssagert="";
						message.author=message.author.replace('@c.us','');
						nextdate=secondstoyymmdd(message.time);
						if(!(lastdate===nextdate)){
							lastdate=secondstoyymmdd(message.time);
							if($('body').find('.chat-right-list.active .chatdata .today').length>0){
								//$mssagert="<div class='chatdata text-center'><span>"+lastdate+"</span></div>";
							}else{
								$mssagert="<div class='chatdata text-center'>"+secondstoyymmddspan(message.time)+"</div>";
							}
						}
						$mssagert=$mssagert+'<div class="chat-message-in chat-messagelist" data-time="'+message.time+'"><div class="chat-message-inner text" data-time="'+message.time+'"><span class="chat-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span><div class="user-message"><div class="user-message-inner"><div class="use-name-no">'+message.senderName+'<span>'+message.author+'</span></div><div class="user-text"><div class="user-text-inner"><span><pre>'+bodystr+'</pre></span></div></div><div class="user-time">'+getTime(message.time)+'</div><div class="msg-info" msg-id="'+message.id+'"><i class="fa fa-angle-down" aria-hidden="true"></i><div class="chat-create"><ul><li><a href="javascript:void(0);" class="forward">Forwaed massage</a></li><li><a href="javascript:void(0);" class="deletemsg">Delete Massage</a></li></ul></div></div></div></div></div></div>';
				//		console.log('m-if='+$mssagert);
						$('body').find('.chat-right-list.active').find('.loader').hide();
						$('body').find('.chat-right-list.active').append($mssagert);
						//console.log($mssagert);
						
						//<li><a href="#">Replay</a></li>
					}
					}
				}
			});
		}
	}
	},500);
	$('body').on('click','a.close_img',function(e){
		e.preventDefault();
		$(this).closest('li').remove();
	});
	$('#logout,#gotologout').click(function(e){
		$('.loaderdiv').show();
		var token = $('#token').val();//'2wiciu5rlc4ehwbc';
		var instanceId =$('#instanceId').val();
		url='https://api.chat-api.com/instance'+instanceId+'/logout?token='+token;
		$.get(url, function (data) {
			window.onbeforeunload = null;
			window.location.href=window.location.href;
		});
	});
	$('body').on('click','a.forward',function(){
		$(this).addClass('graybg');
		$('.chat-left-search').addClass('graybg');
		$('.chat-list').addClass('graybg');
		$('#forwardid').val($(this).closest('.msg-info').attr('msg-id'));
		$('#btnforward').removeClass('hide');
		$('#cenforward').removeClass('hide');
		$('body').find('span.forward_text').removeClass('hide');
	});
	$('#cenforward').click(function(){
		$('#btnforward').addClass('hide');
		$('#cenforward').addClass('hide');
		$('body').find('span.forward_text').addClass('hide');
		$('body').find('a.graybg').removeClass('graybg');
		$('.chat-left-search').removeClass('graybg');
		$('.chat-list').removeClass('graybg');
	});
	$('#btnforward').click(function(){
		$('body').find('a.graybg').removeClass('graybg');
		$('.chat-left-search').removeClass('graybg');
		$('.chat-list').removeClass('graybg');
		$('#cenforward').after('<div class="alert alert-success">Message forwarded successfully.</div>');
		setTimeout(function(){
			$('body').find(":checkbox").attr("checked", false);
			$('body').find(".chat-right-list.active.hide").removeClass('hide');
			$('.chat-left-search').find('.alert.alert-success').remove();
		},600)
		if($('.listoflist.'+$('.chat-categoty.active').attr('data-link')).find('[type="checkbox"]:checked').length>0){
				var listofchatapi="0";
				var messageId=$('#forwardid').val();
				$('.listoflist.'+$('.chat-categoty.active').attr('data-link')).find('[type="checkbox"]:checked').each(function( index ) {
					if($(this).is(":checked") && messageId){
						var token = $('#token').val();//'2wiciu5rlc4ehwbc';
						var instanceId =$('#instanceId').val();
						var url = "https://api.chat-api.com/instance"+instanceId+"/forwardMessage?token="+token+"&chatId="+$(this).val()+"&messageId="+messageId;
						$.get(url, function (data){});
					}
				});
			$('#btnforward').addClass('hide');
			$('#cenforward').addClass('hide');
			$('body').find('span.forward_text').addClass('hide');
		}
	})
	$('body').on('click','a.send',function(e){
		e.preventDefault();
		duration=0;
		blob=$(this).attr('blob');
		url=$(this).attr('href');
		var listofchatapi="0";
		  if($('.listoflist.'+$('.chat-categoty.active').attr('data-link')).find('[type="checkbox"]:checked').length>0){
				$('.listoflist.'+$('.chat-categoty.active').attr('data-link')).find('[type="checkbox"]:checked').each(function( index ) {
					if($(this).is(":checked")){
						listofchatapi=listofchatapi+","+$(this).val();
					}
				});
			}else{
				listofchatapi=$('.chat-right-textarea').attr('datap');
			}
		var newurl='fileupload.php?id='+$('#pageid').val()+'&fileurlin=1&duration='+duration+'&sendphones='+listofchatapi+'&url='+url
		if(parseInt($(this).attr('counter'))>0){
			$(this).closest('li').addClass('audiosend');
			$(this).closest('li').html('<div class="alert alert-success">Audio send successfully.</div>')
			$.ajax({
				url:newurl,
				type: 'POST',
				data: fileArray[parseInt($(this).attr('counter'))],
				processData: false,
				contentType: false,
				success: function (data) {
			//		console.log(data);
					setTimeout(function(){
						$('body').find('li.audiosend').remove();
					},500);
				},
				error: function () {
				  // handle error case here
				}
			});
		}
	})
	document.addEventListener('scroll', function (event) {
		if($('body').find('.chat-right-list.active').scrollTop()>10){
			righttop++;
		}
		if(righttop>0 && $('body').find('.chat-right-list.active').scrollTop()==0){
			chatId=$('body').find('.chat-footer .chat-right-textarea').attr('datap');
		if(chatId){
			var token = $('#token').val();//'2wiciu5rlc4ehwbc';
			var instanceId =$('#instanceId').val();
			console.log(' fire trigger ');
			var lastdate="";
			datalasttime=parseInt($('body').find('.chat-right-list.active .chat-messagelist').first().attr('data-time'),10)-1;
			if(isNaN(datalasttime)){
				datalasttime=0;
			}
			var url = "https://api.chat-api.com/instance"+instanceId+"/messagesHistory?token="+token+"&max_time="+datalasttime+"&count=30&chatId="+chatId;
			ordringkey=new Array();
			$.get(url, function (data) { // Make a GET request
				for(var i = 0; i < data.messages.length; i++){ // For each message
					var message = data.messages[i];
					if(message.caption){
						var captiontxt=message.caption;
					}else{
						var captiontxt='';
					}
					if($('body').find('.chat-messagelist[data-time="'+message.time+'"]').length==0){
					if(message.fromMe){
						newstr=message.body.split(" ");
						bodystr="";
						for(var j=0; j<newstr.length;j++){
							var rest = newstr[j].substring(0, newstr[j].lastIndexOf(".") + 1);
							var last = (newstr[j].substring(newstr[j].lastIndexOf(".") + 1, newstr[j].length));
							if(imgExts.indexOf(last.toLowerCase()) != -1){
								bodystr=bodystr+" "+'<div class="chat-media"><img src="'+newstr[j]+'"><div class="caption">'+captiontxt+'</div></div>';
							}else if(docfiles.indexOf(last.toLowerCase()) != -1){
								bodystr=bodystr+" "+'<a href="'+newstr[j]+'" download="download"><img src="images/docs.png" style="max-height:80px;"></a>';
							}else if(videotype.indexOf(last.toLowerCase()) != -1){
								bodystr=bodystr+" "+'<div class="chat-media"><video autoplay muted loop controls><source src="'+newstr[j]+'" type="video/mp4"></video><div class="caption">'+captiontxt+'</div></div>';
							}else if(mp3file.indexOf(last.toLowerCase()) != -1){
								bodystr=bodystr+" "+'<audio controls><source src="'+newstr[j]+'" type="audio/mp3"></audio>';
							}else if((domainlisr.indexOf(last.toLowerCase()) != -1) && newstr[j].length>10){
									if(newstr[j].indexOf('http://') || newstr[j].indexOf('https://')){
										bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');
									}else{
										bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="http://'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');	
									}
							}else{
								bodystr=bodystr+" "+newstr[j];
							}
						}
						$mssagert="";
						nextdate=secondstoyymmdd(message.time);
						if(lastdate==''){
							lastdate=secondstoyymmdd(message.time);
							lastdatesec=message.time;
						}
						if((!(lastdate===nextdate))){
							if($('body').find('.chat-right-list.active .chatdata .today').length>0 || $('body').find('.chat-right-list.active .chatdata .yesterday').length>0){
								//$mssagert="<div class='chatdata text-center'><span>"+lastdate+"</span></div>";
						//		$('body').find('.chat-right-list.active .chatdata .today').remove();
						//		$('body').find('.chat-right-list.active .chatdata .yesterday').remove();
							}
							$mssagert="<div class='chatdata text-center'>"+secondstoyymmddspan(lastdatesec)+"</div>";
							lastdate=secondstoyymmdd(message.time);
							lastdatesec=message.time;
						}
						$pre="";
						if(i==(data.messages.length-1)){
							if($('body').find('.chat-right-list.active .chatdata .today').length>0 || $('body').find('.chat-right-list.active .chatdata .yesterday').length>0){
								//$mssagert="<div class='chatdata text-center'><span>"+lastdate+"</span></div>";
					//			$('body').find('.chat-right-list.active .chatdata .today').remove();
					//			$('body').find('.chat-right-list.active .chatdata .yesterday').remove();
							}
							$pre="<div class='chatdata text-center'>"+secondstoyymmddspan(lastdatesec)+"</div>";
							lastdate=secondstoyymmdd(message.time);
							lastdatesec=message.time;
							$mssagert="";
						}
						$mssagert=$pre+'<div class="chat-message-out chat-messagelist" data-time="'+message.time+'"><div class="chat-message-inner text"><span class="chat-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg></span><div class="user-message"><div class="user-message-inner"><div class="user-text"><div class="user-text-inner"><span><pre>'+bodystr+'</pre></span></div></div><div class="user-time">'+getTime(message.time)+'</div><div class="msg-info" msg-id="'+message.id+'"><i class="fa fa-angle-down" aria-hidden="true"></i><div class="chat-create"><ul><li><a href="javascript:void(0);" class="forward">Forwaed massage</a></li><li><a href="javascript:void(0);" class="deletemsg">Delete Massage</a></li></ul></div></div></div></div></div></div>'+$mssagert;
						$('body').find('.chat-right-list.active').find('.loader').hide();
						$('body').find('.chat-right-list.active').prepend($mssagert);
					}else{
						newstr=message.body.split(" ");
						bodystr="";
						for(var j=0; j<newstr.length;j++){
					//		console.log('-ME-');
							console.log(newstr[j].indexOf('.')>-1);
							var rest = newstr[j].substring(0, newstr[j].lastIndexOf(".") + 1);
							var last = newstr[j].substring(newstr[j].lastIndexOf(".") + 1, newstr[j].length);
							if(imgExts.indexOf(last) != -1){
								bodystr=bodystr+" "+'<div class="chat-media"><img src="'+newstr[j]+'"><div class="caption">'+captiontxt+'</div></div>';
							}else if(docfiles.indexOf(last) != -1){
								bodystr=bodystr+" "+'<a href="'+newstr[j]+'" download="download"><img src="images/docs.png" style="max-height:80px;"></a>';
							}else if(videotype.indexOf(last) != -1){
								bodystr=bodystr+" "+'<div class="chat-media"><video autoplay muted loop controls><source src="'+newstr[j]+'" type="video/mp4"></video><div class="caption">'+captiontxt+'</div></div>';
							}else if(mp3file.indexOf(last) != -1){
								bodystr=bodystr+" "+'<audio controls><source src="'+newstr[j]+'" type="audio/mp3"></audio>';
							}else if(domainlisr.indexOf(last) != -1 && newstr[j].length>10){
									if(newstr[j].indexOf('http://') || newstr[j].indexOf('https://')){
										bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');
									}else{
										bodystr=bodystr+" "+newstr[j].replace(newstr[j],'<a href="http://'+newstr[j]+'" target="_blank">'+newstr[j]+'</a>');	
									}
							}else{
								bodystr=bodystr+" "+newstr[j];
							}
						}
						$mssagert="";
						message.author=message.author.replace('@c.us','');
						nextdate=secondstoyymmdd(message.time);
						if(lastdate==''){
							lastdate=secondstoyymmdd(message.time);
							lastdatesec=message.time;
						}
						if(!(lastdate===nextdate)){
							lastdate=secondstoyymmdd(message.time);
						//	if($('body').find('.chat-right-list.active .chatdata .today').length>0 || $('body').find('.chat-right-list.active .chatdata .yesterday').length>0){
								//$mssagert="<div class='chatdata text-center'><span>"+lastdate+"</span></div>";
						//	}else{
								$mssagert="<div class='chatdata text-center'>"+secondstoyymmddspan(message.time)+"</div>";
						//	}
						}
						$pre="";
						if(i==(data.messages.length-1)){
							if($('body').find('.chat-right-list.active .chatdata .today').length>0){
							//	$('body').find('.chat-right-list.active .chatdata .today').remove();
							}
							if($('body').find('.chat-right-list.active .chatdata .yesterday').length>0){
							//	$('body').find('.chat-right-list.active .chatdata .yesterday').remove();
							}
							$pre="<div class='chatdata text-center'>"+secondstoyymmddspan(lastdatesec)+"</div>";
							lastdate=secondstoyymmdd(message.time);
							lastdatesec=message.time;
							$mssagert="";
						}
						$mssagert=$pre+'<div class="chat-message-in chat-messagelist" data-time="'+message.time+'"><div class="chat-message-inner text" data-time="'+message.time+'"><span class="chat-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span><div class="user-message"><div class="user-message-inner"><div class="use-name-no">'+message.senderName+'<span>'+message.author+'</span></div><div class="user-text"><div class="user-text-inner"><span><pre>'+bodystr+'</pre></span></div></div><div class="user-time">'+getTime(message.time)+'</div><div class="msg-info" msg-id="'+message.id+'"><i class="fa fa-angle-down" aria-hidden="true"></i><div class="chat-create"><ul><li><a href="javascript:void(0);" class="forward">Forwaed massage</a></li><li><a href="javascript:void(0);" class="deletemsg">Delete Massage</a></li></ul></div></div></div></div></div></div>'+$mssagert;
						$('body').find('.chat-right-list.active').find('.loader').hide();
						$('body').find('.chat-right-list.active').prepend($mssagert);
						//<li><a href="#">Replay</a></li>
					}
					}
				}
				if(data.messages.length>0){
					if(i==data.messages.length-1){
					setTimeout(function(){
						$('body').find('.chat-right-list.active').animate({ scrollTop: 250 }, "slow");
					},500);
					}
				}
			});
		}
		}
	}, true);
	'use strict'
let loglog = console.log.bind(console),
  id = val => document.getElementById(val),
  ul = id('ul'),
  gUMbtn = id('gUMbtn'),
  start = id('start'),
  stop = id('stop'),
  stream,
  recorder,
  counter=1,
  chunks,
  media;
gUMbtn.onclick = e => {
  let mv = id('mediaVideo'),
      mediaOptions = {
        audio: {
          tag: 'audio',
          type: 'audio/ogg',
          ext: '.ogg',
          gUM: {audio: true}
        }
      };
  media =mediaOptions.audio;
  navigator.mediaDevices.getUserMedia(media.gUM).then(_stream => {
    stream = _stream;
    id('gUMArea').style.display = 'none';
    id('btns').style.display = 'inherit';
    start.removeAttribute('disabled');
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
      chunks.push(e.data);
	  if(recorder.state == 'inactive')  makeLink();
    };
    start.disabled = true;
	stop.removeAttribute('disabled');
	stop.style.display='block';
	chunks=[];
	recorder.start();
  }).catch();
}
start.onclick = e => {
  start.disabled = true;
  stop.removeAttribute('disabled');
  chunks=[];
  recorder.start();
  stop.removeAttribute('disabled');
	stop.style.display='block';
	start.style.display='none';
}
stop.onclick = e => {
  stop.disabled = true;
  recorder.stop();
  start.removeAttribute('disabled');
  start.style.display='block';
  stop.style.display='none';
}
var fileArray=new Array();
	function makeLink(){
	  let blob = new Blob(chunks, {type: media.type })
		, url = URL.createObjectURL(blob)
	    , li = document.createElement('li')
	    , mt = document.createElement(media.tag)
	    , hf = document.createElement('a')
	    , hf1 = document.createElement('a')
	  ;
	  
	  mt.controls = true;
	  mt.src = url;
	  hf.href = url;
	  hf1.href = 'javascript:void(0);';
	  hf.download = `${counter++}${media.ext}`;
	  hf.setAttribute("class",'send');
	  hf.setAttribute("counter",counter);
	  hf1.setAttribute("class",'close_img');
	  hf.setAttribute("blob",blob);
	//  hf.innerHTML = `donwload ${hf.download}`;
	  hf.innerHTML = ``;
	  li.appendChild(mt);
	  li.appendChild(hf);
	  li.appendChild(hf1);
	  var fd = new FormData();
		fd.append('data', blob);
		fileArray[counter]=fd;
	  ul.appendChild(li);	
	}
	$('.selectpicker').select2();
	/*
    var multiSelect = new IconicMultiSelect({
      select: "#student",
      placeholder: "Select users",
      noData: "No user",
      noResults: "No user found"
    })
    multiSelect.init();
    multiSelect.subscribe(function(e) {
    });
	var multiSelect1 = new IconicMultiSelect({
      select: "#studentnew",
      placeholder: "Select users",
      noData: "No user",
      noResults: "No user found"
    })
    multiSelect1.init();
    multiSelect1.subscribe(function(e) {
    });*/
});
function getTime(seconds) {

    //a day contains 60 * 60 * 24 = 86400 seconds
    //an hour contains 60 * 60 = 3600 seconds
    //a minut contains 60 seconds
    //the amount of seconds we have left
    var leftover = seconds;

    //how many full days fits in the amount of leftover seconds
    var days = Math.floor(leftover / 86400);

    //how many seconds are left
    leftover = leftover - (days * 86400);

    //how many full hours fits in the amount of leftover seconds
    var hours = Math.floor(leftover / 3600);

    //how many seconds are left
    leftover = leftover - (hours * 3600);

    //how many minutes fits in the amount of leftover seconds
    var minutes = Math.floor(leftover / 60);

    //how many seconds are left
    leftover = leftover - (minutes * 60);
	if(hours<10){hours='0'+hours;}
	if(minutes<10){minutes='0'+minutes;}
    return( hours + ':' + minutes);
}
function secondstoyymmdd(timestamp){
	var date = new Date(timestamp * 1000);
	var date1 = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	if(month<10){month='0'+month;}
	if(day<10){day='0'+day;}
	return year+""+month+""+ day;
}
function secondstoyymmddspan(timestamp){
	var date = new Date(timestamp * 1000);
	var date1 = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	if(date1.getDate()==day && (month==(date1.getMonth()+1)) && (year==date1.getFullYear())){
		return '<span class="today">Today<span>';
	}else if(((date1.getDate()- day)==1) && (month==(date1.getMonth()+1)) && (year==date1.getFullYear())){
		return '<span class="yesterday">Yesterday</span>';
	}else if(((date1.getDate() - day)< 7) && (month==(date1.getMonth()+1)) && (year==date1.getFullYear())){
		weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		return '<span>'+weekday[date.getDay()]+'</span>';
	}
	if(month<10){month='0'+month;}
	if(day<10){day='0'+day;}
	return '<span>'+year + " - " + month + " - " + day+'</span>';
}
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('.file_nameview').find('img').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}