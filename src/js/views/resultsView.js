import icons from '../../img/sprite.svg';

class ResultsView {
  _parentEl = document.querySelector('.search-results');
  _errorMessage = 'Please search again!';
  _data;

  updateBookmarkChecked(id) {}

  renderResults(data) {
    // document.querySelector('.search-message').classList.add('hidden');

    // data = state.search.businesses = [{...}, ]
    this._data = data;
    // console.log(this._data);
    const markup = this._data
      .map((business) => this.generateMarkup(business))
      .join('');

    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup(data) {
    return `
      <li class="restaurant">
        <a href="#${data.id}" class="restaurant__link">
          <figure class="restaurant__hero">
            <img
              src="${data.image}"
              alt="Restaurant Image"
              class="restaurant__img"
            />
          </figure>
          <div class="restaurant__description">
            <div class="restaurant__name">${data.name}</div>
            <div class="restaurant__place">
              <svg class="place-icon">
                <use
                  xlink:href="${icons}#icon-location-pin"
                ></use>
              </svg>
              <span>${data.location}</span>
            </div>
            <div class="restaurant__rating">
              <svg class="rating-icon">
                <use xlink:href="${icons}#icon-star"></use>
              </svg>
              <span>${data.rating}</span>
            </div>
          </div>
        </a>
      </li>
    `;
  }

  renderPageBottom(page, allPage) {
    const markup = this.generatePageMarkup(page, allPage);

    this._parentEl.nextElementSibling.innerHTML = '';
    this._parentEl.nextElementSibling.insertAdjacentHTML('afterbegin', markup);
    // document.querySelector('.page').innerHTML = '';
    // document.querySelector('.page').insertAdjacentHTML('afterbegin', markup);
  }

  generatePageMarkup(page, allPage) {
    return `
      <span class="num-1">${page}</span>
      &#8260;
      <span class="num-2">${allPage}</span>
    `;
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg class="spinner-icon">
            <use xlink:href="${icons}#icon-spinner3"></use>
          </svg>
        </div>
      `;

    this._parentEl.innerHTML = '';
    document.querySelector('.page').innerHTML = '';
    document.querySelector('.pagination').innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="errmessage">
          <div>
            <svg class="error-icon">
              <use xlink:href="${icons}#icon-warning"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._parentEl.innerHTML = '';
    document.querySelector('.pagination').innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  hideMessage() {
    const target = this._parentEl.querySelector('.message');
    // console.log(target);
    if (!target) return;

    target.classList.add('hidden');
  }

  addMessage() {
    // const target = this._parentEl.querySelector('.message');
    // console.log(target); // null
    // // if (!target) return;

    // target.classList.remove('hidden');

    const markup = this.generateMessage();
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  generateMessage() {
    return `
        <div class="message">
          <div>
            <svg class="message-icon">
              <use xlink:href="${icons}#icon-spoon-knife"></use>
            </svg>
          </div>
          <p>
            Search what you want to eat, and find out your favourite
            restaurant near you!
          </p>
        </div>
      `;
  }
}

export default new ResultsView();
