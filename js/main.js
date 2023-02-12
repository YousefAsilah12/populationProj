import { getCountries } from "./getData.js";
export const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
export const continints=document.querySelector(".continints");

 buildButtons(regions)
const buttons=document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    localStorage.setItem("clickedContinint",e.target.value);
     await getCountriesasync(localStorage.getItem("clickedContinint"));
    console.log("after");
    window.location.href = "countries.html"
  })
});

export async function buildButtons(arr){
  arr.forEach(element => {
    const button=document.createElement("button");
    button.classList.add("btn");
    // button.classList.add("btn-continints");
    button.value=element;
    button.innerText=element;
    continints.appendChild(button);
  });
}

export async function getCountriesasync(r){
  try {
    
      let c=await getCountries(r);
      console.log(` countries of ${r}: `,c);
      localStorage.setItem(r,JSON.stringify(c));
  } catch (error) {
    console.log(error);
  }
}
