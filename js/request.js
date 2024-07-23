const sliderWrapper = document.querySelector(".swiper-wrapper");

const getData = async () => {
  await fetch(
    "https://www.dabipyeung.com/soaply_backend/model/get_products.php?qnt=4"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      let dataElement;

      data.map((item) => {
        // console.log(item.pro_img);
        dataElement = `
        <div class="swiper-slide">
          <div class="slider-image">
            <img src="images/${item.pro_img}" alt="slider 1" />
          </div>
          <div class="slider-text">
            <h4>${item.pro_name}</h4>
            <p>${item.pro_desc}</p>
            <a href="#" class="common-btn">자세히 보기</a>
          </div>
        </div>
        `;
        sliderWrapper.insertAdjacentHTML("beforeend", dataElement);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

getData();

// const name = '김개똥';
// const age = 23;
// // const str = 'hello' + name + '님' + '나이는' + age + '세 입니다.';
// const str = `hello ${name}님 나이는 ${age}세 입니다.`; // template literal
// console.log(str);
