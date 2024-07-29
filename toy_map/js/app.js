// detail box up-down
const detailGuide = document.querySelector(".guide");
const guideIcon = document.querySelector(".guide i");
const detailBox = document.querySelector(".detail_box");
const detailHeight = detailBox.offsetHeight;

// detailBox.style.bottom = -detailHeight + "px";
detailBox.style.bottom = 0;

detailGuide.addEventListener("click", function () {
  this.classList.toggle("active");

  if (this.classList.contains("active")) {
    guideIcon.setAttribute("class", "ri-arrow-drop-down-line");
    detailBox.style.bottom = 0;
  } else {
    guideIcon.setAttribute("class", "ri-arrow-drop-up-line");
    detailBox.style.bottom = -detailHeight + "px";
  }
});
