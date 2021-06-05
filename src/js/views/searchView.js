class SearchView {
  _parentEl = document.querySelector('.search');

  // Get query
  getQuery() {
    const query = this._parentEl.querySelector('.search__input').value;
    this.clearInput();

    return query;
  }

  // Submit event
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  // Clear input
  clearInput() {
    this._parentEl.querySelector('.search__input').value = '';
    // Remove focus from input
    this._parentEl.querySelector('.search__input').blur();
  }
}

export default new SearchView();
