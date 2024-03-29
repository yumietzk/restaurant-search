import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import restaurantView from './views/restaurantView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlSearchResults = async function () {
  try {
    resultsView.hideMessage();

    resultsView.renderSpinner();

    // Get user's position
    await model.getCurrentPosition();

    // Get search term
    const query = searchView.getQuery();
    if (!query) return resultsView.renderError();

    // Search by the query
    await model.loadSearchResults(query);
    if (!model.state.search.businesses[0]) return resultsView.renderError();

    // Get data by page
    const data = model.getResultsPerPage();
    // Calculate number of pages
    model.getAllPage();

    // Render search results by page
    resultsView.renderResults(data);

    // Render pagination on page
    paginationView.render(model.state.search.page, model.state.search.allPage);

    resultsView.renderPageBottom(
      model.state.search.page,
      model.state.search.allPage
    );
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  const data = model.getResultsPerPage(goToPage);
  resultsView.renderResults(data);

  paginationView.render(goToPage, model.state.search.allPage);

  resultsView.renderPageBottom(
    model.state.search.page,
    model.state.search.allPage
  );
};

const controlRestaurant = async function () {
  try {
    resultsView.renderSpinner();

    // Get a restaurant id
    const id = window.location.hash.slice(1);

    // Search by the restaurant id
    await model.loadRestaurant(id);

    // Search review by the restaurant id
    await model.loadReview(id);

    restaurantView.removeHiddenClass();

    // Render the restaurant detail
    restaurantView.renderDetail(model.state.restaurant);

    model.state.bookmarks.forEach((b) => {
      if (b.id === model.state.restaurant.id)
        model.state.restaurant.bookmarked = true;
    });

    if (model.state.restaurant.bookmarked) restaurantView.renderBookmarked();

    // Render the restaurant place on map
    restaurantView.renderMap(
      model.state.restaurant.lat,
      model.state.restaurant.long
    );
  } catch (err) {
    console.error(err);
    resultsView.renderError(err);
  }
};

const controlBackPage = function () {
  window.history.back(-1);
  resultsView.addMessage();
};

const controlCloseDetail = async function () {
  try {
    restaurantView.addHiddenClass();

    if (!model.state.search.businesses[0]) {
      resultsView.addMessage();
    } else {
      resultsView.renderSpinner();

      // Get data by page
      const data = model.getResultsPerPage(model.state.search.page);

      // Render search results by page
      resultsView.renderResults(data);

      paginationView.render(
        model.state.search.page,
        model.state.search.allPage
      );

      resultsView.renderPageBottom(
        model.state.search.page,
        model.state.search.allPage
      );
    }
  } catch (err) {
    console.error(err);
  }
};

const controlAddBookmarks = function () {
  if (!model.state.restaurant.bookmarked) {
    model.addBookmarks(model.state.restaurant);
  } else {
    model.deleteBookmarks(model.state.restaurant);
  }

  restaurantView.renderBookmarked();
};

const controlBookmarks = function () {
  bookmarksView.updateBookmarkIcon();

  bookmarksView.renderBookmarksLayout();

  if (!model.state.bookmarks[0]) {
    bookmarksView.renderMessage();
  } else {
    bookmarksView.renderBookmarks(model.state.bookmarks);
  }
};

const controlBookmarksRestaurant = function () {
  const id = window.location.hash.slice(1);
  const restaurant = model.state.bookmarks.find((b) => b.id === id);

  if (!restaurant) return;

  restaurantView.removeHiddenClass();

  restaurantView.renderDetail(restaurant);

  if (restaurant.bookmarked) restaurantView.renderBookmarked();

  restaurantView.renderMap(restaurant.lat, restaurant.long);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  resultsView.addHandlerBack(controlBackPage);
  restaurantView.addHandlerRestaurant(controlRestaurant);
  restaurantView.addHandlerClose(controlCloseDetail);
  restaurantView.addHandlerAddBookmarks(controlAddBookmarks);
  bookmarksView.addHandlerBookmarks(controlBookmarks);
  bookmarksView.addHandlerBookmarksRestaurant(controlBookmarksRestaurant);
};
init();
