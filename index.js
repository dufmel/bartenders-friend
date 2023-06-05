//Selects document elements for DOM manipulation

let ingredients = document.getElementById("ingredients")
let measurements = document.getElementById("measurements")
let image = document.getElementById("image")
let instructions = document.getElementById("instructions")
let drinkName = document.getElementById("drink-name")
let ulMeasurements = document.getElementById("measurements")
let ulIngredients = document.getElementById("ingredients")
let li = document.querySelector("li");

//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector("#next").addEventListener("click", goForward);
document.querySelector("#back").addEventListener("click", goBack);
document.querySelector("button").addEventListener("click", getDrink);

function animation() {
  image.classList.add("flip-vertical-left");
}

async function getDrink(){
  const drink = document.querySelector("input").value
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
  );
  const data = await response.json();
  counter = 0;
  render(data)
  getIngredients(data)
  getMeasurements(data)
  animation();
  console.log(data.drinks[0])
}

function render(data){
  instructions.innerHTML = data.drinks[counter].strInstructions;
  drinkName.innerHTML = data.drinks[counter].strDrink;
  image.src = data.drinks[counter].strDrinkThumb;
  
}

let items = [];
function empty(element){
  element.innerHTML = ""
}

function getIngredients(data){
  if (items.length > 0){
    items = []
  }

  empty(ulIngredients);

  console.log(ulIngredients);

  for (let i = 0; i<=15; i++){
      let ingredient = data.drinks[counter][`strIngredient${i}`];
      if(ingredient){
        items.push(ingredient)
      }
  }
  
  items.forEach((item) => {
    let li = document.createElement("li");
    ingredients.appendChild(li);
    li.innerHTML += item;
    });
  
    console.log(items)
}

let measure = [];

function getMeasurements(data) {
    if (measure.length > 0) {
    measure = [];
    }
  
  empty(ulMeasurements)

  for (let i = 0; i <= 15; i++) {
    let measurement = data.drinks[counter][`strMeasure${i}`];
    console.log(measurement);
    if (measurement) {
    measure.push(measurement);
    }
  }
  
  measure.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = `${item} - `;
    measurements.appendChild(li);
      });

  console.log(measure);
}


async function goForward() {
  animation()
  const drink = document.querySelector("input").value
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
  );
  const data = await response.json();
    
  if (counter === data.drinks.length - 1) {
    counter = -1;
    }

    counter++;
    render(data)
    getIngredients(data);
    getMeasurements(data);
}

async function goBack() {
  animation();
  const drink = document.querySelector("input").value
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
  );
  const data = await response.json();

      if (counter === 0) {
        counter = data.drinks.length;
      }
    counter--;
    render(data);
    getIngredients(data);
    getMeasurements(data);
}

