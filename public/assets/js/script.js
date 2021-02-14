// require('newUser.js');

// Make sure we wait to attach our handlers until the DOM is fully loaded.
// $(function() {
//   $(".change-sleep").on("click", function(event) {
//     var id = $(this).data("id");
//     var newSleep = $(this).data("newsleep");

//     var newSleepState = {
//       sleepy: newSleep
//     };

//     // Send the PUT request.
//     $.ajax("/api/cats/" + id, {
//       type: "PUT",
//       data: newSleepState
//     }).then(
//       function() {
//         console.log("changed sleep to", newSleep);
//         // Reload the page to get the updated list
//         location.reload();
//       }
//     );
//   });

//   $(".create-form").on("submit", function(event) {
//     // Make sure to preventDefault on a submit event.
//     event.preventDefault();

//     var newCat = {
//       name: $("#ca").val().trim(),
//       sleepy: $("[name=sleepy]:checked").val().trim()
//     };

//     // Send the POST request.
//     $.ajax("/api/cats", {
//       type: "POST",
//       data: newCat
//     }).then(
//       function() {
//         console.log("created new cat");
//         // Reload the page to get the updated list
//         location.reload();
//       }
//     );
//   });
// });
// $(document).ready( function () {
// alert ('running js file');

// $('#createUserBtn').on("click", function () {alert ('click working');});


// $( "#createUserBtn" ).click(function() {
//   alert( "Handler for .click() called." );
// });

$('#createUserBtn').click(
	function (event) {
		// event.preventDefault();
		// alert ('working');
		userFirstName = $('#firstNameInput').val();
		userLastName = $('#lastNameInput').val();
		$.ajax(
			{ 				
				url: '/api/user',  			
				method: "POST",
				data: {
					firstName: userFirstName,
					lastName: userLastName
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

// });