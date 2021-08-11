$(document).ready(function(){
	$("#studentnewtime").on('click', 'option', function() {
	console.log($("#studentnewtime option:selected").length > parseInt($("#studentnewtime").attr('data-mlen'),10));
	if(parseInt($("#studentnewtime").attr('data-mlen'),10)<0){
		 $(this).prop("selected", false);
	}
	if($("#studentnewtime option:selected").length > parseInt($("#studentnewtime").attr('data-mlen'),10)) {
       $(this).prop("selected", false);
    }
});
	$('.btn-user-delete').click(function(){
		$('#removeuser #removetimeuserid').val($(this).attr('data-id'));
	})
	$('a.yes-messageuser').click(function(){
		$(this).attr('disabled','disabled');
			$('.loaderdiv').show();
		data1={"newusertimedelete":"delete","users":$('#removeuser #removetimeuserid').val()};
					newurl1=$('#ajaxurl').val();
					$.ajax({
					url:newurl1,
					type: 'POST',
					data:data1,
					success: function () {}
					})
					$('body').find('#removeuser .delete-message-text').after('<div class="alert alert-success">User deleted successfully.</div>');
							$('.yesaddnewuser').removeAttr('disabled');
							setTimeout(function(){
									window.onbeforeunload = null;
									window.location.reload(true); 
							},1500);
	})
	$('.yesaddnewuser').click(function(e){
			$('.loaderdiv').show();
		$(this).attr('disabled','disabled');
		$('#addnewusertime').find('.error').remove();
		if($.trim($('#studentnewtime').val())==''){
			$('#studentnewtime').after('<p class="error" style="color:red;">please select user.</p>');
			return false;
		}else{
			console.log($('#studentnewtime').val());
			data1={"newusertime":"addnewuser","users":$.trim($('#studentnewtime').val())};
					newurl1=$('#ajaxurl').val();
					$.ajax({
					url:newurl1,
					type: 'POST',
					data:data1,
					success: function () {
						
					}
					})
					$('body').find('#addnewusertime .form-group').after('<div class="alert alert-success">User added successfully.</div>');
							$('.yesaddnewuser').removeAttr('disabled');
							setTimeout(function(){
									window.onbeforeunload = null;
									window.location.reload(true); 
							},1500);
		}
	});
	$('#whatsappkey').click(function(e){
		$('form').find('.error').remove();
		e.preventDefault();
		if($.trim($('#yourtoken').val())==''){
			$('#yourtoken').after('<p class="error" style="color:red;">please enter license key.</p>');
			return false;
		}else if($.trim($('#emailidadd').val())==''){
			$('#emailidadd').after('<p class="error" style="color:red;">please enter Emailid.</p>');
			return false;
		}else{
			$('.loaderdiv').show();
		$(this).attr('disabled','disabled');
				data1={'token':$.trim($('#yourtoken').val()),'updatekeygen':1,'id':$('#keyid').val(),'domain':$('#domaindetails').val(),'email':$.trim($('#emailidadd').val())};
					newurl1=$('#ajaxurl').val();
					$.ajax({
					url:newurl1,
					type: 'POST',
					data:data1,
					success: function (data) {
						data=$.parseJSON(data);
						if(data.flag=='success'){
							$('body').find('#whatsappkey').after('<div class="alert alert-success">Your account activation successfully.</div>');
							$('#whatsappkey').removeAttr('disabled');
							setTimeout(function(){
								$('body').find('.alert.alert-success').remove();
									window.onbeforeunload = null;
									window.location.reload(true); 
							},1500);
						}else{
							$('body').find('#whatsappkey').after('<div class="alert alert-danger">Token Not found.</div>');
							$('#whatsappkey').removeAttr('disabled');
							setTimeout(function(){
								$('body').find('.alert.alert-success').remove();
							},1500);
						}	
						},error: function () {}
				});
		}
	});
	$('.add_new_group').click(function(){
			$('body').find('.alert').remove();
		$(this).closest('.singlecourse').find('.error').remove();
		//e.preventDefault();
		if($.trim($(this).closest('.singlecourse').find('.shortname').val())==''){
			$(this).closest('.singlecourse').find('.shortname').after('<p class="error" style="color:red;">please enter group name.</p>');
			return false;
		}else{
			var disbtn=$(this);
			$('.loaderdiv').show();
			$(this).attr('disabled','disabled');
			newurl=$('#ajaxurl').val();
			var alluser=0;
			if($(this).closest('.singlecourse').find('.alluser').is(":checked")){
				alluser=1;
			}
			data={'groupname':$.trim($(this).closest('.singlecourse').find('.shortname').val()),'alluser':alluser,'flag':'addnewrowmulti','joinurl':$(this).closest('.singlecourse').find('.joinurl').val(),'id':$(this).closest('.singlecourse').find('.phonetwo').val(),'course':$(this).closest('.singlecourse').find('.course_id').val()};
			$.ajax({
				url:newurl,
				type: 'POST',
				data:data,
				success: function (data) {
					var json=$.parseJSON(data);
					if(json.flag==2 && json.message=='Invalid number'){
						disbtn.removeAttr('disabled');
						$('body').find('#menu2 h3').after('<div class="alert alert-danger">Some user phone number is not vaild .</div>');
						$("html, body").animate({ scrollTop: 0 }, "slow");
						$('.loaderdiv').hide();
					}else if(json.flag==1){
						$('body').find('#menu2 h3').after('<div class="alert alert-success">New group created successfully.</div>');
						$("html, body").animate({ scrollTop: 0 }, "slow");
						setTimeout(function(){
							window.onbeforeunload = null;
							window.location.reload(true); 
						},1000);
					}else{
						$('body').find('#menu2 h3').after('<div class="alert alert-danger">Somthing is wrong with api try again later.</div>');	
						$("html, body").animate({ scrollTop: 0 }, "slow");
						setTimeout(function(){
							window.onbeforeunload = null;
							window.location.reload(true); 
						},1000);
					}
				},
				error: function () {
				  // handle error case here
				}
			});
		}
	})
	$('.btn-delete').click(function(){
		$('.deletegroup .msgdel').html('Are you sure you want to delete '+$(this).attr('data-name')+'?');
		$('#deletegroup').addClass('in'); 
		$('#deletegroup').addClass('show'); 
		$('#deletegroupid').val($(this).attr('data-id'));
	})
	$('#deletegroup .no-message,#deletegroup .close').click(function(){
		$('#deletegroup').removeClass('in'); 
		$('#deletegroup').removeClass('show');
	})
	$('#deletegroup .yes-message').click(function(){
		$('#deletegroup').removeClass('in'); 
		$('#deletegroup').removeClass('show');
		$('.loaderdiv').show();
		newurl=$('#ajaxurl').val();
				data={'deletegroup':'1','id':$('#deletegroupid').val()};
				$.ajax({
					url:newurl,
					type: 'POST',
					data:data,
					success: function (data) {
						$('body').find('#menu2 h3').after('<div class="alert alert-success">Group Deleted successfully.</div>');
							setTimeout(function(){	
								window.onbeforeunload = null;
								window.location.reload(true);
							},1500);
					},
					error: function () {
					  // handle error case here
					}
				});
	});
	//	$('.loaderdiv').show();
	$('.unsubscribe').click(function(){
		$('#updatestatusid').val($(this).closest('tr').find('.keyid').val());
		$('#unsubscribepopup').addClass('in'); 
		$('#unsubscribepopup').addClass('show'); 
	})
	$('#unsubscribepopup .no-message,#unsubscribepopup  .close').click(function(){
		$('#unsubscribepopup').removeClass('in'); 
		$('#unsubscribepopup').removeClass('show');
	});
	$('#unsubscribepopup .yes-message').click(function(){
		$('.loaderdiv').show();
		newurl=$('#ajaxurl').val();
				data={'unsubupdatekey':'1','id':$('#updatestatusid').val()};
				$.ajax({
					url:newurl,
					type: 'POST',
					data:data,
					success: function (data) {
						$('#unsubscribepopup').removeClass('in'); 
						$('#unsubscribepopup').removeClass('show');
						$('body').find('#menu1 h3').after('<div class="alert alert-success">Your are unsubscribe successfully.</div>');
							setTimeout(function(){	
								window.onbeforeunload = null;
								window.location.reload(true);
							},500);
					},
					error: function () {
					  // handle error case here
					}
				});
	})
	$('.resubscribe').click(function(){
		$('.loaderdiv').show();
				newurl=$('#ajaxurl').val();
				data={'resubscribe':'1','id':$(this).closest('tr').find('.keyid').val()};
				$.ajax({
					url:newurl,
					type: 'POST',
					data:data,
					success: function (data) {
						$('.loaderdiv').hide();
							$('body').find('#menu1 h3').after('<div class="alert alert-success">You are resubscribe successfully.</div>');
							setTimeout(function(){	
								window.onbeforeunload = null;
								window.location.reload(true);
							},1500);
					},error: function () {
					  // handle error case here
					}
				});
	});
	$('.updatenameonly').click(function(){
		$(this).closest('tr').find('.error').remove();
		//e.preventDefault();
		if($.trim($(this).closest('tr').find('.name_c').val())==''){
			$(this).closest('tr').find('.name_c').after('<p class="error" style="color:red;">please enter Name.</p>');
			return false;
		}else{
			$('.loaderdiv').show();
				newurl=$('#ajaxurl').val();
				data={'name_c':$.trim($(this).closest('tr').find('.name_c').val()),'updatenameonly':'1','id':$(this).closest('tr').find('.keyid').val()};
				$.ajax({
					url:newurl,
					type: 'POST',
					data:data,
					success: function (data) {
						$('.loaderdiv').hide();
							$('body').find('#menu1 h3').after('<div class="alert alert-success">Account name updated successfully.</div>');
							setTimeout(function(){	
								$('body').find('.alert.alert-success').remove();
							},1500);
						},error: function () {
					  // handle error case here
					}
				});
		}
	})
	$('body').on('click','.updatekey',function(e){
		e.preventDefault();
		if($(this).closest('tr').find('.instanceid').length>0 && $(this).closest('tr').find('.token').length>0){
		$(this).closest('tr').find('.error').remove();
		//e.preventDefault();
		if($.trim($(this).closest('tr').find('.name_c').val())==''){
			$(this).closest('tr').find('.name_c').after('<p class="error" style="color:red;">please enter Name.</p>');
			return false;
		}else if($.trim($(this).closest('tr').find('.instanceid').val())==''){
			$(this).closest('tr').find('.instanceid').after('<p class="error" style="color:red;">please enter instanceid.</p>');
			return false;
		}else if($.trim($(this).closest('tr').find('.token').val())==''){
			$(this).closest('tr').find('.token').after('<p class="error" style="color:red;">please select users.</p>');
			return false;
		}else{
			$('.loaderdiv').show();
				newurl=$('#ajaxurl').val();
				data={'name_c':$.trim($(this).closest('tr').find('.name_c').val()),'instanceid':$.trim($(this).closest('tr').find('.instanceid').val()),'token':$.trim($(this).closest('tr').find('.token').val()),'updatekey':'1','id':$(this).closest('tr').find('.keyid').val()};
				$.ajax({
					url:newurl,
					type: 'POST',
					data:data,
					success: function (data) {
						var json=$.parseJSON(data);
						$('.loaderdiv').hide();
						if(json.flag==1){
							$('body').find('#menu1 h3').after('<div class="alert alert-danger">Instanceid and token not vaild.</div>');
						}else{
							$('body').find('#menu1 h3').after('<div class="alert alert-success">Instanceid and token updated successfully.</div>');
							setTimeout(function(){	
								window.onbeforeunload = null;
								window.location.reload(true);
							},1500);
						}
						setTimeout(function(){
							$('body').find('.alert.alert-success').remove();
							$('body').find('.alert.alert-danger').remove();
						},2000);
					},
					error: function () {
					  // handle error case here
					}
				});
		}
		}else{
			$(this).closest('tr').find('.error').remove();
			if($.trim($(this).closest('tr').find('.name_c').val())==''){
				$(this).closest('tr').find('.name_c').after('<p class="error" style="color:red;">please enter Name.</p>');
				return false;
			}else{
			$('.loaderdiv').show();
				newurl=$('#ajaxurl').val();
				data={'name_c':$.trim($(this).closest('tr').find('.name_c').val()),'updatekey':'1','id':$(this).closest('tr').find('.keyid').val()};
				$.ajax({
					url:newurl,
					type: 'POST',
					data:data,
					success: function (data) {
						var json=$.parseJSON(data);
						$('.loaderdiv').hide();
						if(json.flag==1){
							$('body').find('#menu1 h3').after('<div class="alert alert-danger">Instanceid and token not vaild.</div>');
						}else{
							$('body').find('#menu1 h3').after('<div class="alert alert-success">Instanceid and token updated successfully.</div>');
							setTimeout(function(){	
								$('body').find('#menu1').find('.alert').remove();
								},1500);
						}
						setTimeout(function(){
							$('body').find('.alert.alert-success').remove();
							$('body').find('.alert.alert-danger').remove();
						},2000);
					},
					error: function () {
					  // handle error case here
					}
				});
			}
		}
	})
	$('ul.nav.nav-tabs li').click(function(){
		$('ul.nav.nav-tabs li').removeClass('active');
		$(this).addClass('active');
	})
	$('#submitaddnew').click(function(e){
		e.preventDefault();
		$('#menu2').find('.error').remove();
		//e.preventDefault();
		if($.trim($('#groupname').val())==''){
			$('#groupname').after('<p class="error" style="color:red;">please enter group name.</p>');
			return false;
		}else if($.trim($('#student').val())==''){
			$('#student').after('<p class="error" style="color:red;">please select users.</p>');
			return false;
		}else{
			$('#submitaddnew').attr('disabled','disabled');
			newurl=$('#ajaxurl').val();
			data={'groupname':$.trim($('#groupname').val()),'student':$('#student').val(),'flag':'addnewrow','joinurl':$('#joinurl').val(),'course':$('#course').val(),'id':$('#phonekey').val()};
			$.ajax({
				url:newurl,
				type: 'POST',
				data:data,
				success: function (data) {
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
		$('#course').change(function(){
			$('#student option').removeAttr('selected');
			if($(this).val()){
				$('#student option.class-'+$(this).val()).attr('selected', true);
			}

		})
	$('.updatewidget').click(function(){
		$('#menu3').find('.alert').remove();
		$(this).closest('tr').find('.error').remove();
		if($.trim($(this).closest('tr').find('.widget_iid').val())==''){
			$(this).closest('tr').find('.widget_iid').after('<p style="color:red;" class="error">Fill Instance Id</p>');
		}else if($.trim($(this).closest('tr').find('.widget_tok').val())==''){
			$(this).closest('tr').find('.widget_tok').after('<p style="color:red;" class="error">Fill Token</p>');
		}else{
			$iid=$(this).closest('tr').find('.widget_iid').val();
			$token=$(this).closest('tr').find('.widget_tok').val();
			$idofkey=$(this).closest('tr').find('.idofkey').val();
			var url = "https://api.chat-api.com/instance"+$iid+"/me?token="+$token;
			$.get(url, function (data1){
			if(data1.id){
				data1={'updatekeywidget':1,'id':$idofkey,'instanceid':$iid,'token':$token};
				console.log(data1);
				newurl1=$('#ajaxurl').val();
				$.ajax({
					url:newurl1,
					type: 'POST',
					data:data1,
					success: function (data) {
						$('#menu3 h3').after('<div class="alert alert-success"">Instance id and token updated successfully</div>');
					}
				})
			}else{
				$('#menu3 h3').after('<div class="alert alert-danger"">Instance id and token not found</div>');
			}
			})
			
		}
	})
})