import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: 'https://t4travel.wooshelf.com/api/',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers['Authorization'] = `token ${user}`;
  }
  return config;
});

// export const checkForUnauthorizedResponse = (error, thunkAPI) => {
//   if (error.response.status === 401) {
//     thunkAPI.dispatch(clearStore());
//     return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
//   }
//   return thunkAPI.rejectWithValue(error.response.data.msg);
// };

export default customFetch;