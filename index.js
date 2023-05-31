//Selects document elements for DOM manipulation

let ingredients = document.getElementById("ingredients")
let measurements = document.getElementById("measurements")
let image = document.getElementById("image")
let instructions = document.getElementById("instructions")
let drinkName = document.getElementById("drink-name")

//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector("#next").addEventListener("click", goForward);
document.querySelector("#back").addEventListener("click", goBack);
document.querySelector("button").addEventListener("click", getDrink);

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
  console.log(data.drinks[0])
}

function render(data){
  instructions.innerHTML = data.drinks[0].strInstructions;
  drinkName.innerHTML = data.drinks[0].strDrink;
  image.src = data.drinks[0].strDrinkThumb;
}

const items = [];

function getIngredients(data){
    for (let i = 0; i<=15; i++){
      let ingredient = data.drinks[0][`strIngredient${i}`];
      console.log(ingredient)
      if(ingredient){
        items.push(ingredient)
      }
    }
    items.forEach((item) => {
      let li = document.createElement("li");
      li.innerText = item;
      ingredients.appendChild(li);
    })
    
  

  console.log(items)
}

const measure = [];

function getMeasurements(data) {
  for (let i = 0; i <= 15; i++) {
    let measurement = data.drinks[0][`strMeasure${i}`];
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


function goForward() {
  let drink = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data.drinks);
      if (counter === data.drinks.length - 1) {
        counter = -1;
      }

      counter++;
      document.getElementById("instructions").innerText = data.drinks[counter].strDrink;
      document.querySelector("img").src = data.drinks[counter].strDrinkThumb;
      document.getElementById("instructions").innerText =
        data.drinks[counter].strInstructions;

      // count();
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function goBack() {
  let drink = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data.drinks);

      if (counter === 0) {
        counter = data.drinks.length;
      }
      counter--;
      document.getElementById("instructions").innerText =
        data.drinks[counter].strDrink;
      document.querySelector("img").src = data.drinks[counter].strDrinkThumb;
      document.getElementById("instructions").innerText =
        data.drinks[counter].strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

