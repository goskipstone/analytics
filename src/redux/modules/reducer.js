
import { reducer as app } from './app'
import { reducer as analytics } from './analytics'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as awaitReducer } from 'redux-await'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { responsiveStateReducer as browser } from 'redux-responsive'

export default combineReducers({
  await: awaitReducer,
  reduxAsyncConnect,
  routing: routerReducer,
  app,
  analytics,
  browser
})
