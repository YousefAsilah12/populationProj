import { getCountries } from "./getData.js";
export const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
export const continints=document.querySelector(".continints");
debugger
buildButtons(regions)
const buttons=document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    debugger;
    localStorage.setItem("clickedContinint",e.target.value);
    const val=getCountriesasync(e.target.value);
    localStorage.setItem(localStorage.getItem("clickedContinint").toString(),JSON.stringify(val));
    window.location.href = "countries.html"
  })
});

export async function buildButtons(arr){
  arr.forEach(element => {
    const button=document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-continints");
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
