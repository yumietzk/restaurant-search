import { async } from 'regenerator-runtime'; // this was supposed to be created automatically by Parcel, but it wasn't, so I did.
import { API_KEY } from './config.js';

// const key = API_KEY;

const requestOptions = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    // 'Content-Type': 'application/json',
  },
};

export const AJAX = async function (url) {
  try {
    const res = await fetch(
      // 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=pizza&location=toronto',
      url,
      requestOptions
    );
    console.log(res);
    if (!res.ok) throw new Error('Please search again!');

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(`💥💥💥 ${err}`);
    throw err;
  }
};
