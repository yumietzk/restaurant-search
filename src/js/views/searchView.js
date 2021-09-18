class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    let query = this._parentEl.querySelector('.search__input').value;
    this.clearInput();

    if (query.trim().length === 0) {
      query = null;
    }

    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  clearInput() {
    this._parentEl.querySelector('.search__input').value = '';
    this._parentEl.querySelector('.search__input').blur();
  }
}

export default new SearchView();
