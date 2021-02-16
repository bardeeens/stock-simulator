
$('#createUser').click(
	function (event) {
	
		let userName = $('#userName').val();
		$.ajax(
			{ 				
				url: '/api/user',  			
				method: "POST",
				data: {
					userName: userName
				}		
			}
		).then (
			function(response) { -	
				console.log(response);
				console.log("then");
				window.location.redirect
				window.location.href = `/dashboard/${response.id}`;
// redirect needed
			}
		);
	}
);

$('.userBtn').click(
	function (event) {
console.log(this.id);
		window.location.href = `/dashboard/${this.id}`;
	}
)
// click event for login selection

// sell click events

// buy click events

// transaction page redirect

// dashboard redirect

// market redirect

// onhomepage load, 
// delete stockstable
// create stocks api call needed

