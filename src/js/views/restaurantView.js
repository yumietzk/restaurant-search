import icons from '../../img/sprite.svg';

require('dotenv').config();

const accessToken = process.env.ACCESS_TOKEN;

class RestaurantView {
  _parentEl = document.querySelector('.restaurant-detail');
  _data;
  map;

  addHandlerRestaurant(handler) {
    window.addEventListener('hashchange', function () {
      const id = window.location.hash;

      if (!id.slice(1)) return;
      handler();
    });
  }

  addHandlerAddBookmarks(handler) {
    this._parentEl.addEventListener('click', function (e) {
      if (!e.target.closest('.detail__bookmark-icon')) return;
      handler();
    });
  }

  addHandlerClose(handler) {
    document
      .querySelector('.detail__btn')
      .addEventListener('click', function () {
        handler();
      });
  }

  renderBookmarked() {
    this._parentEl
      .querySelector('.detail__bookmark-icon')
      .classList.toggle('bookmarked');
  }

  removeHiddenClass() {
    const detail = document.querySelector('.restaurant-details');
    const overlay = document.querySelector('.overlay');
    [detail, overlay].forEach((el) => el.classList.remove('hidden'));
  }

  addHiddenClass() {
    const detail = document.querySelector('.restaurant-details');
    const overlay = document.querySelector('.overlay');
    [detail, overlay].forEach((el) => el.classList.add('hidden'));
  }

  renderMap(lat, long) {
    if (this.map) this.map.remove();

    const coords = [lat, long];
    this.map = L.map('map').setView(coords, 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken,
      }
    ).addTo(this.map);

    let marker = L.marker(coords).addTo(this.map);
    marker.bindPopup('Here!').openPopup();
  }

  renderDetail(data) {
    this._data = data;
    const markup = this.generateMarkup(this._data);

    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup(data) {
    return `
        <figure class="detail__fig">
          <img
            src="${data.image}"
            alt="Restaurant Image"
            class="detail__img"
          />
        </figure>
        <div class="detail__title">
          <h3 class="name">${data.name}</h3>
          <button class="detail__bookmark">
              <svg class="detail__bookmark-icon">
                <use xlink:href="${icons}#icon-bookmark"></use>
              </svg>
            </button>
          <div class="category">${data.category}</div>
        </div>
        <div class="detail__address">
          <svg class="address-icon">
            <use xlink:href="${icons}#icon-location-pin"></use>
          </svg>
          <span>${data.address}</span>
        </div>
        <div class="detail__openingHour">
          <svg class="openingHour-icon">
            <use xlink:href="${icons}#icon-clock"></use>
          </svg>
          <span>${
            data.openingHours ? data.openingHours.join(' ~ ') : '-'
          }</span>
        </div>
        <div class="detail__phone">
          <svg class="phone-icon">
            <use xlink:href="${icons}#icon-phone"></use>
          </svg>
          <span>${data.phone}</span>
        </div>
        <div class="detail__rating">
          <svg class="rating-icon">
            <use xlink:href="${icons}#icon-star"></use>
          </svg>
          <span>${data.rating}</span>
        </div>
        <div class="detail__review">
          <div class="user-review">
            ${data.review.text}
          </div>
          <div class="user">
            <img
              src="${data.review.image}"
              alt="User image"
              class="user-img"
            />
            <div class="user-detail">
              <div class="user-name">${data.review.name}</div>
              <div class="user-date">${data.review.date.replaceAll(
                '-',
                '/'
              )}</div>
            </div>
          </div> 
        </div>
      `;
  }
}

export default new RestaurantView();
