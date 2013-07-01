$(document).ready(function()
{
	// We'll catch form submission to do it in AJAX, but this works also with JS disabled
	$('#sign-up-form').submit(function(event)
	{
		// Stop full page load
		event.preventDefault();
		
		// Check fields
		var user_name = $('#username').val();
		var login = $('#login').val();
		var pass = $('#pass').val();
		var confirm = $('#con-pass').val();

		$('.message .error').show();


		//Validating all fields
		if (!user_name || user_name.length == 0)
		{
			$('#login-block').removeBlockMessages().blockMessage('Please enter your user name.', {type: 'warning'});
		}
		else if (!login || login.length == 0)
		{
			$('#login-block').removeBlockMessages().blockMessage('Please enter your email.', {type: 'warning'});
		}
		else if (!pass || pass.length == 0)
		{
			$('#login-block').removeBlockMessages().blockMessage('Please enter your password.', {type: 'warning'});
		}
		else if (!pass || pass.length == 0)
		{
			$('#login-block').removeBlockMessages().blockMessage('Please confirm your password.', {type: 'warning'});
		}
		else if (pass != confirm)
		{
			$('#login-block').removeBlockMessages().blockMessage('Your password does not match.', {type: 'warning'});
		}
		else if (pass.length < 6)
		{
			$('#login-block').removeBlockMessages().blockMessage('Your password is too short.', {type: 'warning'});
		}
		else
		{
			// Message
			$('#login-block').removeBlockMessages().blockMessage('Please wait, Signing Up...', {type: 'loading'});

			// Check if username exists
			$.ajax({
				url: '/users/check_email_and_username',
				async: 'false',
				dataType: 'html',
				type: 'GET',
				data: {email: login,
						username: user_name},
				success: function (data) {

					// User does not exists
					var submitBt = $(this).find('button[type=submit]');
					submitBt.disableBt();
					
					// Target url
					var target = $(this).attr('action');
					if (!target || target == '')
					{
						// Page url without hash
						target = document.location.href.match(/^([^#]+)/)[1];
					}
					
					// Request Sign Up
					var data = {							
							user: {
							username: user_name,
							email: login,
							password: pass,
							password_confirmation: confirm}
						}					

					// Send Sign Up Parametres
					$.ajax({
						url: '/users',
						async: 'false',
						dataType: 'html',
						type: 'POST',
						data: data,
						success: function(data, textStatus, XMLHttpRequest)
						{
							//Signed Up Successfully
							data = {
									user: {username: user_name,
									password: pass}
								},

							// Send Sign In Request after Sign Up
							$.ajax({
								url: '../users/sign_in',
								async: 'false',
								dataType: 'html',
								type: 'POST',
								data: data,
								success: function(data, textStatus, XMLHttpRequest)
								{
									// alert("Signed In");
									document.location.href = "/pages/index_alt";
								},
								error: function(XMLHttpRequest, textStatus, errorThrown)
								{
									// alert("Does not Signed In Error");
									submitBt.enableBt();
									$('#login-block').removeBlockMessages().blockMessage('Please fill valid data in all fields.', {type: 'error'});
								}
							});
						},
						error: function(XMLHttpRequest, textStatus, errorThrown)
						{
							// alert("does not signed Up Error");
							$('#login-block').removeBlockMessages().blockMessage('Please fill all fields.', {type: 'error'});
							submitBt.enableBt();
						}
					}); 
				},
				error: function (data) {

					// User is there Error
					$('#login-block').removeBlockMessages().blockMessage('Username or Email already exists', {type: 'error'});
				}

			});
		}
	});
});