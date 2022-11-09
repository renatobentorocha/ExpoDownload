import {Config} from '../config';
import axios from 'axios';

const PexelsAPI = axios.create({
  baseURL: Config.BASE_API_URL_VIDEOS,
});

PexelsAPI.defaults.headers.common.Authorization = Config.TOKEN;

export {PexelsAPI};
