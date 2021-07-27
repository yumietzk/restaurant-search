import icons from '../../img/sprite.svg';

class BookmarksView {
  _parentEl = document.querySelector('.bookmarks__restaurant');
  _message =
    'No bookmarks yet. Find your favourite restaurant and bookmark it!';
  _data;

  addHandlerBookmarks(handler) {
    document.querySelector('.bookmark').addEventListener('click', function (e) {
      if (!e.target.closest('.bookmark-icon')) return;
      handler();
    });
  }

  addHandlerBookmarksRestaurant(handler) {
    window.addEventListener('hashchange', function () {
      const id = window.location.hash;

      if (!id.slice(1)) return;
      handler();
    });
  }

  updateBookmarkIcon() {
    document.querySelector('.bookmark-icon').classList.toggle('clicked');
  }

  renderBookmarksLayout() {
    this._parentEl.closest('.bookmarks').classList.toggle('active');
  }

  renderMessage() {
    const markup = this.generateMessage();

    const clicked = document
      .querySelector('.bookmark-icon')
      .classList.contains('clicked');

    if (clicked) {
      this._parentEl.innerHTML = '';
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    } else {
      this._parentEl.innerHTML = '';
    }
  }

  generateMessage(message = this._message) {
    return `
        <div class="message">
          <div>
            <svg class="message-icon">
              <use xlink:href="${icons}#icon-emoji-happy"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
  }

  renderBookmarks(data) {
    this._data = data;
    const markup = this._data
      .map((bookmark) => this.generateMarkup(bookmark))
      .join('');

    const clicked = document
      .querySelector('.bookmark-icon')
      .classList.contains('clicked');

    if (clicked) {
      this._parentEl.innerHTML = '';
      this._parentEl.insertAdjacentHTML('afterbegin', markup);
    } else {
      this._parentEl.innerHTML = '';
    }
  }

  generateMarkup(data) {
    return `
        <li class="bookmarks__list">
          <a href="#${data.id}" class="bookmarks__link">
            <figure class="bookmarks__hero">
              <img
                src="${data.image}"
                alt="bookmark restaurant"
                class="bookmarks__img"
              />
            </figure>
            <div class="bookmarks__name">
              <p>${data.name}</p>
            </div>
          </a>
        </li>
      `;
  }
}

export default new BookmarksView();
