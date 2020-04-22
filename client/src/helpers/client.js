import axios from 'axios';

const API_URL = process.env.API_URL || '//localhost:4000/';

export const postAnswer = data => {
  return axios({
    method: 'POST',
    url: `${API_URL}answer`,
    data: { data }
  })
}