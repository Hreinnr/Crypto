import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import green from './Green_Arrow_Up.svg';
import red from './Red_Arrow_Down.svg';

const cc = require('cryptocompare');
var numeral = require('numeral');

const CoinInfoWrapper = styled.div`
  margin: auto;
  border: 1px solid white;
  height: 600px;
  width: 1080px;
  position: inherit;
  background-color: ${props => props.theme.back};
  color: ${props => props.theme.text};
  .ImageWrapper{
    position: absolute;
    border: 1px solid black;
    box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1);
    padding: 5px 5px 5px 5px;
    margin: 25px 5px 5px 98px;
    font-size: 25px;
    font-weight: bold;
    width: 200px;
    height: 200px;
    p{
      margin 0px;
    }
    img{
      height: 150px;
      width: 150px;
    }
  }
  .PriceWrapper{
    border: 1px solid black;
    height: 75px;
    width: 550px;
    margin-left: 313px;
    margin-top: 160px;
    display: flex;
    justify-content: space-evenly;
    p{
      font-size: 50px;
      font-weight: bold;
      margin: 0;
      width: 250px;
    }
    div{
      height: 60px;
      width: 90px;
      font-size: 25px;
      img{
        height: 25px;
        width: 25px;
      }
    }
    select{
      background-color: #6098f2;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 20px;
      margin-top: 20px;
    }
  }
  .VoluemWrapper{
    display: inline-flex;
    border: 1px solid black;
    margin-top: 15px;
    div{
      p{
        margin: 0px;
      }
      margin: 4px;
      padding: 10px;
    }
    .Bubble{
      border-radius: 4px;
      background-color:#cbdbf4;
      box-shadow: 0 4px 10px 0 rgba(50, 70, 90, 0.1);
    }
  }
  }
`;

// VÆRI HÆGT AÐ VERA MEÐ FALL SEM SÆÆKJIR NÝ VALUE FYRIR CURRENCY Á MINOTU FRESTI EÐA EITTHVÐA ?
class CoinInfo extends Component {
  componentWillMount() {
    console.log(this.props.selectedCoin, ' her er coin mmbllslsvldslsl');
    let coin = this.props.selectedCoin.Name;
    cc
      .priceFull([coin], ['USD', 'EUR', 'GBP', 'CNY', 'CAD', 'BTC'])
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

  renderPrice() {
    let money = this.state.fullPrice[0][this.state.initialCurrency].PRICE;
    if (money < 1) {
      return money;
    }
    let string = numeral(money).format('$0,0.00');
    return string;
  }

  renderPrecentageChange() {
    if (
      this.state.fullPrice[0][this.state.initialCurrency].CHANGEPCT24HOUR > 0
    ) {
      let precentage =
        this.state.fullPrice[0][this.state.initialCurrency].CHANGEPCT24HOUR /
        100;
      precentage = numeral(precentage).format('0.00%');
      console.log(precentage);
      return (
        <div>
          <img src={green} alt="Green Arrow" />
          {precentage}
        </div>
      );
    } else {
      let precentage =
        this.state.fullPrice[0][this.state.initialCurrency].CHANGEPCT24HOUR /
        100;
      precentage = numeral(precentage).format('0.00%');
      console.log(precentage);
      return (
        <div>
          <img src={red} alt="Red Arrow" />
          {precentage}
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

  renderCurrency(money) {
    let string = 0;
    if (money > 100000) {
      string = numeral(money).format('(0.00 a)');
    } else {
      string = money;
    }
    switch (this.state.initialCurrency) {
      case 'USD':
        let usd = '$';
        string = usd.concat(string);
        break;
      case 'EUR':
        let euro = '€';
        string = euro.concat(string);
        break;
      case 'GBP':
        let gbp = '£';
        string = gbp.concat(string);
        break;
      case 'CAD':
        let cad = 'C$';
        string = cad.concat(string);
        break;
      case 'CNY':
        let cny = '¥';
        string = cny.concat(string);
        break;
      case 'BTC':
        let btc = 'Ƀ';
        string = btc.concat(string);
      default:
    }
    return string;
  }

  changePrice(event) {}

  render() {
    console.log(this.state, ' State');
    console.log(this.props, ' Props');
    return (
      <CoinInfoWrapper>
        <div className="ImageWrapper">
          <img
            src={
              'https://www.cryptocompare.com/' +
              this.props.selectedCoin.ImageUrl
            }
            alt="Crypto image"
          />
          <p>
            {this.props.selectedCoin.CoinName} / {this.props.selectedCoin.Name}
          </p>
        </div>
        {this.state.fullPrice.length === 0 ? (
          <p> lodaing </p>
        ) : (
          <div className="PriceWrapper">
            <p>
              {this.renderCurrency(
                this.state.fullPrice[0][this.state.initialCurrency].PRICE
              )}
            </p>
            {this.renderPrecentageChange()}
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
              <option value="CNY">CNY ¥</option>
              <option value="CAD">CAD C$</option>
              <option value="BTC">BTC Ƀ</option>
            </select>
          </div>
        )}
        <div>
          {this.state.fullPrice.length === 0 ? (
            <p> lodaing </p>
          ) : (
            <div className="VoluemWrapper">
              <div>
                <p>Mkt.Cap</p>
                <div className="Bubble">
                  {this.renderCurrency(
                    this.state.fullPrice[0][this.state.initialCurrency].MKTCAP
                  )}
                </div>
              </div>
              <div>
                <p>Volume 24Hr</p>
                <div className="Bubble">
                  {this.renderCurrency(
                    this.state.fullPrice[0][this.state.initialCurrency]
                      .VOLUME24HOURTO
                  )}
                </div>
              </div>
              <div>
                <p>Low/High 24H</p>
                <div className="Bubble">
                  {this.renderCurrency(
                    this.state.fullPrice[0][this.state.initialCurrency]
                      .LOW24HOUR
                  )}
                  -
                  {this.renderCurrency(
                    this.state.fullPrice[0][this.state.initialCurrency]
                      .HIGH24HOUR
                  )}
                </div>
              </div>
              <div>
                <p>Open 24H</p>
                <div className="Bubble">
                  {this.renderCurrency(
                    this.state.fullPrice[0][this.state.initialCurrency]
                      .OPEN24HOUR
                  )}
                </div>
              </div>
              <div>
                <p>Time updated</p>
                <div className="Bubble">{this.renderTimeUpdated()}</div>
              </div>
            </div>
          )}
        </div>
      </CoinInfoWrapper>
    );
  }
}

export default CoinInfo;
