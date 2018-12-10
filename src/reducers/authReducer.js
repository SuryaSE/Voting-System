// authReducer.js

import { SET_CURRENT_USER, USER_LIST, VOTE_TO_USER } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  userList: []
}

export default function(state = initialState, action ) {
  switch(action.type) {
    case SET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    }
    case USER_LIST:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      userList: action.payload
    }
    case VOTE_TO_USER:
    return{
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      userList: action.payload
    }
    default:
    return state;
  }
}
