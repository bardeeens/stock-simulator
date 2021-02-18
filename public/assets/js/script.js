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


				// console.log("this is our response", response);


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

// $('#createUser').click(
// 	function (event) {
// 		event.preventDefault()

// 		let userName = $('#userName').val();
// 		if (userName.length === 0){
// 			alert("Surely you have a name! Try again")
// 			return;
// 		}

// 		$.ajax(
// 			{
// 				url: '/api/user',
// 				method: "GET"
// 			}
// 		).then (function(response) {
// 			for (let i = 0; i < response.length; i++) {
// 				console.log(response[i].userName);
				
// 			}
			
// 		})
		
// 		$.ajax(
// 			{ 				
// 				url: '/api/stocks',  			
// 				method: "PUT",
// 			}
// 		)
// 		$.ajax(
// 			{ 				
// 				url: '/api/user',  			
// 				method: "POST",
// 				data: {
// 					userName: userName
// 				}		
// 			}
// 		).then (function(response) { 
// 			sessionStorage.setItem('id', response.id)
// 			console.log(userName.length);
// 			console.log(response);
// 			let data = sessionStorage.getItem('id')
// 				// window.location.redirect
// 				// window.location.href = `/dashboard/${response.id}`;
				
// 			});
// 	}
// );
