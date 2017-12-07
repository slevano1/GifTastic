 // Initial array of gifs
      var celeb = ["Dwayne Johnson", "Star Wars", "Mean Girls - Movie", "Patrick Stewart", "Oprah", "Buffy", "Kevin Hart", 
      	"Barack Obama", "The Office BBC - David Brent", "Spongebob", "Iron Man", "The Simpsons", "Will Ferrell"];
      
      var gifState = false;
      // Function for dumping the JSON content for each button into the div
      function renderGif() {

        var gif = $(this).attr("data-name");
         // Constructing a queryURL using the gif name
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=f7ea57d3c6bb4d069046900b92c8f30d&q=" + gif +"&limit=10";
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);
          console.log(response);
        	//ties back to index row 36
          $("#gifs-appear-here").html("");
        	// Looping through each result stopping at 10
          for (var i = 0; i < 10; i++) {

          //Creating and storing a div tag 
        	var gifDiv = $("<div class='item'>");
          // Creating a paragraph tag with rating
        	var results = response.data[i].rating;
        	var p = $('<p>');
          // Creating an image tag
        	var gifImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
        	gifImage.attr("src",response.data[i].images.fixed_height_still.url);        	     
        	p.text('Rated: ' + results);

           // Appending the paragraph and image tag to the gifImage
        	gifDiv.append(p);
        	gifDiv.append(gifImage);
          // index.html row 36 - inserts gif 
        	$("#gifs-appear-here").append(gifDiv);
            }
          responseCopy = response;
          return responseCopy;
          
        });
      }

      // Function for displaying gif data
      function renderButtons() {
        console.log(renderButtons);
        // prevents all existing buttons from creating a new row with each new button addition
        $("#buttons-view").empty();



        // For Loop
        for (var i = 0; i < celeb.length; i++) {

          // Buttons for each gif in the array
          
          var x = $("<button class='btn btn-info'>");
          // Adding a class of gif to our button
          x.addClass("gif");
          // Adding a data-attribute
          x.attr("data-name", celeb[i]);
          // Providing the initial button text
          x.text(celeb[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(x);
        }
      }

      // This function handles events where one button is clicked/index.html row 32
      $("#addGif").on("click", function(event) {
        event.preventDefault();
        
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();
        if (gif != "") {



        // Adding the gif from the textbox to our array
        celeb.push(gif);
        console.log(gif)

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      }
      });
      	//on-off gifs
      function changeGif() {
      	var state = $(this).index();
      	if (gifState === false) {
      	$(this).find("img").attr("src",responseCopy.data[state].images.fixed_height.url);
      	gifState = true;
      } else {
      	$(this).find("img").attr("src",responseCopy.data[state].images.fixed_height_still.url);
      	gifState = false;
      	}
      	
      };

      // Function for displaying the gif info
      // Using $(document).on instead of $(".gif").on to add event listenersto dynamically generated elements
      $(document).on("click", ".gif", renderGif);
      $(document).on("click", ".item", changeGif);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();