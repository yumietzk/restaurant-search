import { async } from 'regenerator-runtime'; // this was supposed to be created automatically by Parcel, but it wasn't, so I did.
import { AJAX } from './helper.js';
import { URL, RESULTS_PAGE } from './config.js';
import { rest } from 'lodash';

export const state = {
  search: {
    query: '',
    businesses: [], // [{id: , name: , location: , rating: , image: }, {...}]
    // lat,
    // long,
    page: 1,
    resultsPerPage: RESULTS_PAGE, // 5
    // allPage
  },
  restaurant: {}, // {id, image, name, category, address, openingHours, phone, rating, lat, long}
  review: {}, // {text, image, name, date}
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

const createRestaurantObject = function (data) {
  return {
    id: data.id,
    image: data.image_url,
    name: data.name,
    category: data.categories[0].title,
    address: data.location.address1,
    // Have to rethink about this state
    openingHours: [data.hours[0].open[0].start, data.hours[0].open[0].end],
    phone: data.display_phone,
    rating: data.rating,
    lat: data.coordinates.latitude,
    long: data.coordinates.longitude,
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
    state.review = createReviewObject(data.reviews[0]);
    console.log(state.review);
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
      state.search.businesses.length / state.search.resultsPerPage + 1;
};

const persistBookmarks = function () {};

export const addBookmarks = function (data) {
  state.bookmarks.push(data);
};

export const resetBookmarks = function () {
  localStorage.removeItem('bookmarks');
  location.reload();
};
