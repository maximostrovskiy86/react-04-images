import {BASE_URL, API_KEY} from "../const/base";


export const fetchGetImages = async keyword => {
  const response = await fetch(
    BASE_URL + `q=${keyword}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    {
      headers: {
        Accept: 'application/json',
    }});

  return await response.json();
};
