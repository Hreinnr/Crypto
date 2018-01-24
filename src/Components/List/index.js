import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CoinsWrapper = styled.div`
  justify-content: center;
  display: flex;
  height: 60px;
  width: 300px;
  border: 2px solid black;
  margin: 5px;
  padding: 5px;
  font-size: 1.5em;
  img {
    height: 60px;
    width: 60px;
  }
`;

class List extends Component {
  static proptypes = {
    onSelectCoin: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      coins: {},
    };
  }

  renderCoinInfo(name) {
    this.props.onSelectCoin(name);
  }

  renderList(coins) {
    console.log(coins, ' her er kallað í renderList');
    return coins.map(coin => {
      return (
        <CoinsWrapper
          key={coin.Id}
          onClick={() => this.renderCoinInfo(coin.Name)}
        >
          <img
            alt="CoinImage"
            src={'https://www.cryptocompare.com/' + coin.ImageUrl}
          />
          {coin.FullName}
        </CoinsWrapper>
      );
    });
  }

  render() {
    return (
      // <div>{this.props.coins === {} ?( this.renderList(this.props.coins))}</div>
      <div>
        {this.props.coins.length > 0 ? (
          this.renderList(this.props.coins)
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}

export default List;
