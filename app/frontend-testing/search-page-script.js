const propertyDisplay = document.querySelector("property-display")
const searchButton = document.querySelector(".search-btn")

var textInputLocation = document.getElementById("text-input-location")

/*$(document).ready(function () {
    $(searchButton).click(function () {

        console.log("search button clicked");

        $.ajax({
            url: "http://localhost:8080/api/properties", success: function (result) {
                debugger;
                var listOfItems = '';

                for (var x = 0; x < result.length; x++) {
                    listOfItems += createLineItem(result[x]);
                }

                $('#div1').html(listOfItems);
            }
        });
    });
});*/

var createLineItem = function (item) {
    return '<div>' + item.firstName + ' ' + item.lastName + '</div>';
}

$(searchButton).click(function () {
    event.preventDefault();

    var inputLocation = textInputLocation.value;
    console.log("search button clicked!");

    fetchSearchResults()
        .then(response => {
            console.log("Fetching search results for " + inputLocation);
        });

    async function fetchSearchResults() {
        const response = await fetch('http://localhost:8080/api/properties' + "?location=" + inputLocation);
    }

    localStorage.setItem('location', inputLocation);

    window.location.href = 'results-page.html';




    /*$.ajax(
    {
        type: "GET",
        url: 'http://localhost:8080/api/properties' + "?location=" + inputLocation,
        dataType: "json",
        success: function(result) {

        },
        error: function(x, e) {
        }
    });*/

    /*fetch('http://localhost:8080/api/properties' + "?location=" + inputLocation)
        //.then(response => response)
        .then( response => {
            console.log(response.json());
        });*/

    //console.log(fetch('http://localhost:8080/api/properties' + "?location=" + inputLocation))



    /*fetch('http://localhost:8080/api/properties')
    .then(data => {
        data.forEach(property => {
            const title = `<h3>` + property.title + `</h3>` //or is it property.id?
            propertyDisplay.insertAdjacentElement("beforeend", title)
        })
  })*/



})


/*searchButton.addEventListener('click', ()=> {
    //console.log("search button clicked")

    fetch('http://localhost:8080/api/properties')
        .then(data => {
            data.forEach(property => {
                const title = `<h3>` + property.title + `</h3>` //or is it property.id?
                propertyDisplay.insertAdjacentElement("beforeend", title)
            })
      })
});*/

