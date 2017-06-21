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
    this.total_allocation = this.total_allocation.bind(this);
    this.toggle_modal = this.toggle_modal.bind(this);
  }

  // Computed Properties ----
  total_value() {
    let value = this.state.portfolio.reduce(function(acc, stock) {
        return acc + stock.value;
      }, 0);

    return value;
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



  render() {
    let total_value = this.total_value();
    let total_capital = total_value + this.state.cash;
    let total_allocation = this.total_allocation;

    return (
      <div className="container">
        <Button type="primary" onClick={this.toggle_modal}> Add Ticker </Button>

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

        <Modal
          visible={this.state.tickerModal}
          toggle_modal={this.toggle_modal}
        />

      </div>
    )
  }
}
