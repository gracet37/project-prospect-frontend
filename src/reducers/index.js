import { combineReducers } from 'redux'
import auth from './auth'
import { FETCH_CATEGORIES, FETCH_LEADS, FETCH_LISTS, ADD_LIST } from '../actions'


export default combineReducers({
  categories: categories,
  leads: leads,
  lists: lists
})

function categories(state=[], action) {
  switch (action.type) {
    case FETCH_CATEGORIES: 
     return [...action.categories]
    default: 
     return state
  }
}


function leads(state=[], action) {
  switch (action.type) {
     case FETCH_LEADS:
       return [{...action.leads}]
    default: 
     return state
  }
}

function lists(state=[], action) {
  switch (action.type) {
     case FETCH_LISTS:
       return [{...action.lists}]
      case ADD_LIST: 
      return {...state,
      lists: [...state.lists, action.list]}
    default: 
     return state
  }
}