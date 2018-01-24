import React, { Component } from 'react';
import logo from './bitcoin.svg';
import './App.css';
import List from './Components/List/index.js';
import CoinInfo from './Components/CoinInfo/index';
const cc = require('cryptocompare');

class App extends Component {
  componentWillMount() {
    cc
      .coinList()
      .then(coinList => {
        let allCoins = coinList.Data;
        let allCoinsB = Object.keys(allCoins).map(key => allCoins[key]);
        this.setState({
          coins: allCoinsB,
        });
      })
      .catch(console.error);
  }
  constructor(props) {
    super(props);
    this.state = {
      coins: {},
      selectedCoin: '',
    };
  }

  setSelectedCoin(coin) {
    this.setState({ selectedCoin: coin });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Crypto</h1>
        </header>
        {this.state.coins !== {} &&
          this.state.selectedCoin !== '' && (
            <CoinInfo
              coins={this.state.coins}
              selectedCoin={this.state.selectedCoin}
            />
          )}
        {this.state.coins !== {} &&
          this.state.selectedCoin === '' && (
            <List
              onSelectCoin={coin => this.setSelectedCoin(coin)}
              coins={this.state.coins}
            />
          )}
      </div>
    );
  }
}

export default App;
