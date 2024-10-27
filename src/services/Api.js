import {BASE_URL, API_KEY} from "../const/base";


export const fetchGetImages = async (keyword) => {
  const response = await fetch(
    BASE_URL + `q=${keyword}&page=${1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=3`,
    {
      headers: {
        Accept: 'application/json',
    }});

  return await response.json();
};


export const fetchLoadMOreImages = async (keyword, page) => {
  const response = await fetch(
    BASE_URL + `q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=3`,
    {
      headers: {
        Accept: 'application/json',
      }});

  return await response.json();
};
