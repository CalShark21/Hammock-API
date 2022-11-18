
// Our JSON object containing returned objects from search, currently just returns all objects in database

/* -- Fake API data --

const propData = [
    {
        "title": "Italian Villa",
        "id": "1234",
        "description": "this is a fake description",
        "type": "Condo",
        "location": "Rhode Island",
        "guests": 5,
        "beds": 1,
        "baths": 3,
        "amenities": "free coffee",
        "price": 180,
        "main_photo": "villa-main.jpg",
        "side_photo": "villa-main.jpg"
    },
    {
        "title": "Cozy Cottage",
        "id": "12345",
        "description": "this is a fake description part 2",
        "type": "House",
        "location": "New Hampshire",
        "guests": 4,
        "beds": 2,
        "baths": 1.5,
        "amenities": "free wifi",
        "price": 220,
        "main_photo": "villa-main.jpg",
        "side_photo": "villa-main.jpg"
    },
    {
        "title": "Tilted Towers",
        "id": "123456",
        "description": "this is a fake description part 2",
        "type": "House",
        "location": "New Donk City",
        "guests": 10,
        "beds": 4,
        "baths": 2,
        "amenities": "free sha va ca doo",
        "price": 250,
        "main_photo": "villa-main.jpg",
        "side_photo": "villa-main.jpg"
    }
]
*/


/* -- Template for Div --
    <div class="card" onclick="window.location= 'property-detailed.html'">
        <div class="card-image" style="background-image: url('/images/villa-main.jpg')"></div>
        <h2>${propData.title}</h2>
        <p>${propData.guests} guests - ${propData.beds} bedrooms - ${propData.baths} baths</p>
        <h3 class="price">${propData.price}</h3>
    </div>
 */

const inputLocation = localStorage.getItem('location');
var locationFetchURL = 'http://localhost:8080/api/properties/?location=' + inputLocation;
console.log('http://localhost:8080/api/properties/?location=' + inputLocation);
//document.getElementById("heading").textContent += inputLocation;

fetch(locationFetchURL)
    .then( res => res.json())
    .then( data => buildCards(data))

function propertyTemplate(property){
    return `
        <div class="card" onclick="passData(${property.id})">
            <div class="card-image" style="background-image: url('Main1.JPG')"></div>
            <h2>${property.title}</h2>
            <p>${property.guests} guests - ${property.beds} bedrooms - ${property.baths} baths</p>
            <h3 class="price">${property.price}</h3>
        </div>
    `
}
function buildCards(propData) {
    document.getElementById("card-container").innerHTML = `
    <h1 id="heading">Results for stays in ${inputLocation}</h1>
    ${propData.map(propertyTemplate).join('')} 
`
}
/*function passData(propID){
    window.location.href = 'property-detailed.html' + '#' + propID;
}*/
const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".price-input input"),
    progress = document.querySelector(".slider .progress");

const adultPlus = document.getElementById("adult-plus"),
    adultMinus = document.getElementById("adult-minus"),
    adultNum = document.getElementById("adult-num"),
    childrenPlus = document.getElementById("children-plus"),
    childrenMinus = document.getElementById("children-minus"),
    childrenNum = document.getElementById("children-num");


// Counter Buttons

let a = 0,
    c = 0;

adultPlus.addEventListener("click", ()=>{
    a++;
    a = (a<10) ? "0" + a : a;
    adultNum.innerText=a;
});

adultMinus.addEventListener("click", ()=>{
    if(a>0){
        a--;
        a = (a<10) ? "0" + a : a;
        adultNum.innerText=a;
    }
});

childrenPlus.addEventListener("click", ()=>{
    c++;
    c = (c<10) ? "0" + c : c;
    childrenNum.innerText=c;
});

childrenMinus.addEventListener("click", ()=>{
    if(c>0){
        c--;
        c = (c<10) ? "0" + c : c;
        childrenNum.innerText=c;
    }
});


//Price slider

let priceGap = 100;

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        // getting two input values and parsing them to a number
        let minVal = parseInt(priceInput[0].value),
            maxVal = parseInt(priceInput[1].value);

        if((maxVal - minVal >= priceGap) && maxVal <=10000){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            }else{
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        }
    });
})

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        // getting two range values and parsing them to a number
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if(maxVal - minVal < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap;
            }else{
                rangeInput[1].value = minVal + priceGap;
            }

        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
})