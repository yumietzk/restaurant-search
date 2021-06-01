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
    // 0) Render spinner
    resultsView.renderSpinner();

    // 0) Get geolocation
    await model.getCurrentPosition();
    console.log(model.state.search.lat, model.state.search.long);

    // 1) Get search query
    const query = searchView.getQuery();
    console.log(query);

    // 2) Load search results
    await model.loadSearchResults(query);

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
    restaurantView.renderDetail(model.state);

    // Render map
    restaurantView.renderMap(
      model.state.restaurant.lat,
      model.state.restaurant.long
    );

    // 3) Close modal
  } catch (err) {
    console.error(err);
  }
};

const controlCloseDetail = function () {
  restaurantView.addHiddenClass();
};

const controlAddBookmarks = function () {
  // 1) Add bookmarks
  model.addBookmarks(model.state.restaurant);

  // 2) Update bookmark icon

  // 3) Update bookmark in the header
};

const controlBookmarks = function () {};

// When load event happens, everything is refreshed.

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  restaurantView.addHandlerRestaurant(controlRestaurant);
  restaurantView.addHandlerClose(controlCloseDetail);
  // bookmarksView.addHandlerBookmarks(controlAddBookmarks);
  restaurantView.addHandlerAddBookmark(controlAddBookmarks);
};
init();

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////// Build Promise
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     if (navigator.geolocation) {
//       // navigator.geolocation.getCurrentPosition(
//       //   (position) => resolve(position),
//       //   (err) => reject(err)
//       // );
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     }
//   });
// };

////// Consume Promise
// const whereAmI = function () {
//   getPosition().then();
// }

// Render access to a restaurant

// // Reset localstorage
// reset() {
//   localStorage.removeItem('workouts');
// 	location.reload();
// };

// const getJSON = function (url, errorMsg = 'Somthing went wrong') {
//   return fetch(url).then((res) => {
//     if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

//     return res.json();
//   });
// };

// const getJSON = async function (url, errorMsg = 'Somthing went wrong') {
//   return await fetch(url).then((res) => {
//     if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

//     return res.json();
//   });
// };

// const getSearchResults = function () {
//   getJSON.then((data) => console.log(data)).catch((err) => renderError(err.message);
// };
