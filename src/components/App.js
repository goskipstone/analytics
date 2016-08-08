import React, { Component, PropTypes } from 'react'
import { BottomBar, Input, Navbar, Theme } from 'components'
import { default as Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { setScreenSize } from 'redux/modules/app'
import { debounce } from 'lodash'

@connect(() => ({}), { setScreenSize })

export default class App extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  static childContextTypes = {
    joifulReactForms: PropTypes.object
  };

  getChildContext () {
    return {
      joifulReactForms: {
        JoifulInput: {
          types: {
            text: Input
          }
        }
      }
    }
  }

  constructor () {
    super()
    this.setScreenSize = debounce(this.setScreenSize.bind(this), 100)
  }

  componentDidMount () {
    this.setScreenSize()
    window.addEventListener('resize', this.setScreenSize)
  }

  setScreenSize () {
    const height = () => window.innerHeight || $(window).height()
    const width = () => window.innerWidth || $(window).width()
    this.props.setScreenSize({ height: height(), width: width() })
  }

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
