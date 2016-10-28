
import storageMiddleware from 'redux-simplestorage'
import { routerMiddleware } from 'react-router-redux'
import reducer from './modules/reducer'
import { DevTools } from '../components'
import { persistState } from 'redux-devtools'
import createLogger from 'redux-logger'
import { createTracker } from 'redux-segment'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { middleware as awaitMiddleware } from 'redux-await'
import { createStore as _createStore, applyMiddleware, compose } from 'redux'

export default function createStore (browserHistory) {
  const tracker = createTracker()
  const middleware = [
    awaitMiddleware,
    storageMiddleware,
    routerMiddleware(browserHistory),
    tracker
  ]

  if (process.env.LOGGER) {
    middleware.push(createLogger())
  }

  let finalCreateStore
  if (typeof window !== 'undefined' && process.env.DEVELOPMENT && process.env.DEVTOOLS) {
    finalCreateStore = compose(
      responsiveStoreEnhancer,
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore)
  } else {
    finalCreateStore = compose(
      responsiveStoreEnhancer,
      applyMiddleware(...middleware)
    )(_createStore)
  }

  const store = finalCreateStore(reducer)

  if (process.env.DEVELOPMENT && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'))
    })
  }

  return store
}
