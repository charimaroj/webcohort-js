const mainHeaderEle = document.getElementById("mainHeading");
const btns = document.querySelector(".color-buttons");

btns.addEventListener("click", function (e) {
  let textColor = e.target.innerText.toLowerCase();
  console.log(typeof textColor);
  switch (textColor) {
    case "red":
      mainHeaderEle.style.color = "#e74c3c";
      break;
    case "green":
      mainHeaderEle.style.color = "#2ecc71";
      break;
    case "blue":
      mainHeaderEle.style.color = "#3498db";
      break;
    case "purple":
      mainHeaderEle.style.color = "#9b59b6";
      break;
    default:
      mainHeaderEle.style.color = "#000000";
      break;
  }
});
