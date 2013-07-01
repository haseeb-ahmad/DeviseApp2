$(document).ready(function()
{
	$('#password-reset-form').submit(function(event)
	{
		// Stop full page load
		event.preventDefault();
		
		// Check fields
		var password = $('#password').val();
		var confirm_password = $('#password_confirmation').val();
		var token = $('#token').val();
		$('.message .error').show();

		if (password.length == 0 || confirm_password.length == 0 || !password || !confirm_password) {
			$('#login-block').removeBlockMessages().blockMessage('Please fill all fields.', {type: 'error'});
		}
		else if (password != confirm_password) {
			$('#login-block').removeBlockMessages().blockMessage('Your password does not match.', {type: 'error'});
		}
		else if (password.length < 6) {
			$('#login-block').removeBlockMessages().blockMessage('Password is too short.', {type: 'error'});
		}
		else {

			$('#login-block').removeBlockMessages().blockMessage('Please wait, Reseting your password...', {type: 'loading'});

			// Get the Email of this user
			$.ajax({
				url: '/users/get_user/',
				async: 'false',
				dataType: 'html',
				type: 'GET',
				data: {token: token},
				success: function (data) {
					var email = data;

					// Got Email. Sending Change Password Request
					$.ajax({
						url: '/users/password/',
						async: 'false',
						dataType: 'html',
						type: 'PUT',
						data: {
							user: {
								reset_password_token: token,
								password: password,
								password_confirmation: confirm_password
							}
						},
						success: function (data) {

							//Password Reset Successfully
							data = {
									user: {username: email,
									password: password}
								}

							// Send Sign In Request after Reseting Password
							$.ajax({
								url: '../../users/sign_in',
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
									$('#login-block').removeBlockMessages().blockMessage('Please fill valid data in all fields.', {type: 'error'});
								}
							});
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							//$('#login-block').removeBlockMessages().blockMessage('Email address is not valid.', {type: 'error'});
						}
					});
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$('#login-block').removeBlockMessages().blockMessage('Your Token has been expired.', {type: 'error'});
				}
			});
		}
	});
});