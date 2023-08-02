# Restaurant Search

[View Demo here](https://restaurant-search-myapp.netlify.app)


![Restaurant Search screen shot](https://user-images.githubusercontent.com/61277579/134940284-5cc46c38-681b-4369-bc41-2035d518dc72.png)


A restaurant search application built with HTML, CSS and JavaScript.  
It fetches data from [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3/get_started) and gets users current position using Geolocation API. Users can search restaurants near them and see restaurants detail which is from opening hours to the location on map, and they also can save restaurants on bookmark. Data on bookmark is stored on localstorage.  
I used the MVC pattern to organize my code of this project. 


## Built With

- HTML
- CSS
- JavaScript


## Getting Started

### Prerequisites

Install npm. 

- npm
  ```
  npm install npm@latest -g
  ```

### Installation
1. Get an API key at [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3/get_started).
2. Clone the repo.
    ```
    git clone https://github.com/yumietzk/restaurant-search.git
    ```
3. Install NPM packages.
    ```
    npm install
    ```
4. Create your API key and proxy in a .env file.
    ```
    API_KEY=yourapikey
    CORS_URL=https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/
    ```
5. Start the server.
    ```
    npm run start
    ```
