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
		)	
	}
}

$('#createUser').click(
	function (event) {
		event.preventDefault();

		let userName = $('#userName').val();
		if (userName.length === 0){
						alert("Surely you have a name! Try again")
						return;
			} else {
						$.ajax(
			{
				url: '/api/user',
				method: "GET"
			}
		).then (function(response) {
			let nameArray = []
			for (let i = 0; i < response.length; i++) {	
				nameArray.push(response[i].userName)
				console.log(userName);	
			}
			if (nameArray.includes(userName)) {
				alert("Sorry, this is already an active profile!")
			} else {
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
					console.log(userName.length);
					console.log(response);
					let data = sessionStorage.getItem('id')
						window.location.redirect
						window.location.href = `/dashboard/${response.id}`;
					}
				);
				populateStocks ()
				.then ( ( response ) => console.log ( response ) )
				.catch ( ( err ) => console.log ( err ) )
			}
			
		})



				
			}
		
	}
);

$('.userBtn').click(
	function (event) {
		let id = this.id;
		event.preventDefault();
		populateStocks ();
		// console.log(id);
		// console.log(response);
		sessionStorage.setItem('id', id)
		window.location.href = `/dashboard/${id}`;
	}
);

$('.sell').click(
	function (event) {
		event.preventDefault();
		let stockid = this.id
		let sellqty = $(`#sellqty${stockid}`).val().trim()
		let userID = sessionStorage.getItem('id')
		if (isNaN(sellqty)){
			alert("you must enter a number ya dummy!")
			return;
		} else if (sellqty.length === 0){
			alert("you must enter a quantity!")
			return;
		} else {
			$.ajax(
				{ 				
					url: '/api/stocks',  			
					method: "GET",
					// data: {stuff}
				}
				).then (
					function(response) { 
						let price = response[stockid-1].price
						let ourStockId = response[stockid-1].id
						let totalqty = $(`#qty${ourStockId}`).text()
						
						
						//  console.log('total quantity:' + totalqty)
						 if (sellqty > totalqty) {
							 alert("you can't sell more than you own");
							 return;
						 }
						
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
									// console.log("working!!");	
									// console.log(userID);
									// console.log(response);
									
									document.location.reload(true)
								});
					});
		}
		
	}
);

$('.buyBtn').click(
	function(event) {
		event.preventDefault();
		let stockId = this.id
		let transQty = $(`#buyQty${stockId}`).val().trim()
		let currentPrice = parseFloat($('.currentPrice#' + stockId).text())
		console.log(transQty);
		let userid = sessionStorage.getItem('id')
		if (transQty.length === 0) {
			alert("You must enter a quantity!")
			return;
		} else if (isNaN(transQty)){
			alert("you must enter a number or decimal!")
			return;
		} else {
			$.ajax(
				{
					url: '/api/user',
					method: "GET"
				}
			).then (
				function(response) {
					let totalpurchase = parseFloat(transQty * currentPrice)
					let userCASH = response[(userid-1)].currentBalance
					
					
					if (userCASH < totalpurchase) {
						alert("You don't have enough cash!")
						return;
					} else {
						console.log("transaction quantity: ", transQty);
						console.log("current price: ", currentPrice);
						console.log((transQty * currentPrice));
						$.ajax(
							{
								url: '/api/buy',
								method: "POST",
								data: {
									qty: transQty,
									price: currentPrice,
									totalValue: (transQty * currentPrice),
									StockId: stockId,
									UserId: userid
								}
							}
						).then (
							function(response) {
								console.log("this is working!!");
								console.log(response);
								alert("You have just made a purchase!")
								document.location.reload(true);
							}
						);
					}
				}
			);
	
		}

		
		
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

$('#transactionsBtn').click(
	function (event) {
		event.preventDefault();
		let userId = sessionStorage.getItem('id')

				window.location.href = `/transactions/${userId}`;

	}
);

$('#portfolioBtn').click(
	function (event) {
		event.preventDefault();
		let userId = sessionStorage.getItem('id')
		$.ajax(
			{ 				
				url: `/dashboard/${userId}`,  			
				method: "GET"	
			}
		).then (
			function(response) { 
				window.location.href = `/dashboard/${userId}`;
			}
		)
		.catch ( ( err ) => console.log ( err ) )
	}
);

$('#portfolioBtn').click(
	function (event) {
		event.preventDefault();
		let userId = sessionStorage.getItem('id')
		$.ajax(
			{ 				
				url: `/dashboard/${userId}`,  			
				method: "GET"	
			}
		).then (
			function(response) { 
				window.location.href = `/dashboard/${userId}`;
			}
		)
		.catch ( ( err ) => console.log ( err ) )
	}
);