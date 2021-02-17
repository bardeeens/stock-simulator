
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
$('.buyBtn').click(
	function(event) {
		event.preventDefault();
		// console.log("before ajax " + this.id);
		let qtyOwned = $('.qtyOwned').val().trim()
		let currentPrice = parseFloat($('.currentPrice#' + this.id).text())
		let stockid = this.id
		let userid = sessionStorage.getItem('id')
		console.log(qtyOwned)
		console.log(currentPrice)
		console.log(stockid)
		console.log(userid)

			$.ajax(
			{
				url: '/api/buy',
				method: "POST",
				data: {
					qty: qtyOwned,
					price: currentPrice,
					totalValue: parseFloat(qtyOwned * currentPrice),
					StockId: stockid,
					UserId: userid
				}
			}
		).then (
			function(response) {
				console.log("this is working!!");
				console.log(userid);
				console.log(response);
			});
		});


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