$(document).ready(function()
{
	$('#password-recovery').submit(function(event)
	{
		// Stop full page load
		event.preventDefault();
		
		// Check fields
		var email = $('#email').val();
		$('.message .error').show();

		if (validateEmail(email)) {
			$('#login-block').removeBlockMessages().blockMessage('Please wait, cheking email...', {type: 'loading'});
		}
		else {
			$('#login-block').removeBlockMessages().blockMessage('Email address is not valid.', {type: 'error'});
			return;
		}


		// Check if user is authentic
		$.ajax({
			url: '/users/validate_user',
			async: 'false',
			dataType: 'html',
			type: 'GET',
			data: {email: email},
			success: function (data) {

				//User Email is valid, Sending password reset instructions
				$.ajax({
					url: '/users/password/',
					async: 'false',
					dataType: 'html',
					type: 'POST',
					data: {
						user: {email: email}
					},
					success: function (data) {
						$('#login-block').removeBlockMessages().blockMessage('Please check your email for password reset.', {type: 'warning'});
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						$('#login-block').removeBlockMessages().blockMessage('Email address is not valid.', {type: 'error'});
					}
				});

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$('#login-block').removeBlockMessages().blockMessage('Email does not exists.', {type: 'error'});
			}
		});
	});

	function validateEmail(email) 
	{
	    var regex = /\S+@\S+\.\S+/;
	    return regex.test(email);
	}

});