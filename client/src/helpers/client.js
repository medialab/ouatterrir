import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';

export const postAnswer = data => {
  return axios({
    method: 'POST',
    url: `${API_URL}answer`,
    data: { data }
  })
}


export const getEvents = () => {
  if (!process.env.REACT_APP_API_URL) {
    return axios(`${process.env.PUBLIC_URL || ''}/calendar-example.json`)
  }
  return axios(`${API_URL}events`)
}
