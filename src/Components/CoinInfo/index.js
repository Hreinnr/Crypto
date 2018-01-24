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
        console.log(prices[coin], ' her er þettatata');
        this.setState({
          fullPrice: prices,
        });
      })
      .catch(console.error);
  }

  componentWillReceiveProps(nextProps) {}
  constructor(props) {
    super(props);
    this.state = {
      coin: '',
      fullPrice: {},
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
    console.log(this.state.priceFull !== {}, ' her er þettatatatatatatatatats');
    console.log(this.state, ' this . state');
    console.log(this.props, ' her er thist .props');
    return (
      <CoinInfoWrapper>
        Price:
        <p>
          {
            this.state.fullPrice[this.props.selectedCoin][
              this.state.initialCurrency
            ]
          }
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
