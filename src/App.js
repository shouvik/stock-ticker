import logo from './logo.svg'
import React, { Component } from 'react'
import * as R from 'ramda'

import './App.css'

class App extends Component {

  constructor(state, props) {
    super(state, props)
    this.state = {
      pticker: undefined,
      ticker: undefined
    }
  }

  componentWillReceiveProps(props) {
    const ticker = JSON.parse(props.ticker)
    const tempObject = {};
    ticker.forEach(function(element) {
      tempObject[element[0]] = tempObject[element[0]] ? tempObject[element[0]] : {}
      tempObject[element[0]] = {
        currentValue: element[1],
        previousValue: (this.state.ticker && this.state.ticker[element[0]]) ? this.state.ticker[element[0]].currentValue : element[1]
      }
    }, this)
    this.setState({
      pticker: this.state.ticker ? this.state.ticker : tempObject,
      ticker: R.merge(tempObject, this.state.ticker)
    })
  }

  render() {
    console.log(this.state.ticker && Object.keys(this.state.ticker).length)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
