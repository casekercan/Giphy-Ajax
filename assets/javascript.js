var animals = ["Panda", "Monkey", "Cat", "Dog", "Frog", "Guinea Pig", "Fish"];

function displayButtons() {
    $("#animalButtons").empty();
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.attr("data-name", animals[i]);
        a.addClass("btn btn-info");
        a.text(animals[i]);
        $("#animalButtons").append(a);
    }
};

//adding a new animal button 
$("#addAnimal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animalInput").val().trim();
    animals.push(animal);
    displayButtons();
});

//clicking a button

$("#animalButtons").on("click", "button", function () {
    $("#animals").empty();
    var query = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=2655Z9aEgu9sL1iLt5E2rRT1NCBy9xxF&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("still-url", results[i].images.fixed_height_still.url);
                animalImage.attr("animate-url", results[i].images.fixed_height.url);
                gifDiv.prepend(p);
                gifDiv.append(animalImage);
                $("#animals").prepend(gifDiv);
            }
        });
});


$("#animals").on("click", "img", function () {
    var state = $(this).attr("data-state");
    var animateUrl = $(this).attr("animate-url");
    var stillUrl = $(this).attr("still-url");

    if (state === "still") {
        $(this).attr("src", animateUrl);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", stillUrl);
        $(this).attr("data-state", "still");
    };

});





displayButtons();









