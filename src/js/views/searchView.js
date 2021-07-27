class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__input').value;
    this.clearInput();

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
