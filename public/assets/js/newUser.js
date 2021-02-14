module.exports = 
$('addUserBtn').click (
	function () {
		let userFirstName = $('#firstNameInput').text;
		let userLastName = $('#lastNameInput').text;
		$.ajax(
			{ 				
				url: '/api/user',  			
				method: "POST",
				data: {
					firstName: userFirstName,
					lastName: userLastName,
					currentBalance: 1000,
					totalHoldings: 0,
					beginingInvestmentAmount: 1000
				}		
			}
		).then (
			function(response) { -	
				console.log(response);		
				console.log(response.keyName);
			}
		);
	}
);