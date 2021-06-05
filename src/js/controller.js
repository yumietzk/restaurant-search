import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import restaurantView from './views/restaurantView.js';
import bookmarksView from './views/bookmarksView.js';
import { clearLine } from 'readline';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

/////////////////////////////////////////////
// Render search results

const controlSearchResults = async function () {
  try {
    // Hide message
    resultsView.hideMessage();

    // 0) Render spinner
    resultsView.renderSpinner();

    // 0) Get geolocation
    await model.getCurrentPosition();
    // console.log(model.state.search.lat, model.state.search.long);

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return resultsView.renderError();

    // 2) Load search results
    await model.loadSearchResults(query);
    if (!model.state.search.businesses[0]) return resultsView.renderError();

    // 3) Culculate search results per page
    const data = model.getResultsPerPage();
    model.getAllPage();

    // 4) Render search results
    resultsView.renderResults(data);

    // 5) Render pagination btn
    paginationView.render(model.state.search.page, model.state.search.allPage);

    // 6) Render page bottom
    resultsView.renderPageBottom(
      model.state.search.page,
      model.state.search.allPage
    );
  } catch (err) {
    resultsView.renderError();
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // Render next/previous page
  const data = model.getResultsPerPage(goToPage);
  resultsView.renderResults(data);

  // Render pagination btn
  paginationView.render(goToPage, model.state.search.allPage);

  // Render page bottom
  resultsView.renderPageBottom(
    model.state.search.page,
    model.state.search.allPage
  );
};

// Render restaurant detail
const controlRestaurant = async function () {
  try {
    // 0) Render spinner
    resultsView.renderSpinner();

    // 0) Get restaurant ID
    const id = window.location.hash.slice(1);
    // console.log(id);

    // Consider when reloading page, remove hash from URL etc.

    // 1) Load restaurant
    // Load restaurant
    await model.loadRestaurant(id);

    // Load review
    await model.loadReview(id);

    // Load map <- It already was loaded.

    // 2) Render restaurant detail
    // Remove hidden class
    restaurantView.removeHiddenClass();

    // Render detail and review
    // Can use Internationalization API here to fix date depending on locale
    // console.log(model.state.restaurant);
    restaurantView.renderDetail(model.state.restaurant);

    // Maintain bookmarks
    model.state.bookmarks.forEach((b) => {
      if (b.id === model.state.restaurant.id)
        model.state.restaurant.bookmarked = true;
    });

    // Update bookmark icon
    // console.log(model.state.restaurant);
    // console.log(model.state.restaurant.bookmarked);
    // console.log(model.state.bookmarks);
    if (model.state.restaurant.bookmarked) restaurantView.renderBookmarked();

    // Render map
    restaurantView.renderMap(
      model.state.restaurant.lat,
      model.state.restaurant.long
    );
  } catch (err) {
    console.error(err);
  }
};

// Close detail modal
const controlCloseDetail = async function () {
  try {
    // Hide the detail
    restaurantView.addHiddenClass();

    // // 2) Load search results
    // await model.loadSearchResults(model.state.search.query);

    // console.log(model.state.search.businesses[0]);
    if (!model.state.search.businesses[0]) {
      resultsView.addMessage();
    } else {
      // 0) Render spinner
      resultsView.renderSpinner();

      // 3) Culculate search results per page
      const data = model.getResultsPerPage(model.state.search.page);

      // 4) Render search results
      resultsView.renderResults(data);

      // 5) Render pagination btn
      paginationView.render(
        model.state.search.page,
        model.state.search.allPage
      );

      // 6) Render page bottom
      resultsView.renderPageBottom(
        model.state.search.page,
        model.state.search.allPage
      );

      // console.log(model.state.bookmarks);
    }
  } catch (err) {
    console.error(err);
  }
};

// Add bookmarks
const controlAddBookmarks = function () {
  // 1) Add/Delete bookmarks
  if (!model.state.restaurant.bookmarked) {
    model.addBookmarks(model.state.restaurant);
  } else {
    model.deleteBookmarks(model.state.restaurant);
  }

  // 2) Update bookmark icon on detail
  restaurantView.renderBookmarked();
  // console.log(model.state.bookmarks);
  // console.log(model.state.restaurant);

  // Update bookmark icon on search results -> Difficult to implement.. maybe later or not..
  // resultsView.updateBookmarkChecked(model.state.restaurant.id);

  // 3) Update bookmark in the header
  // model.init();
};

// Render bookmarks
const controlBookmarks = function () {
  // console.log(model.state.bookmarks);

  // Update bookmark icon in the header
  bookmarksView.updateBookmarkIcon();

  // Render bookmark
  bookmarksView.renderBookmarksLayout();

  if (!model.state.bookmarks[0]) {
    bookmarksView.renderMessage();
  } else {
    bookmarksView.renderBookmarks(model.state.bookmarks);
  }
};

const controlBookmarksRestaurant = function () {
  // 1) Render restaurant detail
  const id = window.location.hash.slice(1);
  const restaurant = model.state.bookmarks.find((b) => b.id === id); // {}
  // console.log(id);
  // console.log(model.state.bookmarks);
  // console.log(restaurant);
  if (!restaurant) return;

  // Remove hidden class
  restaurantView.removeHiddenClass();

  // Render detail and review
  // Can use Internationalization API here to fix date depending on locale
  restaurantView.renderDetail(restaurant);

  // Maintain bookmarks
  // model.state.bookmarks.forEach((b) => {
  //   if (b.id === model.state.restaurant.id)
  //     model.state.restaurant.bookmarked = true;
  // });

  // Update bookmark icon
  if (restaurant.bookmarked) restaurantView.renderBookmarked();

  // 2) Render map
  // console.log(restaurant.lat, restaurant.long);
  restaurantView.renderMap(restaurant.lat, restaurant.long);
};

// When load event happens, everything is refreshed.

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  restaurantView.addHandlerRestaurant(controlRestaurant);
  restaurantView.addHandlerClose(controlCloseDetail);
  restaurantView.addHandlerAddBookmarks(controlAddBookmarks);
  bookmarksView.addHandlerBookmarks(controlBookmarks);
  bookmarksView.addHandlerBookmarksRestaurant(controlBookmarksRestaurant);
};
init();
