import icons from '../../img/sprite.svg';

class PaginationView {
  _parentEl = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination-btn');
      if (!btn) return;

      const goToPage = +btn.dataset.btn;

      handler(goToPage);
    });
  }

  render(page, allPage) {
    const markup = this.generateMarkup(page, allPage);
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  generateMarkup(page, allPage) {
    if (page === 1) {
      return `
          <button class="pagination-btn pagination-btn__next" data-btn="${
            page + 1
          }">
            <svg class="pagination-icon">
              <use
                xlink:href="${icons}#icon-chevron-thin-right"
              ></use>
            </svg>
          </button>
        `;
    }

    if (page === allPage) {
      return `
          <button class="pagination-btn pagination-btn__front" data-btn="${
            page - 1
          }">
            <svg class="pagination-icon">
              <use
                xlink:href="${icons}#icon-chevron-thin-left"
              ></use>
            </svg>
          </button>
        `;
    }

    if (page < allPage) {
      return `
          <button class="pagination-btn pagination-btn__front" data-btn="${
            page - 1
          }">
            <svg class="pagination-icon">
              <use xlink:href="${icons}#icon-chevron-thin-left"></use>
            </svg>
          </button>
          <button class="pagination-btn pagination-btn__next" data-btn="${
            page + 1
          }">
            <svg class="pagination-icon">
              <use
                xlink:href="${icons}#icon-chevron-thin-right"
              ></use>
            </svg>
          </button>
        `;
    }

    return '';
  }
}

export default new PaginationView();
