// 하단 디테일 박스 숨김 및 보임 기능
const detailGuide = document.querySelector(".guide");
const guideIcon = document.querySelector(".guide i");
const detailBox = document.querySelector(".detail_box");
const detailHeight = detailBox.offsetHeight;

detailBox.style.bottom = -detailHeight + "px";
// detailBox.style.bottom = 0;

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

// console.log(data);
const currentData = data.records.filter(
  (item) =>
    item.데이터기준일자.split("-")[0] >= "2023" &&
    item.데이터기준일자.split("-")[1] >= "10" &&
    item.위도 !== ""
);

// console.log(currentData);

// 네이버 맵 적용
navigator.geolocation.getCurrentPosition((position) => {
  // console.log(position)
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  // console.log(lat, lng);

  startLenderMap(lat, lng);
});

function startLenderMap(lat, lng) {
  var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(lat, lng),
    zoom: 13,
  });

  var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map: map,
  });

  currentData.forEach((item) => {
    let latlng = new naver.maps.LatLng(item.위도, item.경도);
    let bounds = map.getBounds();

    if (bounds.hasLatLng(latlng)) {
      // 현재 위치를 기준으로 화면 사에에 있는지 확인. 화면 내부의 마커만 생성
      var marker = new naver.maps.Marker({
        position: latlng,
        map: map,

        title: item.도서관명,
        itemCount: item["자료수(도서)"],
        serialItemCount: item["자료수(연속간행물)"],
        notBookItemCount: item["자료수(비도서)"],
        sitCount: item.열람좌석수,
        wdStart: item.평일운영시작시각,
        wdEnd: item.평일운영종료시각,
        wkStart: item.토요일운영시작시각,
        wkEnd: item.토요일운영종료시각,
        contact: item.도서관전화번호,
        address: item.소재지도로명주소,
        homePage: item.홈페이지주소,
      });

      let infoWindow = new naver.maps.InfoWindow({
        content: `
          <h4 style="padding:0.25rem 0.5rem; font-size:12px; font-weight:500; color:#555">${item.도서관명}</h4>
        `,
      });

      naver.maps.Event.addListener(marker, "click", function () {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }

        const markerInfoData = {
          title: marker.title,
          itemCount: marker.itemCount,
          serialItemCount: marker.serialItemCount,
          notBookItemCount: marker.notBookItemCount,
          sitCount: marker.sitCount,
          wdStart: marker.wdStart,
          wdEnd: marker.wdEnd,
          wkStart: marker.wkStart,
          wkEnd: marker.wkEnd,
          contact: marker.contact,
          address: marker.address,
          homePage: marker.homePage,
        };

        getInfoOnMarker(markerInfoData);
      });
    }
  });

  function getInfoOnMarker(markerInfoData) {
    // console.log(markerInfoData);

    const infoWrapper = document.querySelector(".detail_wrapper");
    detailBox.style.bottom = 0;
    detailGuide.classList.add("active");
    guideIcon.setAttribute("class", "ri-arrow-drop-down-line");
    infoWrapper.innerHTML = "";

    const {
      title,
      itemCount,
      serialItemCount,
      notBookItemCount,
      sitCount,
      wdStart,
      wdEnd,
      wkStart,
      wkEnd,
      contact,
      address,
      homePage,
    } = markerInfoData; // 구조분해 할당

    const infoElmt = `
      <div class="detail_title">
          <h2>${title}</h2>
        </div>
        <div class="detail_info">
          <div class="info_1">
            <h3>도서</h3>
            <h3>${itemCount}</h3>
          </div>
          <div class="info_2">
            <h3>연속간행물</h3>
            <h3>${serialItemCount}</h3>
          </div>
          <div class="info_3">
            <h3>비도서</h3>
            <h3>${notBookItemCount}</h3>
          </div>
          <div class="info_4">
            <h3>열람좌석수</h3>
            <h3>${sitCount}</h3>
          </div>
        </div>
        <div class="detail_text">
          <div class="time">
            <div class="time_title">운영시간</div>
            <div class="time_contents">
              <p class="week_day">${wdStart} ~ ${wdEnd}(평일)</p>
              <p class="week_end">${wkStart} ~ ${wkEnd}(주말)</p>
              <p class="holly_day">공휴일 휴관</p>
            </div>
          </div>
          <div class="tell">
            <div class="tell_title">연락처</div>
            <div class="tell_contents">
              <p>${contact}</p>
            </div>
          </div>
          <div class="addr">
            <div class="addr_title">주소</div>
            <div class="addr_contents">
              <p>${address}</p>
            </div>
          </div>
          <div class="homepage">
            <div class="homepage_title">홈페이지</div>
            <div class="homepage_contents">
              <p><a href="${homePage}">${homePage}</a></p>
            </div>
          </div>
        </div>
    `;
    infoWrapper.insertAdjacentHTML("beforeend", infoElmt);
  }
}
