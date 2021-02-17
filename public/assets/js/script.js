function populateStocks () {
	$.ajax(
		{ 				
			url: '/api/stocks',  			
			method: "POST",
		}
	)
}

$('#createUser').click(
	function (event) {
		event.preventDefault();
		console.log('CLICK EVENT WORKING');
		console.log('USER BTN', $('.userBtn').text());
		populateStocks ();
		// if (!$('.userBtn').text()) {
		// 	console.log('USER BUTTON IS UNDEFINED');
			// $.ajax(
			// 	{ 				
			// 		url: '/api/stocks',  			
			// 		method: "POST",
			// 	}
			// )
			// .then (
			// 	console.log('AJAX POST CALL MADE')
			// )
		// } else {
		// 	$.ajax(
		// 		{ 				
		// 			url: '/api/stocks',  			
		// 			method: "PUT",
		// 		}
		// 	).then (
		// 		console.log('AJAX PUT CALL MADE')
		// 	)
		// }
		let userName = $('#userName').val();

		$.ajax(
			{ 				
				url: '/api/user',  			
				method: "POST",
				data: {
					userName: userName
				}		
			}
		).then (function(response) { 
			sessionStorage.setItem('id', response.id)
			let data = sessionStorage.getItem('id')
				window.location.redirect
				window.location.href = `/dashboard/${response.id}`;
				
			});
		}
);

$('.userBtn').click(
	function (event) {
		
		let id = this.id
		
		$.ajax(
			{ 				
				url: '/api/stocks',  			
				method: "PUT",
			}
			).then (
				function(response) { 	
					console.log(id);
					console.log(response);
					
					window.location.href = `/dashboard/${id}`;
				});
		
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

// Modal alerts

$('.buyBtn').click( 
	function (){
		$('.reveal').css("display", "block")
	}
)

$('.close-button').click(
	function (){
		$('.reveal').css("display", "none")
	}
)