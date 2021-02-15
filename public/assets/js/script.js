
$('#createUserBtn').click(
	function (event) {
	
		userFirstName = $('#firstNameInput').val();
		userLastName = $('#lastNameInput').val();
		$.ajax(
			{ 				
				url: '/api/user',  			
				method: "POST",
				data: {
					firstName: userFirstName,
					lastName: userLastName
				}		
			}
		).then (
			function(response) { -	
				console.log(response);		
				console.log(response.keyName);
// redirect needed
			}
		);
	}
);

// click event for login selection

// sell click events

// buy click events

// transaction page redirect

// dashboard redirect

// market redirect

// onhomepage load, 
// delete stockstable
// create stocks api call needed

