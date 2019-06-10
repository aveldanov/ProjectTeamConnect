import React from 'react';
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// alert state example
// const initalState = [
//   {
//     id: 1,
//     msg: 'Please log in',
//     alertType: 'success'
//   }
// ]
const initalState = [

]

const alert = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => {
        return alert.id !== payload
      });
    default:
      return state;
  }
}

export default alert
