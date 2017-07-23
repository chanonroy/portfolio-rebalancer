import React from 'react';
import Tools from '../utility.js'
import { Button, Layout } from 'element-react';
import { Stock } from '../components/Stock';
import { Modal } from '../components/Modal';
const Rebalancer = require('../rebalancer');

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_modal: false,
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
          target: 0.4,
          value: 36.8
        }
      ],
      form_holder: {
        ticker: '',
        target: '',
        price: '',
        quantity: '',
      },
      form_type: '',
      form_index: '',
      cash: 0,
      actions: []
    };

    this.total_value = this.total_value.bind(this);
    this.total_capital = this.total_capital.bind(this);
    this.total_allocation = this.total_allocation.bind(this);

    this.add_stock = this.add_stock.bind(this);
    this.edit_stock = this.edit_stock.bind(this);
    this.prepare_form = this.prepare_form.bind(this);

    this.toggle_modal = this.toggle_modal.bind(this);
    this.modal_success = this.modal_success.bind(this);
    this.get_actions = this.get_actions.bind(this);
  }

  render() {
    let total_value = this.total_value();
    let total_capital = this.total_capital();
    let total_allocation = this.total_allocation;
    let edit_stock = this.edit_stock;

    return (
      <div className="container">
        <Button type="primary" onClick={this.add_stock}> Add Ticker </Button>
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
                index={index}
                edit_stock={edit_stock}
              />
           );
        })}

        <div> {JSON.stringify(this.state.actions)} </div>

        <Modal
          ref="Modal"
          visible={this.state.show_modal}
          toggle_modal={this.toggle_modal}
          total_allocation={this.total_allocation}
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
    let allocation = this.state.portfolio.reduce(function(acc, stock) {
      return acc + stock.target;
    }, 0);
    return allocation;
  }

  // Methods ----
  prepare_form(cloned_form, index) {
    this.setState({
      form_holder: cloned_form,
      form_type: 'edit',
      form_index: index,
    });
    console.log(this);
  }

  edit_stock(index) {
    let cloned_form = JSON.parse(JSON.stringify(this.state.portfolio[index]));
    this.prepare_form(cloned_form, index);
    this.refs.Modal.editForm(cloned_form, index);
    this.toggle_modal();
  }

  add_stock() {
    this.setState({ form_type: 'add' });
    this.toggle_modal();
  }

  modal_success(form) {
    form.value = Math.round(form.price * form.quantity * 100) / 100;
    form.target = form.target / 100;

    let type = this.state.form_type;
    let allocation = this.total_allocation();

    if (type === 'add') {
      this.setState({ portfolio: this.state.portfolio.concat(form) });
    }

    if (type === 'edit') {
      let updated_list = this.state.portfolio;
      updated_list[this.state.form_index] = form;
      this.setState({ portfolio: updated_list })
    }

    this.toggle_modal();
  }

  toggle_modal() {
    this.setState({ show_modal: !this.state.show_modal })
  }

  get_actions() {
    var result = new Rebalancer(this.state.portfolio, this.state.cash).main();

    // has more info beyond actions that we can pull in

    this.setState({
      actions: result.actions
    })
  }

}
