import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import { Form, Layout, Dialog, Input, Button } from 'element-react';


export class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        ticker: '',
        target: '',
        price: '',
        quantity: '',
      }
    };
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign(this.state.form, { [key]: value })
    });
  }

  render() {

    return (
      <Dialog
        title="Tips"
        size="tiny"
        visible={ this.props.visible }
        onCancel={ this.props.toggle_modal }
        lockScroll={ false }
      >

        <Dialog.Body>
          <Form model={this.state.form}>
            <Layout.Row gutter="10">

              <Layout.Col lg="12">
                <Form.Item label="Ticker">
                  <Input value={this.state.form.ticker} onChange={this.onChange.bind(this, 'ticker')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Target Allocation">
                  <Input value={this.state.form.target} onChange={this.onChange.bind(this, 'target')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Price">
                  <Input value={this.state.form.price} onChange={this.onChange.bind(this, 'price')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Quantity">
                  <Input value={this.state.form.quantity} onChange={this.onChange.bind(this, 'quantity')}></Input>
                </Form.Item>
              </Layout.Col>

            </Layout.Row>
          </Form>
        </Dialog.Body>

        <Dialog.Footer>
          <Button type="primary" onClick={() => { this.props.modal_success(this.state.form) }}>Confirm</Button>
          <Button onClick={this.props.toggle_modal}>Cancel</Button>
        </Dialog.Footer>

      </Dialog>
    )
  }
}
