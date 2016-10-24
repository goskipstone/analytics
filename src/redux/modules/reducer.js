
import { reducer as app } from './app'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as awaitReducer } from 'redux-await'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { reducer as simpleStorage } from './simpleStorage'

export default combineReducers({
  await: awaitReducer,
  reduxAsyncConnect,
  routing: routerReducer,
  app,
  simpleStorage
})
