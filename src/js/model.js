import { async } from 'regenerator-runtime'; // this was supposed to be created automatically by Parcel, but it wasn't, so I did.
import { AJAX } from './helper.js';
import { RESULTS_PAGE } from './config.js';
import { rest } from 'lodash';

require('dotenv').config();

const URL = process.env.URL;

export const state = {
  search: {
    query: '',
    businesses: [], // [{id: , name: , location: , rating: , image: }, {...}]
    // lat,
    // long,
    page: 1,
    resultsPerPage: RESULTS_PAGE, // 7
    // allPage
  },
  restaurant: {}, // {id, image, name, category, address, openingHours, phone, rating, lat, long, bookmarked, review: {text, image, name, date}}
  bookmarks: [],
};

export const getCurrentPosition = function () {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(latitude, longitude);

        state.search.lat = latitude;
        state.search.long = longitude;
        resolve(state.search.lat, state.search.long);
      }, reject);
    }
  });
};

export const loadSearchResults = async function (query, limit = 50) {
  try {
    state.search.query = query;

    // ''
    // console.log(typeof query);
    // console.log(query.split());

    const data = await AJAX(
      `${URL}search?term=${query}&latitude=${state.search.lat}&longitude=${state.search.long}&limit=${limit}`
    );
    // console.log(data.businesses);

    state.search.businesses = data.businesses.map((data) => {
      return {
        id: data.id,
        name: data.name,
        location: data.location.address1,
        rating: data.rating,
        image: data.image_url,
      };
    });
    // console.log(state.search.businesses);
  } catch (err) {
    console.error(`💥💥💥 ${err}`);
    throw err;
  }
};

const createOpeningHours = function (str) {
  if (str === '0000') str = '2400';
  str.padStart(4, '0');

  const arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str[i]);
  }

  arr.splice(2, 0, ' : ');
  return arr.join('');
};

const createRestaurantObject = function (data) {
  const hours = function () {
    if (data.hours)
      return [
        createOpeningHours(data.hours[0].open[0].start),
        createOpeningHours(data.hours[0].open[0].end),
      ];
    else return;
  };

  return {
    id: data.id,
    image: data.image_url,
    name: data.name,
    category: data.categories[0].title,
    address: data.location.address1,
    openingHours: hours(), // ["1100", "2000"]
    phone: data.display_phone,
    rating: data.rating,
    lat: data.coordinates.latitude,
    long: data.coordinates.longitude,
    bookmarked: false,
  };
};

export const loadRestaurant = async function (id) {
  try {
    const data = await AJAX(`${URL}${id}`);
    console.log(data);
    state.restaurant = createRestaurantObject(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createReviewObject = function (data) {
  return {
    text: data.text,
    image: data.user.image_url,
    name: data.user.name,
    date: data.time_created.split(' ').slice(0, 1).join(''),
  };
};

export const loadReview = async function (id) {
  try {
    const data = await AJAX(`${URL}${id}/reviews`);
    state.restaurant.review = createReviewObject(data.reviews[0]);
    // console.log(state.review);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getResultsPerPage = function (page = 1) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.businesses.slice(start, end);
};

export const getAllPage = function () {
  const rest = state.search.businesses.length % state.search.resultsPerPage;

  if (rest === 0)
    state.search.allPage =
      state.search.businesses.length / state.search.resultsPerPage;
  else
    state.search.allPage =
      Math.floor(state.search.businesses.length / state.search.resultsPerPage) +
      1;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmarks = function (data) {
  state.restaurant.bookmarked = true;
  state.bookmarks.push(data);
  persistBookmarks();
};

export const deleteBookmarks = function (data) {
  state.restaurant.bookmarked = false;
  const id = data.id;
  const index = state.bookmarks.findIndex((restaurant) => restaurant.id === id);
  state.bookmarks.splice(index, 1);
  persistBookmarks();
};

const getLocalStorage = function () {
  const data = localStorage.getItem('bookmarks');
  if (!data) return;
  state.bookmarks = JSON.parse(data);
};
getLocalStorage();

const resetBookmarks = function () {
  localStorage.removeItem('bookmarks');
  location.reload();
};
// resetBookmarks();
