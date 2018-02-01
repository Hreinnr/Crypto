import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableWrapper = styled.div`
  font-family: Arial;
  border-collapse: collapse;
  width: 100%;
  height: 780px;
  table {
    margin: auto;
  }
  img {
    height: 45px;
    width: 45px;
  }
  td {
    border: 1px solid #ddd;
  }
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: ${props => props.theme.hover};
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: ${props => props.theme.buttonHeader};
    color: white;
  }
  .CoinName {
    width: 200px;
  }
  .CoinSymbol {
    width: 100px;
  }
  button {
    background-color: ${props => props.theme.buttonHeader};
    border: none;
    border-radius: 4px;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
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
      start: 0,
      end: 10,
    };
  }

  renderCoinInfo(coin) {
    this.props.onSelectCoin(coin);
  }

  renderList(coins) {
    let start = this.state.start;
    let end = this.state.end;
    let coinsSlice = coins.slice(start, end);
    console.log(coinsSlice, ' Hér er sliced coin bitch');
    return (
      <table>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Symbol</th>
        </tr>
        {coinsSlice.map(coin => {
          return (
            <tr key={coin.Id} onClick={() => this.renderCoinInfo(coin)}>
              <td>
                <img
                  alt="CoinImage"
                  src={'https://www.cryptocompare.com/' + coin.ImageUrl}
                />
              </td>
              <td className="CoinName">{coin.CoinName}</td>
              <td className="CoinSymbol">{coin.Symbol}</td>
            </tr>
          );
        })}
      </table>
    );
  }

  listBack() {
    if (this.state.start === 0) {
      console.log(' her gerist ekkert boooy');
    } else {
      let newStart = this.state.start - 10;
      let newEnd = this.state.end - 10;
      this.setState(
        {
          start: newStart,
          end: newEnd,
        },
        () => this.renderList(this.props.coins)
      );
    }
  }

  listForward() {
    if (this.state.index === 2110) {
      console.log(' her gerist ekkert');
    } else {
      let newStart = this.state.start + 10;
      let newEnd = this.state.end + 10;
      this.setState(
        {
          start: newStart,
          end: newEnd,
        },
        () => this.renderList(this.props.coins)
      );
    }
  }

  render() {
    console.log(this.props, ' hér er props í list');
    console.log(this.state, ' hér er state i list');
    return (
      <TableWrapper>
        {this.props.coins.length > 0 ? (
          this.renderList(this.props.coins)
        ) : (
          <p>Loading</p>
        )}
        <button onClick={() => this.listBack()}>Previous</button>
        <button onClick={() => this.listForward()}>Next</button>
      </TableWrapper>
    );
  }
}

export default List;
