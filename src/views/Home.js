import React from 'react';
import Tools from '../utility.js'
import { Button, Layout } from 'element-react';
import { Stock } from '../components/Stock';
import { Modal } from '../components/Modal';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tickerModal: false,
      portfolio: [
        {
          ticker: 'VIC',
          quantity: 5,
          price: 10.21,
          target: 0.5,
          value: 51.05
        },
        {
          ticker: 'CIX',
          quantity: 10,
          price: 3.68,
          target: 0.5,
          value: 36.8
        }
      ],
      cash: 0,
      actions: []
    };

    this.total_value = this.total_value.bind(this);
    this.total_capital = this.total_capital.bind(this);
    this.total_allocation = this.total_allocation.bind(this);
    this.toggle_modal = this.toggle_modal.bind(this);
    this.modal_success = this.modal_success.bind(this);
    this.get_actions = this.get_actions.bind(this);
  }

  render() {
    let total_value = this.total_value();
    let total_capital = this.total_capital();
    let total_allocation = this.total_allocation;

    return (
      <div className="container">
        <Button type="primary" onClick={this.toggle_modal}> Add Ticker </Button>
        <Button type="primary" onClick={this.get_actions}> Generate Report </Button>

        <Layout.Row className="row-header text-muted">
          <Layout.Col sm="5"> Ticker </Layout.Col>
          <Layout.Col sm="3"> Quantity </Layout.Col>
          <Layout.Col sm="3"> Price </Layout.Col>
          <Layout.Col sm="3"> Value </Layout.Col>
          <Layout.Col sm="3"> Target </Layout.Col>
          <Layout.Col sm="3"> Actual </Layout.Col>
          <Layout.Col sm="2"> Action </Layout.Col>
          <Layout.Col sm="1"> </Layout.Col>
        </Layout.Row>

        {this.state.portfolio.map(function(x, index) {
           return (
              <Stock
                key={index}
                ticker={x.ticker}
                price={x.price}
                quantity={x.quantity}
                target={x.target}
                value={x.value}
                total_capital={total_capital}
              />
           );
        })}

        <div> {JSON.stringify(this.state.actions)} </div>

        <Modal
          visible={this.state.tickerModal}
          toggle_modal={this.toggle_modal}
          modal_success={this.modal_success}
        />

      </div>
    )
  }

  // Computed Properties ----
  total_value() {
    let value = this.state.portfolio.reduce(function(acc, stock) {
        return acc + stock.value;
      }, 0);
    return value;
  }

  total_capital() {
    return this.total_value() + this.state.cash;
  }

  total_allocation() {
    let allocation = this.portfolio.reduce(function(acc, stock) {
      return acc + stock.target;
    }, 0);
    return allocation;
  }

  // Methods ----
  toggle_modal() {
    this.setState({
      tickerModal: !this.state.tickerModal
    })
  }

  modal_success(form) {
    form.value = form.price * form.quantity;
    this.setState({
      portfolio: this.state.portfolio.concat(form)
    })
    this.toggle_modal();
  }

  /**
  * {Float} price - price of stock
  * {Float} total_money - total assets
  * {Float} target - percentage (out of 1)
  */
  optimal_calc(price, total_money, target) {
    var tmp = target * total_money / price;
    var optimal = Number(tmp);
    return optimal;
  }

  /**
  * {Float} optimal - ideal percentage
  * {Number} total_money - total capital
  */
  rebalance(optimal, quantity) {
    var delta = optimal - quantity;
    return delta;
  }

  get_actions() {
    var local_actions = [];
    var portfolio = this.state.portfolio;

    for (var i in portfolio) {
      let optimal = this.optimal_calc(portfolio[i].price, this.total_capital(), portfolio[i].target);
      let delta = this.rebalance(optimal, portfolio[i].quantity);
      if (delta !== 0) {
        local_actions.push({ ticker: portfolio[i].ticker, action: Math.round(delta) })
      }
    }
    this.setState({
      actions: local_actions
    })
  }

}
