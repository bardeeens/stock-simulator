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
					sessionStorage.setItem('id', id)
			// let data = sessionStorage.getItem('id')
					
					window.location.href = `/dashboard/${id}`;
				});
		
	}
);

$('.sell').click(
	function (event) {
		event.preventDefault();
		let sellqty = $('#sellqty').val().trim()
		let userID = sessionStorage.getItem('id')
		// console.log(userID);
		let stockid = this.id
		// console.log(stockid);

	
		

		$.ajax(
			{ 				
				url: '/api/stocks',  			
				method: "GET",
				// data: {stuff}
				
			}
			).then (
				function(response) { 
					console.log("working!!");	
					console.log(stockid);
					let price = response[stockid-1].price
					
					$.ajax(
						{ 				
							url: '/api/sell',  			
							method: "POST",
							data: { 
								qty: (sellqty * -1),
								price: price,
								totalValue: (sellqty * -1)*price,
								UserId: userID,
								StockId: stockid
								}
						}
						).then (
							function(response) { 
								console.log("working!!");	
								console.log(userID);
								console.log(response);
								
								document.location.reload(true)
							});
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