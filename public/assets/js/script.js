function populateStocks () {
	if (!$('.userBtn').text()) {
		console.log('MAKING POST CALL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		$.ajax(
			{ 				
				url: '/api/stocks',  			
				method: "POST",
			}
		)
	} else {
		console.log('MAKING PUT CALL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		$.ajax(
			{ 				
				url: '/api/stocks',  			
				method: "PUT",
			}
		)	}
}

$('#createUser').click(
	function (event) {
		event.preventDefault();
		populateStocks ()
		.then ( ( response ) => log ( response ) )
		.catch ( ( err ) => console.log ( err ) )

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
			}
		);
	}
);

$('.userBtn').click(
	function (event) {
		let id = this.id
		event.preventDefault();
		populateStocks ()
		.then (
			function(response) { 	
				console.log(id);
				console.log(response);
				sessionStorage.setItem('id', id)
			}
		)
		.catch ( ( err ) => console.log ( err ) )
		// let data = sessionStorage.getItem('id')
		window.location.href = `/dashboard/${id}`;
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
					let price = response[stockid-1].price
<<<<<<< HEAD
=======
					let ourStockId = response[stockid-1].id
					let totalqty = $(`#qty${ourStockId}`).text()
					
					
					 console.log('total quantity:' + totalqty)
					 if (sellqty > totalqty) {
						 alert("you can't sell more than you own");
						 return;
					 }
					
>>>>>>> 9f10d1890795372649ca68ed998ef60e23aaafe2
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
<<<<<<< HEAD
								console.log(userID);
								console.log(response);
=======
								// console.log(userID);
								// console.log(response);
								
>>>>>>> 9f10d1890795372649ca68ed998ef60e23aaafe2
								document.location.reload(true)
							});
				});
	}
);

<<<<<<< HEAD
=======

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
		$.ajax(
			{
				url: '/api/buy',
				method: "POST",
				data: {
					qty: qtyOwned,
					price: currentPrice,
					totalValue: currentPrice,
					StockId: stockId,
					UserId: userId,
				}
			}
		).then (
			function(response) {
				console.log("this is our response", response);
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

// Modal alerts

>>>>>>> 9f10d1890795372649ca68ed998ef60e23aaafe2
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