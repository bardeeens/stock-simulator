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