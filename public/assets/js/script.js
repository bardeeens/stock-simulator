
$('#createUser').click(
	function (event) {
	
		let userName = $('#userName').val();
		$.ajax(
			{ 				
				url: '/api/stocks',  			
				method: "PUT",
			}
		)
		$.ajax(
			{ 				
				url: '/api/user',  			
				method: "POST",
				data: {
					userName: userName
				}		
			}
		).then (function(response) { 
				console.log(response);
				console.log("then");
				window.location.redirect
				window.location.href = `/dashboard/${response.id}`;
			});
	}
);

$('.userBtn').click(
	function (event) {
		
		let id = this.id
		// window.location.href = `/dashboard/${this.id}`;
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
$('.buyBtn').click(
	function(event) {
		console.log("before ajax " + this.id);
		let qtyOwned = parseInt($('.qtyOwned').val()); 
		let currentPrice = parseFloat($('.currentPrice#' + this.id).text());
		let stockId = this.id;
		let userId = sessionStorage.getItem('id');
		console.log(qtyOwned);
		console.log(currentPrice);
		console.log(stockId);
		console.log(userId);
		// $.ajax(
		// 	{
		// 		url: '/api/buy',
		// 		method: "POST",
		// 		data: {
		// 			qtyOwned: qtyOwned,
		// 			purchasePrice: currentPrice,
		// 			currentPrice: currentPrice,
		// 			StockId: stockId,
		// 			UserId: userId,
		// 		}
		// 	}
		// ).then (
		// 	function(response) {
		// 		console.log("this is our response", response);
		// 	}
		// );
	}
);

// transaction page redirect

// dashboard redirect

// market redirect

// onhomepage load, 
// delete stockstable
// create stocks api call needed

