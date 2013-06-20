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
				
				if (!login || login.length == 0)
				{
					$('#login-block').removeBlockMessages().blockMessage('Please enter your email.', {type: 'warning'});
				}
				else if (!pass || pass.length == 0)
				{
					$('#login-block').removeBlockMessages().blockMessage('Please enter your password.', {type: 'warning'});
				}
				else if (!user_name || user_name.length == 0)
				{
					$('#login-block').removeBlockMessages().blockMessage('Please enter your user name.', {type: 'warning'});
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
						url: '/users/checkname',
						async: 'false',
						dataType: 'html',
						type: 'GET',
						data: {email: login,
								username: user_name},

						success: function (data) {

							// alert("User does not exists");

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
									
									user: {
									username: user_name,
									email: login,
									password: pass,
									password_confirmation: confirm}
								},
								redirect = $('#redirect'),
								sendTimer = new Date().getTime();
							
							if (redirect.length > 0)
							{
								data.redirect = redirect.val();
							}


							// Send
							$.ajax({
								url: '/users',
								async: 'false',
								dataType: 'html',
								type: 'POST',
								data: data,
								success: function(data, textStatus, XMLHttpRequest)
								{
									// alert("Signed Up");

//----------------------------

// alert(login);
// alert(pass);
									data = {							
											user: {username: user_name,
											password: pass},
											'keep-logged': $('#keep-logged').attr('checked') ? 1 : 0
										},
										redirect = $('#redirect'),
										sendTimer = new Date().getTime();

									// Send
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
											// alert(textStatus);
											// alert(XMLHttpRequest.responseText);
											// alert(errorThrown);
											submitBt.enableBt();
										}
									});

//---------------------------------
								},
								error: function(XMLHttpRequest, textStatus, errorThrown)
								{
									// alert("does not signed Up Error");
									// alert(XMLHttpRequest.responseText);
									// alert(textStatus);
									$('#login-block').removeBlockMessages().blockMessage('Please fill all fields.', {type: 'error'});
									submitBt.enableBt();
								}
							}); 

						},
						error: function (data) {

							// alert("User is there Error");

							$('#login-block').removeBlockMessages().blockMessage('Username or Email already exists', {type: 'error'});
						}

					});
				}
			});
		});