import axios from 'axios';

const client = axios.create({
  baseURL: process.env['REACT_APP_API_URL'],
});

// Debug interceptor
client.interceptors.request.use(req => {
  console.log(`${req.method} ${req.url}`);
  return req;
});

export default client;