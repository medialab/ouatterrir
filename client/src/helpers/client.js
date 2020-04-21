import {post} from 'axios';


export const postAnswer = data => {
  return post('/answer', data)
}