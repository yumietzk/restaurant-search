import { async } from 'regenerator-runtime';

const key = process.env.API_KEY;

require('dotenv').config();

const requestOptions = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${key}`,
  },
};

export const AJAX = async function (url) {
  try {
    const res = await fetch(url, requestOptions);
    console.log(res);
    if (!res.ok) throw new Error('Please search again!');

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`💥💥💥 ${err}`);
    throw err;
  }
};
