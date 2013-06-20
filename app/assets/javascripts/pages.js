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
							password: pass},
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
						    //alert("1aaaaaaaaaaa " + data.redirect);

							//if (data.valid)
							//{

								// Small timer to allow the 'cheking login' message to show when server is too fast
								var receiveTimer = new Date().getTime();
								if (receiveTimer-sendTimer < 500)
								{
									setTimeout(function()
									{
										//alert(data.redirect);
										document.location.href = "/pages/index_alt";
										
									}, 500-(receiveTimer-sendTimer));
								}
								else
								{
									document.location.href = "/pages/index_alt";
								}
							//}
							//else
							//{
								// Message
							//	$('#login-block').removeBlockMessages().blockMessage(data.error || 'An unexpected error occured, please try again', {type: 'error'});
								
							//	submitBt.enableBt();
							//}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown)
						{
							//							alert("Error");
							// Message
							$('#login-block').removeBlockMessages().blockMessage('Invalid username or password.', {type: 'error'});
							
							submitBt.enableBt();
						}
					});
					
					// Message
					$('#login-block').removeBlockMessages().blockMessage('Please wait, cheking login...', {type: 'loading'});
				}
			});
		});