import React, { Component } from 'react';
import logo from './bitcoin.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import List from './Components/List/index.js';
import CoinInfo from './Components/CoinInfo/index';
const cc = require('cryptocompare');

let lightTheme = {
  text: 'black',
  background: 'white',
};

let darkTheme = {
  text: 'white',
  background: 'black',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: {},
      selectedCoin: '',
      theme: lightTheme,
    };
  }
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

  setSelectedCoin(coin) {
    this.setState({ selectedCoin: coin });
  }

  changeTheme(setLightTheme) {
    if (setLightTheme) {
      this.setState({ theme: lightTheme });
    } else {
      this.setState({ theme: darkTheme });
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <div className="App">
          <button onClick={() => this.changeTheme(true)}>
            Set light Theme
          </button>
          <button onClick={() => this.changeTheme(false)}>
            Set dark Theme
          </button>
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
      </ThemeProvider>
    );
  }
}

export default App;
