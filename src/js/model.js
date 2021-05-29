import { async } from 'regenerator-runtime'; // this was supposed to be created automatically by Parcel, but it wasn't, so I did.
import { AJAX } from './helper.js';
import { URL } from './config.js';

export const state = {
  search: {
    query: '',
    businesses: [], // [{name: , location: , rating: , image: }, {...}]
    // lat,
    // long,
    page: 1,
    resultsPerPage: '',
  },
  bookmarks: [],
};

export const getCurrentPosition = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(latitude, longitude);

        state.search.lat = latitude;
        state.search.long = longitude;
        console.log(state.search.lat, state.search.long);
        // return state.search.lat;

        // // Render the map based on the tiles <- This happens after choosing a restaurant.

        // const coords = [latitude, longitude];
        // const map = L.map('map').setView(coords, 13);

        // L.tileLayer(
        //   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        //   {
        //     attribution:
        //       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        //     maxZoom: 20,
        //     id: 'mapbox/streets-v11',
        //     tileSize: 512,
        //     zoomOffset: -1,
        //     accessToken:
        //       'pk.eyJ1IjoieXQyOSIsImEiOiJja3A3MGF1OHkwdjcxMzV0OGp0Y2lxcDVlIn0.ReMJFHd2iJAVf_4YarMAIQ',
        //   }
        // ).addTo(map);

        // // Creaet mapmarker at your current location

        // // // Create mapmarker
        // // map.on('click', function (mapEvent) {
        // //   console.log(mapEvent);
        // //   const { lat, lng } = mapEvent.latlng;

        // //   // L.marker(coords)
        // //   //   .addTo(map)
        // //   //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        // //   //   .openPopup();
        // //   L.marker([lat, lng])
        // //     .addTo(map)
        // //     .bindPopup(
        // //       L.popup({
        // //         maxWidth: 250,
        // //         minWidth: 100,
        // //         autoClose: false,
        // //         closeOnClick: false,
        // //         className: 'running-popup',
        // //       })
        // //     )
        // //     .setPopupContent('Workout')
        // //     .openPopup();
        // // });
      },
      function () {
        alert('Could not get your position');
      }
    );
  }
};

export const loadSearchResults = async function (query, limit = 5) {
  try {
    state.search.query = query;

    console.log(state.search.lat);
    const data = await AJAX(
      `${URL}search?term=${query}&latitude=${state.search.lat}&longitude=${state.search.long}&limit=${limit}`
    );
    console.log(data.businesses);

    state.search.businesses = data.businesses.map((data) => {
      return {
        name: data.name,
        location: data.location.address1,
        rating: data.rating,
        image: data.image_url,
      };
    });
    console.log(state.search.businesses);
  } catch (err) {
    console.error(`💥💥💥 ${err}`);
    throw err;
  }
};
