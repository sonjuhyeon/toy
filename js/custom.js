// creat button element
const btns = ["all", "bag", "shoe", "watch", "camera", "headphone"];
const filter_btns = document.querySelector(".filter-btns");

btns.map((v) => {
  const modifiedChar = v.charAt(0).toUpperCase() + v.slice(1);

  const btn_element = `
    <button class="filter-btn" data-filter="${v}}">${modifiedChar}</button>
  `;
  filter_btns.insertAdjacentHTML("beforeend", btn_element);
});

// creat images element
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
