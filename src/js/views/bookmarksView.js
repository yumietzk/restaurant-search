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
    // this._parentEl.addEventListener('click', function (e) {
    //   if (!e.target.closest('.bookmarks__link')) return;

    //   handler();
    // });

    window.addEventListener('hashchange', function () {
      const id = window.location.hash;
      // console.log(id);
      // console.log(id.slice(1));

      // To avoid when clicked a close button on detail
      if (!id.slice(1)) return;
      handler();
    });
  }

  updateBookmarkIcon() {
    // console.log(
    //   document.querySelector('.bookmark-icon').classList.contains('clicked')
    // );
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

    // console.log(clicked);

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
    this._data = data; // bookmarks[ ]
    const markup = this._data
      .map((bookmark) => this.generateMarkup(bookmark))
      .join('');

    const clicked = document
      .querySelector('.bookmark-icon')
      .classList.contains('clicked');

    // console.log(clicked);

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
