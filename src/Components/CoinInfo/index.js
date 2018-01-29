import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import green from './Green_Arrow_Up.svg';
import red from './Red_Arrow_Down.svg';

const cc = require('cryptocompare');
var numeral = require('numeral');

const CoinInfoWrapper = styled.div`
  margin: auto;
  border: 2px solid black;
  height: 600px;
  width: 800px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  img{
    height: 100px;
    width: 100px;
    }
  }
`;

// VÆRI HÆGT AÐ VERA MEÐ FALL SEM SÆÆKJIR NÝ VALUE FYRIR CURRENCY Á MINOTU FRESTI EÐA EITTHVÐA ?
class CoinInfo extends Component {
  componentWillMount() {
    console.log(this.props.selectedCoin, ' her er coin mmbllslsvldslsl');
    let coin = this.props.selectedCoin.Name;
    cc
      .priceFull([coin], ['USD', 'EUR', 'GBP', 'CNY'])
      .then(prices => {
        let coinsInfo = Object.keys(prices).map(key => prices[key]);
        this.setState({
          fullPrice: coinsInfo,
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

  renderPrice() {
    let money = this.state.fullPrice[0][this.state.initialCurrency].PRICE;
    let string = numeral(money).format('$0,0.00');
    return string;
  }

  renderPrecentageChange() {
    if (
      this.state.fullPrice[0][this.state.initialCurrency].CHANGEPCT24HOUR > 0
    ) {
      return (
        <div>
          {this.state.fullPrice[0][this.state.initialCurrency].CHANGEPCT24HOUR}
          <img src={green} alt="Green Arrow" />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.fullPrice[0][this.state.initialCurrency].CHANGEPCT24HOUR}
          <img src={red} alt="Red Arrow" />
        </div>
      );
    }
  }

  renderTimeUpdated() {
    let dateString = moment
      .unix(this.state.fullPrice[0][this.state.initialCurrency].LASTUPDATE)
      .format('LLLL');
    return dateString;
  }

  renderCurrency() {
    let money = this.state.fullPrice[0][this.state.initialCurrency].MKTCAP;
    let string = numeral(money).format('($ 0.00 a)');
    return string;
  }

  renderVolume() {
    // if 0 þá ekki sýna þetta helllo
    let volume = this.state.fullPrice[0][this.state.initialCurrency]
      .VOLUME24HOURTO;
    let string = numeral(volume).format('($ 0.00 a)');
    return string;
  }

  render() {
    console.log(this.props, ' her eru props babay');
    console.log(this.state, ' her er state');
    return (
      <CoinInfoWrapper>
        <img
          src={
            'https://www.cryptocompare.com/' + this.props.selectedCoin.ImageUrl
          }
          alt="Crypto image"
        />
        <p> Name - {this.props.selectedCoin.Name}</p>
        <div>
          {this.state.fullPrice.length === 0 ? (
            <p> lodaing </p>
          ) : (
            <div>
              <p>
                Price:
                {this.renderPrice()}
              </p>
              <p>
                Low 24 hour :
                {this.state.fullPrice[0][this.state.initialCurrency].LOW24HOUR}
              </p>
              <p>
                High 24 hour :
                {this.state.fullPrice[0][this.state.initialCurrency].HIGH24HOUR}
              </p>
              <p>
                Change precentage 24 hour %
                {this.renderPrecentageChange()}
              </p>
              <p>Time updated: {this.renderTimeUpdated()}</p>
              <p>
                Market Cap
                {this.renderCurrency()}
              </p>
              <p>
                Volume 24 Hour
                {this.renderVolume()}
              </p>
            </div>
          )}
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="USD">USD $</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CNY">CNY</option>
          </select>
        </div>
      </CoinInfoWrapper>
    );
  }
}

export default CoinInfo;
