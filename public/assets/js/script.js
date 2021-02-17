
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
					
					window.location.href = `/dashboard/${id}`;
				});
		
	}
);

$('.sell').click(
	function (event) {
		
		let stockid = this.id
		console.log(stockid);
		
		$.ajax(
			{ 				
				url: '/api/sell',  			
				method: "POST",
				data: { 
					qty: -10,
					price: 4,
					totalValue: 12,
					UserId:1,
					StockId: 4
					}
			}
			).then (
				function(response) { 
					console.log("working!!");	
					console.log(id);
					console.log(response);
					
					// window.location.href = `/dashboard/${id}`;
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

