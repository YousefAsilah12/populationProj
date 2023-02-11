function showLoadingOverlay() {
  document.getElementById("loading-overlay").style.display = "flex";
}

function hideLoadingOverlay() {
  document.getElementById("loading-overlay").style.display = "none";
}

// Show the loading overlay when a button is clicked
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    showLoadingOverlay();
    setTimeout(() => {
      hideLoadingOverlay();
    }, 1000);
  });
});
