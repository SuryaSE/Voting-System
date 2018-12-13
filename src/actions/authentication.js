// authentication.js

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, USER_LIST, VOTE_TO_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
  axios.post('/api/users/register', user)
  .then(res => history.push('/login'))
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}

export const loginUser = (user) => dispatch => {
  axios.post('/api/users/login', user)
  .then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}

export const voteUser = (vote) => dispatch => {
  axios.post('/api/users/vote', vote)
  .then(res => {
    const  votedUser  = res.data.users;
    // dispatch(voteToUser(votedUser));
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}

export const users = (userid) => dispatch =>{
  axios.get('/api/users/usersList/'+userid)
  .then(res => {
    const usersList = res.data.users;
    dispatch(getUserList(usersList));
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const getUserList = usersList =>{
  return {
    type: USER_LIST,
    payload: usersList
  }
}

export const voteToUser = votedUser =>{
  return {
    type: VOTE_TO_USER,
    payload: votedUser
  }
}

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/login');
}
