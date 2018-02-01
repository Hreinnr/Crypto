import React, { Component } from 'react';
import logo from './bitcoin.svg';
import { ThemeProvider } from 'styled-components';
import List from './Components/List/index.js';
import CoinInfo from './Components/CoinInfo/index';
import styled from 'styled-components';

const cc = require('cryptocompare');

let lightTheme = {
  back: 'white',
  text: 'black',
  background: 'white',
  buttonHeader: '#6098f2',
  tableOdd: '#f2f2f2',
  tableOther: 'white',
};

let darkTheme = {
  back: '#727272',
  text: 'white',
  background: '#353a42',
  buttonHeader: '#000000',
  tableOdd: '#363638',
  tableOther: '#4f4f4f',
};

const AppWrapper = styled.div`
  text-align: center;
  background-color: ${props => props.theme.back};
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 80px;
  }

  .App-header {
    background-color: ${props => props.theme.buttonHeader};
    height: 90px;
    padding: 5px;
    color: white;
    display: flex;
    justify-content: center;
  }

  .App-title {
    font-size: 1.5em;
    margin: 25px;
  }

  .App-intro {
    font-size: large;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

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
        <AppWrapper>
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
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default App;
