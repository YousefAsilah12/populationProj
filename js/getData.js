// const data = async()=>{

//     const response = await fetch("https://restcountries.com/v3.1/region/asia");
//     const res = await response.json();
//     console.log({"res":res})


// }
// data()
export async function getCountries(region) {
  console.log(region)
  try {
    const response = await fetch("https://restcountries.com/v3.1/region/" + region);
    const res = await response.json();
    return res
  } catch (err) {
    console.log({
      error: err
    })

  }

}

async function getAllCountries() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("https://countriesnow.space/api/v0.1/countries/iso", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function getCountryCities() {
  var raw = "{\n    \"iso2\": \"NG\"\n}";

  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  };

  fetch("https://countriesnow.space/api/v0.1/countries/capital", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
async function getCountriesCities() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    let response = await fetch("https://countriesnow.space/api/v0.1/countries", requestOptions)
    response = response.json()
    return response
  } catch (error) {
    console.log(error);
  }


}
async function displayCountriesCities() {
  let response = await getCountriesCities();
  console.log(response.data);
}

// displayCountriesCities();


export async function getSpecificCountryCities(scountry) {

  let response = await getCountriesCities();
  console.log("before filter", response);
  let filteredData = response.data.find(c => c.country === scountry);
  console.log("filtered", filteredData);

}

// getSpecificCountryCities("Israel");

export function getOnlyCountryNames(arr) {
  let newObj = []
  arr.forEach(element => {
    newObj.push(element.name.common);
  });
  return newObj;
}


async function getCitiesPopulations() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    let response = await fetch("https://countriesnow.space/api/v0.1/countries/population/cities", requestOptions)
    response = response.json()
    return response

  } catch (error) {
    console.log(error);
  }

}
export async function getOnlyPopulations(country) {
  const countryCities = [];
  let citiesPopulations = await getCitiesPopulations();
  citiesPopulations.data.forEach(countryPop => {

    if (countryPop.country === country) {
      countryCities.push(countryPop);
    }
  })
  return countryCities;
}


export function getCitiesNames(arr) {
  let newarr = []
  arr.forEach(element => {
    newarr.push(element.city);
  });

  return newarr
}

export function getPopulationDataByYear(cities) {
  // Extract the unique years from all the populationCounts arrays
  const uniqueYears = Array.from(new Set(cities.reduce((acc, city) => {
    city.populationCounts.forEach(count => acc.push(count.year));
    return acc;
  }, [])));

  // Create an array of objects, with the year as the key, and an array of population values as the value
  return uniqueYears.reduce((acc, year) => {
    acc[year] = cities.map(city => {
      const populationCount = city.populationCounts.find(count => count.year === year);
      return populationCount ? populationCount.value : 0;
    });
    return acc;
  }, {});
}

export function getLastPopUpdate(cities) {
  let arrRes = [];
  let selected = localStorage.getItem("clickedCountry");
  cities.forEach(city => {
    if (city.country === selected) {
      arrRes.push(city.populationCounts[0].value);
    }

  })
  return arrRes
}