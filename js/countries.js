import {
  getOnlyCountryNames,
  getOnlyPopulations,
  getCitiesNames,
  getPopulationDataByYear,
  getLastPopUpdate
} from "./getData.js";


import { buildButtons } from "./main.js";
// const continentsNames = document.querySelectorAll(".btn-continints");
// continentsNames.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     ;
//     localStorage.setItem("clickedContinint",e.target.value);
//     getCountriesasync(e.target.value);
//     window.location.href = "countries.html"
//   })
// });

buildButtons
const continint = localStorage.getItem("clickedContinint").toString();
const countries = JSON.parse(localStorage.getItem(continint));
const countriesParent = document.querySelector(".countries")

let firstCanvas = document.querySelector("#myChart");
let secondCanvas = document.querySelector("#myChart2");



main();

async function main() {

  try {
    await buildCoutriesButtons(countries)
    let lables = getOnlyCountryNames(countries);
    const data = countries.map(element => element.population)
    const labels = countries.map(element => element.name.common)
    await displayGraph(labels, data)
    const countriesParentchildren = document.querySelectorAll(".btn-country")
    countriesParentchildren.forEach((c) => {
      c.addEventListener("click", async (e) => {
        ;
        localStorage.setItem("clickedCountry", e.target.value)
        const cities = await getOnlyPopulations(localStorage.getItem("clickedCountry"))
        displayGraphCities(cities)
      })
    });

  } catch (error) {
    console.log(error);
  }

}

let myChart = null;

function displayGraphCities(cities) {
  ;
  
  showSecondCanvas()
  let canvas = document.getElementById('myChart2');
  if (canvas) {
    canvas.remove();
  }
  canvas = document.createElement("canvas");
  canvas.id = "myChart2";
  document.querySelector(".c-2").appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let cits = getCitiesNames(cities);
  let popPerYear = getPopulationDataByYear(cities);
  let Pdata = getLastPopUpdate(cities);
  let labs = Object.keys(popPerYear);
  let data = {
    labels: cits,
    datasets: []
  };

  labs.forEach((year, index) => {
    let dataset = {
      label: year,
      backgroundColor: 'rgba(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132)',
      data: Pdata.map(el => el),
      borderWidth: 2
    };
    data.datasets.push(dataset);
  });



  if (myChart) {
    myChart = null;
  }
  myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  });
}


async function buildCoutriesButtons(countries) {
  countries.forEach(element => {
    let button = document.createElement("button");
    button.value = element.name.common;
    button.innerText = element.name.common;
    button.classList.add("btn");
    button.classList.add("btn-country");
    countriesParent.appendChild(button)
  });
}











function displayGraph(labels, data) {
  showFirstCanvas();
  const ctx = document.getElementById('myChart').getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,

      datasets: [{
        label: 'population',
        backgroundColor: 'rgba(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132)',
        data: data,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function showFirstCanvas() {
  firstCanvas.style.display = "block";
  secondCanvas.style.display = "none";
}

function showSecondCanvas() {
  firstCanvas.style.display = "none";
  secondCanvas.style.display = "block";
}