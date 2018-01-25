import React, { Component } from 'react';
import styled from 'styled-components';
const cc = require('cryptocompare');

const CoinInfoWrapper = styled.div``;

class CoinInfo extends Component {
  componentWillMount() {
    let coin = this.props.selectedCoin;
    cc
      .priceFull([coin], ['USD', 'EUR', 'GBP', 'CNY'])
      .then(prices => {
        let coinsInfo = prices;
        let coinsInfoB = Object.keys(prices).map(key => prices[key]);
        this.setState({
          fullPrice: coinsInfoB,
        });
      })
      .catch(console.error);
  }

  componentWillReceiveProps(nextProps) {}
  constructor(props) {
    super(props);
    this.state = {
      coin: '',
      fullPrice: [],
      priceCoin: '',
      initialCurrency: 'USD',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ initialCurrency: event.target.value });
    this.changePrice(event.target.value);
  }

  changePrice(currency) {
    // this.setState({ fullPrice: })
    // console.log(currency, ' her er þetta dót mayen');
    // cc
    //   .priceFull(['BTC'], [currency, 'EUR', 'GBP'])
    //   .then(prices => {
    //     console.log(prices, ' Her er prices -----------');
    //     this.setState({ priceCoin: prices[Object.keys(prices)[0]] });
    //   })
    //   .catch(console.error);
  }

  render() {
    console.log(this.state.fullPrice);
    console.log(this.props.selectedCoin);
    console.log(this.state.initialCurrency);
    console.log(this.state.priceFull, ' her er þettatatatatatatatatats');
    return (
      <CoinInfoWrapper>
        Price:
        <p>
          {this.state.fullPrice.length === 0 ? (
            <p> lodaing </p>
          ) : (
            <p>{this.state.fullPrice[0][this.state.initialCurrency]}</p>
          )}
          {/* {this.state.initialCurrency}
          {this.props.selectedCoin}
          {this.state.fullPrice[this.props.selectedCoin]}
          {
            this.state.fullPrice[this.props.selectedCoin][
              this.state.initialCurrency
            ]
          } */}
        </p>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="USD">USD $</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="CNY">CNY</option>
        </select>
      </CoinInfoWrapper>
    );
  }
}

export default CoinInfo;
