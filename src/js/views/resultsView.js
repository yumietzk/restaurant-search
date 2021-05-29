import icons from '../../img/sprite.svg';

class ResultsView {
  _parentEl = document.querySelector('.search-results');
  _data;

  renderResults() {
    this._parentEl.innerHTML = '';

    // data = state.search.businesses = [{...}, ]
    this._data = data;
    const markup = this._data.map((business) => this.generateMarkup()).join('');
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup() {
    return `
      <li class="restaurant">
        <a href="#" class="restaurant__link">
          <figure class="restaurant__hero">
            <img
              src=${this._data.imageURL}
              alt=""
              class="restaurant__img"
            />
          </figure>
          <div class="restaurant__description">
            <div class="restaurant__name">${this._data.name}</div>
            <div class="restaurant__place">
              <svg class="place-icon">
                <use
                  xlink:href="${icons}#icon-location-pin"
                ></use>
              </svg>
              <span>${this._data.location}</span>
            </div>
            <div class="restaurant__rating">
              <svg class="rating-icon">
                <use xlink:href="${icons}#icon-star"></use>
              </svg>
              <span>${this._data.rating}</span>
            </div>
          </div>
          <div class="restaurant__bookmark">
            <svg class="bookmark-icon">
              <use xlink:href="${icons}#icon-bookmark"></use>
            </svg>
          </div>
        </a>
      </li>
    `;
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg class="spinner-icon">
            <use xlink:href="./src/img/sprite.svg#icon-spinner3"></use>
          </svg>
        </div>
      `;

    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new ResultsView();
