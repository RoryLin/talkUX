$(window).load(function () {
	"use strict";
	$('#status').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({
		'overflow': 'visible'
	});
});
$(function () {
	"use strict";

	/* ---------------------------------------------------------
	 * Scroll arrow
	 */

	$("#scroll").click(function () {
	 	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	 		var target = $(this.hash);
	 		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	 		if (target.length) {
	 			$('html,body').animate({
	 				scrollTop: target.offset().top
	 			}, 1200);
	 			return false;
	 		}
	 	}
	 });

	/* ---------------------------------------------------------
	 * Countdown
	 */

	// var description = {
	// 	weeks: "weeks",
	// 	days: "days",
	// 	hours: "hours",
	// 	minutes: "minutes",
	// 	seconds: "seconds"
	// };
	//
	// // year/month/day
	// $('#countdown').countdown('2017/10/20', function (event) {
	// 	$(this).html(event.strftime(
	// 		'<div class="countdown-section"><b>%w</b> <span>' + description.weeks + '</span> </div>' +
	// 		'<div class="countdown-section"><b>%d</b> <span>' + description.days + '</span> </div>' +
	// 		'<div class="countdown-section"><b>%H</b> <span>' + description.hours + '</span> </div>' +
	// 		'<div class="countdown-section"><b>%M</b> <span>' + description.minutes + '</span> </div>' +
	// 		'<div class="countdown-section"><b>%S</b> <span>' + description.seconds + '</span> </div>'
	// 	));
	// });

	/* -------------------------------------------------------
	 * Subscribe Form Validation
	 */
	$(document).ready(function() {
		$('#subscribe').submit(function() {
			console.log("here");
			if (!valid_email_address($("#subscribe_email").val())) {
				$(".message").html('The email address you entered was invalid. Please make sure you enter a valid email address to subscribe.');
			} else {
				$(".message").html("<span style='color:green;'>Adding your email address...</span>");
				$.ajax({
					url: 'php/subscribe.php', 
					data: $('#subscribe').serialize(),
					type: 'POST',
					success: function(msg) {
						console.log(JSON.stringify(msg));
						if(msg.response==true) {
							$("#email").val("");
							$(".message").html('<span style="color:green;">You have successfully subscribed to our mailing list.</span>');
						} else {
							if (msg.json.error_code==104) {
								$(".message").html("Uh-oh, something wrong.");  
							} else {
								$(".message").html(msg.json.error_message);  
							}
						}
					}
				});
			}
			return false;
		});
	});

	function valid_email_address(email) {
		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
		return pattern.test(email);
	}


	/* ---------------------------------------------------------
	 * Form validation
	 */
	$('[name=signup_email]').on('keyup',function(){
		var btn = $('#signupForm').find('button[type="submit"]');
		if(btn){
			$(btn[0]).html("Stay Up To Date");
		}

	});
	/* Signup form */

	// $('#signupForm').bootstrapValidator({
	// 	message: 'This value is not valid',
	// 	feedbackIcons: {
	// 		valid: 'fa fa-check',
	// 		invalid: 'fa fa-times',
	// 		validating: 'fa fa-refresh'
	// 	},
	// 	submitHandler: function (validator, form, submitButton) {
	// 		var l = Ladda.create(submitButton[0]),
	// 			btnText = submitButton.children(".ladda-label");

	// 		l.start();
	// 		btnText.html("Sign up...");

	// 		$.post(form.attr('action'), form.serialize(), function(result) {
	// 			btnText.html(result.message);
	// 		}, 'json')
	// 		.always(function() {
	// 			l.stop();
	// 			//btnText.html("Confirmed");
	// 			validator.disableSubmitButtons(true);
	// 		});
	// 	},
	// 	fields: {
	// 		signup_email: {
	// 			validators: {
	// 				notEmpty: {
	// 					message: 'Email cannot be empty'
	// 				},
	// 				emailAddress: {
	// 					message: 'The input is not a valid email address'
	// 				}
	// 			}
	// 		}
	// 	}
	// });

	/* Contact form */

// 	$('#contactForm').bootstrapValidator({
// 		fields: {
// 			name: {
// 				validators: {
// 					notEmpty: {
// 						message: 'Name cannot be empty'
// 					},
// 					stringLength: {
// 						min: 6,
// 						max: 30,
// 						message: 'Name must be more than 6 and less than 30 characters long'
// 					},
// 					regexp: {
// 						regexp: /^[a-zA-Z\s]+$/,
// 						message: 'Name can only consist alphabetical characters'
// 					}
// 				}
// 			},
// 			contactEmail: {
// 				validators: {
// 					notEmpty: {
// 						message: 'Email cannot be empty'
// 					},
// 					emailAddress: {
// 						message: 'The input is not a valid email address'
// 					}
// 				}
// 			},
// 			message: {
// 				validators: {
// 					notEmpty: {
// 						message: 'Message cannot be empty'
// 					}
// 				}
// 			}
// 		},
// 		feedbackIcons: {
// 			valid: 'fa fa-check',
// 			invalid: 'fa fa-times',
// 			validating: 'fa fa-refresh'
// 		},
// 		submitHandler: function (validator, form, submitButton) {
// 			var l = Ladda.create(submitButton[0]),
// 				btnText = submitButton.children(".ladda-label");

// 			l.start();
// 			btnText.html("Sending...");

// 			$.post(form.attr('action'), form.serialize(), function(result) {
// 				if(result.sent){
// 					btnText.html("Sent!");
// 				}
// 				else{
// 					btnText.html("Error!");
// 				}

// 				// Reset form after 5s
// 				setTimeout(function() {
// 					btnText.html("Submit");
// 					$(form[0])[0].reset();
// 					validator.resetForm();
// 				}, 5000);

// 			}, 'json')
// 			.always(function() {
// 				l.stop();
// 				validator.disableSubmitButtons(true);
// 			});
// 		},
// 	});
});
