import logo from './logo.svg'
import React, { Component } from 'react'
import * as R from 'ramda'

import './App.css'

class App extends Component {

  constructor(state, props) {
    super(state, props)
    this.state = {
      pticker: undefined,
      ticker: {},
      tickerArray: {}
    }
  }

  componentWillReceiveProps(props) {
    const ticker = JSON.parse(props.ticker)
    const tempObject = {}
    const tickerObjArray = this.state.tickerArray ? this.state.tickerArray : {}
    ticker.forEach(function(element) {
      tempObject[element[0]] = tempObject[element[0]] ? tempObject[element[0]] : {}
      tempObject[element[0]] = {
        lastUpdated: (this.state.ticker[element[0]] ? this.state.ticker[element[0]].updatedTime : Date.now()),
        updatedTime: Date.now(),
        currentValue: element[1],
        previousValue: (this.state.ticker && this.state.ticker[element[0]]) ? this.state.ticker[element[0]].currentValue : element[1]
      }
      tickerObjArray[element[0]] = tickerObjArray[element[0]] ? tickerObjArray[element[0]] : []
      tickerObjArray[element[0]].push({
        price: element[1],
        time: Date.now()
      })
    }, this)
    this.setState({
      pticker: this.state.ticker ? this.state.ticker : tempObject,
      ticker: R.merge(this.state.ticker, tempObject),
      tickerArray: this.state.tickerArray
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Stock Ticker</h2>
          <h5><code>Using create-react-app</code></h5>
        </div>
        <div className="App-intro">
          <div className="App-ticker-table">
            <table className="App-ticker-table--header">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Price</th>
                  <th>Last Updated</th>
                  <th>Change Percentage</th>
                </tr>
              </thead>
            </table>
            <table className="App-ticker-table--body">
              <tbody>
                {
                  Object.keys(this.state.ticker).map((item) => {
                    const tickerData = this.state.ticker[item]
                    const time = Math.ceil((tickerData.updatedTime - tickerData.lastUpdated) / 1000) > 5 ? 
                    Math.ceil((tickerData.updatedTime - tickerData.lastUpdated) / 1000) + ' seconds ago' : 'just now..'
                    const changePer = ((tickerData.currentValue - tickerData.previousValue) * 100 / tickerData.previousValue).toFixed(2)
                    console.log(changePer, changePer === 0.00);
                    const background = parseFloat(changePer) === 0.00 ? 'App-ticker-table--cell-white' :
                    (parseFloat(changePer) > 0.00 ? 'App-ticker-table--cell-green' : 'App-ticker-table--cell-red')
                    return (
                      <tr key={item}>
                        <td>{item}</td>
                        <td className={background}>{tickerData.currentValue.toFixed(3)}</td>
                        <td style={{textTransform: 'capitalize'}}><code>{time}</code></td>
                        <td>{changePer}</td>
                      </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App
