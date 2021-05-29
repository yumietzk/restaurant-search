import * as model from './model.js';
import icons from '../img/sprite.svg';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
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
    // // 0) Render spinner
    // resultsView.renderSpinner();

    // 0) Get geolocation
    model.getCurrentPosition();
    console.log(model.state.search.lat, model.state.search.long);

    // 1) Get search query
    const query = searchView.getQuery();
    console.log(query);

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render search results
    resultsView.renderResults();

    // 4) Render pagination
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
};
init();

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// Build Promise
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

// Consume Promise
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
