const propertyDisplay = document.querySelector("property-display")
const searchButton = document.querySelector(".search-btn")

const textInputLocation = document.getElementById(".text-input-location")

var createLineItem = function (item) {
    return '<div>' + item.title + ' ' + item.location + '</div>';
}

$(document).ready(function () {
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
});

searchButton.addEventListener('click', ()=> {
    //console.log("search button clicked")

    /*fetch('http://localhost:8080/api/properties')
        .then(data => {
            data.forEach(property => {
                const title = `<h3>` + property.title + `</h3>` //or is it property.id?
                propertyDisplay.insertAdjacentElement("beforeend", title)
            })
      })*/
});

