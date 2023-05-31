//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector("#next").addEventListener("click", goForward);
document.querySelector("#back").addEventListener("click", goBack);
document.querySelector("button").addEventListener("click", getDrink);

// let counter = 0;

function getDrink() {
  let drink = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data.drinks);
      counter = 0;

      document.querySelector("h2").innerText = data.drinks[0].strDrink;
      document.querySelector("img").src = data.drinks[0].strDrinkThumb;
      document.querySelector("h3").innerText = data.drinks[0].strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
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
      document.querySelector("h2").innerText = data.drinks[counter].strDrink;
      document.querySelector("img").src = data.drinks[counter].strDrinkThumb;
      document.querySelector("h3").innerText =
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
      document.querySelector("h2").innerText = data.drinks[counter].strDrink;
      document.querySelector("img").src = data.drinks[counter].strDrinkThumb;
      document.querySelector("h3").innerText =
        data.drinks[counter].strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// function count(){
//   let drink = document.querySelector('input').value

//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
//   .then(res => res.json()) // parse response as JSON
//   .then(data => {
//     console.log(data.drinks)
//     for(let counter = 0 ; counter < data.drinks.length; counter++) {
//       clearInterval(interval);
//       return;
//     }
//   })
//   .catch(err => {
//     console.log(`error ${err}`)
//   });
// }
