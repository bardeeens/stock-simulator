
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
		console.log(qtyOwned);
		console.log(currentPrice);
		$.ajax(
			{
				url: '/api/buy',
				method: "POST",
				data: {
					qtyOwned: qtyOwned,
					type: "buy",
					purchasePrice: currentPrice,
					currentPrice: currentPrice,
				}
			}
		).then (
			function(response) {
				console.log("this is our response" + response);
				return(response);
			}
		);
	}
);

// transaction page redirect

// dashboard redirect

// market redirect

// onhomepage load, 
// delete stockstable
// create stocks api call needed

