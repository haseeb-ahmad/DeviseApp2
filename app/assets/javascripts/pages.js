$(document).ready(function()
{
	// We'll catch form submission to do it in AJAX, but this works also with JS disabled
	$('#login-form').submit(function(event)
	{
		// Stop full page load
		event.preventDefault();
		
		// Check fields
		var login = $('#username').val();
		var pass = $('#pass').val();

		$('.message .error').show();
		
		if (!login || login.length == 0)
		{
			$('#login-block').removeBlockMessages().blockMessage('Please enter your user name', {type: 'warning'});
		}
		else if (!pass || pass.length == 0)
		{
			$('#login-block').removeBlockMessages().blockMessage('Please enter your password', {type: 'warning'});
		}
		else
		{
			var submitBt = $(this).find('button[type=submit]');
			submitBt.disableBt();
			
			// Target url
			var target = $(this).attr('action');
			if (!target || target == '')
			{
				// Page url without hash
				target = document.location.href.match(/^([^#]+)/)[1];
			}
			
			// Request
			var data = {
					a: $('#a').val(),
					
					user: {login: login,
					password: pass,
					remember_me: $("#keep-logged").val()},
					'keep-logged': $('#keep-logged').attr('checked') ? 1 : 0
				},
				redirect = $('#redirect'),
				sendTimer = new Date().getTime();
			
			if (redirect.length > 0)
			{
				data.redirect = redirect.val();
			}
			
			//alert("AJAX");

			// Send
			$.ajax({
				url: target,
				dataType: 'html',
				type: 'POST',
				data: data,
				success: function(data, textStatus, XMLHttpRequest)
				{

					document.location.href = "/pages/index_alt";
				},
				error: function(XMLHttpRequest, textStatus, errorThrown)
				{
					$('#login-block').removeBlockMessages().blockMessage('Invalid username or password.', {type: 'error'});					
					submitBt.enableBt();
				}
			});
			
			// Message
			$('#login-block').removeBlockMessages().blockMessage('Please wait, cheking login...', {type: 'loading'});
		}
	});

	$("#keep-logged").click(function() {
			var value = $("#keep-logged").val()
			if (value == 0){
				$("#keep-logged").val(1)
			}
			else {
				$("#keep-logged").val(0)	
			}
	});

});