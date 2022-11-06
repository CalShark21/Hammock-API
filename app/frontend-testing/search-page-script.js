const propertyDisplay = document.querySelector("property-display")
const searchButton = document.querySelector(".search-btn")

const textInputLocation = document.getElementById(".text-input-location")

searchButton.addEventListener('click', ()=> {
    console.log("search button clicked")
    //console.log(textInputLocation.value);

    fetch('http://localhost:8080/api/properties')
        .then(data => {
            data.forEach(property => {
                const title = `<h3>` + property.title + `</h3>` //or is it property.id?
                propertyDisplay.insertAdjacentElement("beforeend", title)
            })
      })
});

