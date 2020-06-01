import axios from 'axios';

export default axios.create({
  baseURL: 'https://mayhotel.herokuapp.com/hotels',
});