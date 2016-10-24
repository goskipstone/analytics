
import { render } from 'react-dom'
import { Html } from './components'
import { Provider } from 'react-redux'
import { default as React } from 'react'
import { default as routes } from './routes'
import { createMemoryHistory } from 'history'
import { default as client } from './helpers/api'
import { renderToString } from 'react-dom/server'
import { ReduxAsyncConnect } from 'redux-connect'
import { default as canUseDOM } from 'can-use-dom'
import { default as createStore } from './redux/create'
import { default as withScroll } from 'scroll-behavior'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, RouterContext, match, browserHistory } from 'react-router'
// import { whyDidYouUpdate } from 'why-did-you-update'

// if (process.env.DEVELOPMENT && process.env.DEVTOOLS) {
//   whyDidYouUpdate(React, {
//     exclude: /Connect|MdClose/
//   })
// }

if (canUseDOM) {
  const store = createStore(history)
  const history = syncHistoryWithStore(withScroll(browserHistory), store)
  render(
    <Provider store={store}>
      <Router
        routes={routes}
        history={history}
        render={(props) =>
          <ReduxAsyncConnect
            {...props}
            helpers={{ client }}
            filter={item => !item.deferred}
          />
        }
      />
    </Provider>,
    document.getElementById('content')
  )
}

export default ({ assets, path }, callback) => {
  const history = createMemoryHistory()
  const store = createStore(history)
  const location = history.createLocation(path)

  match({ routes, location }, (error, redirectLocation, props) => {
    if (error) {
      throw new Error(error)
    }

    if (!props) {
      throw new Error(`
        Something is wrong with your routing configuration.
        Check the routes object in webpack.config.js.
      `)
    }

    const html = renderToString(
      <Html
        assets={assets}
        component={
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        }
      />
    )
    callback(null, `<!doctype html>${html}`)
  })
}
