
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { default as Helmet } from 'react-helmet'
import React, { Component } from 'react'
import { BottomBar, Navbar, Theme } from 'components'
import { getToken, GET_TOKEN } from 'redux/modules/app'

@asyncConnect([{ key: GET_TOKEN, promise: getToken }])
@connect(({ app: { token } }) => ({ token }))
export default class App extends Component {
  render () {
    return (
      <div>
        <Helmet
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0' }
          ]}
          title='Skipstone Analytics'
          titleTemplate='Skipstone Analytics - %s'
        />
        <Theme>
          <div>
            <Navbar />
            {this.props.children}
            <BottomBar />
          </div>
        </Theme>
      </div>
    )
  }
}
