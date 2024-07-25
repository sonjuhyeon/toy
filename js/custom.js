// create button element
const btnsChars = ["all", "bag", "shoe", "watch", "camera", "headphone"];
const filter_btns = document.querySelector(".filter-btns");

btnsChars.map((btnsChar) => {
  const modifiedChar = btnsChar.charAt(0).toUpperCase() + btnsChar.slice(1);

  const btn_element = `
    <button class="filter-btn" data-filter="${btnsChar}">${modifiedChar}</button>
  `;
  filter_btns.insertAdjacentHTML("beforeend", btn_element);
});

// first button add active class
const btns = document.querySelectorAll(".filter-btn");
btns[0].classList.add("active");

// create images element
const imgs = [
  "bag-1.jpg",
  "camera-1.jpg",
  "camera-2.jpg",
  "headphone-1.jpg",
  "headphone-2.jpg",
  "shoe-1.jpg",
  "shoe-2.jpg",
  "watch-1.jpg",
];

const imagesWrapper = document.querySelector(".filter-images");

imgs.map((v) => {
  const img = v.split("-")[0];
  const img_element = `
    <div class="filter-image" data-filter="${img}">
      <span><img src="images/${v}" alt="" /></span>
    </div>
  `;
  imagesWrapper.insertAdjacentHTML("beforeend", img_element);
});

// create filter image

const imageElements = document.querySelectorAll(".filter-image");

function activateFilter() {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  this.classList.add("active");
  const selectedBtn = this.getAttribute("data-filter");

  //map, filter, reduce 함수는 DOM요소에 사용할 수 없어 Arry.from()을 사용하여 배열로 변환
  Array.from(imageElements).filter((imageElement) => {
    imageElement.classList.add("hide");
    //imageElement.classList.remove("show");

    // 시간지연함수
    setTimeout(() => {
      if (
        imageElement.getAttribute("data-filter") === selectedBtn ||
        selectedBtn === "all"
      ) {
        imageElement.classList.remove("hide");
        imageElement.classList.add("show");
      } else {
        imageElement.classList.remove("show");
        imageElement.classList.add("hide");
      }
    }, 100); // 1st parameter: callback function, 2nd prameter: ms
  });
}

btns.forEach(function (btn) {
  btn.addEventListener("click", activateFilter);
});

// activate light box when click each image
const showLightBox = (e) => {
  const target = e.currentTarget;
  const selectedImage = target.children[0].children[0].getAttribute("src");
  const categoryName = target.getAttribute("data-filter");

  const lightBoxImage = document.querySelector(".light-box-image img");
  const categoryElement = document.querySelector(".light-box-text .title p");
  // getAttribute(): 파라미터 속성 값 가져오기
  // setAttribute(a, b): a: 속성 이름, b: 변경할 속성 값
  // a.textContent = b: a 요소에 b 텍스트 입력
  lightBoxImage.setAttribute("src", selectedImage);
  categoryElement.textContent = categoryName;
};

imageElements.forEach((imageElement) => {
  imageElement.addEventListener("click", showLightBox);
});
