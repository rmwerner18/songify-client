const BASE_API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://songify-backend.herokuapp.com/'
    : 'http://localhost:3000/';

export default BASE_API_URL;
