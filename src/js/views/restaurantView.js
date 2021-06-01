import icons from '../../img/sprite.svg';

class RestaurantView {
  _parentEl = document.querySelector('.restaurant-detail');
  _data;

  addHandlerRestaurant(handler) {
    window.addEventListener('hashchange', function () {
      const id = window.location.hash;
      // console.log(id);
      console.log(id.slice(1));
      handler();
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentEl.addEventListener('click', function (e) {
      if (!e.target.closest('.bookmark-icon')) return;
      handler();
    });
  }

  renderBookmark() {
    e.target.style.fill = 'var(--color-gray-dark-1)';
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
    // Render the map based on the tiles <- This happens after choosing a restaurant.

    const coords = [lat, long];
    const map = L.map('map').setView(coords, 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoieXQyOSIsImEiOiJja3A3MGF1OHkwdjcxMzV0OGp0Y2lxcDVlIn0.ReMJFHd2iJAVf_4YarMAIQ',
      }
    ).addTo(map);

    // Add marker
    let marker = L.marker(coords).addTo(map);
    marker.bindPopup('Here!').openPopup();
  }

  renderDetail(data) {
    this._data = data; // state
    const markup = this.generateMarkup(this._data);

    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup(data) {
    return `
        <figure class="detail__fig">
          <img
            src="${data.restaurant.image}"
            alt="restaurant"
            class="detail__img"
          />
        </figure>
        <div class="detail__title">
          <h3 class="name">${data.restaurant.name}</h3>
          <button class="bookmark">
              <svg class="bookmark-icon">
                <use xlink:href="${icons}#icon-bookmark"></use>
              </svg>
            </button>
          <div class="category">${data.restaurant.category}</div>
        </div>
        <div class="detail__address">
          <svg class="address-icon">
            <use xlink:href="${icons}#icon-location-pin"></use>
          </svg>
          <span>${data.restaurant.address}</span>
        </div>
        <div class="detail__openingHour">
          <svg class="openingHour-icon">
            <use xlink:href="${icons}#icon-clock"></use>
          </svg>
          <span>${data.restaurant.openingHours.join(' ~ ')}</span>
        </div>
        <div class="detail__phone">
          <svg class="phone-icon">
            <use xlink:href="${icons}#icon-phone"></use>
          </svg>
          <span>${data.restaurant.phone}</span>
        </div>
        <div class="detail__rating">
          <svg class="rating-icon">
            <use xlink:href="${icons}#icon-star"></use>
          </svg>
          <span>${data.restaurant.rating}</span>
        </div>
        <div class="detail__review">
          <div class="user-review">
            ${data.review.text}
          </div>
          <div class="user">
            <img
              src="${data.review.image}"
              alt="review user"
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

  addHandlerClose(handler) {
    document.querySelector('.detail__btn').addEventListener('click', handler);
  }
}

export default new RestaurantView();
