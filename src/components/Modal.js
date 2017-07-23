import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import { Form, Layout, Dialog, Input, Button } from 'element-react';


export class Modal extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      modal_success: this.props.modal_success,
      form: {
        ticker: '',
        target: '',
        price: '',
        quantity: '',
      },
      // rules: {
      //   target: [
      //     { required: true, message: 'Please set a target allocation', trigger: 'blur'}
      //   ],
      // }
    }

    this.close_modal = this.close_modal.bind(this);
    this.toggle_modal = this.props.toggle_modal;
    this.editForm = this.editForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.refs.form.validate((valid) => {
      if (valid) {
        let cloned_form = JSON.parse(JSON.stringify(this.state.form));
        Object.keys(this.state.form).forEach(i => this.state.form[i] = '')
        this.state.modal_success(cloned_form);
      } else {
        return false;
      }
    })
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign(this.state.form, { [key]: value })
    });
  }

  editForm(form, index) {
    form.target = form.target * 100;
    this.setState({
      form: form
    })
  }

  close_modal() {
    Object.keys(this.state.form).forEach(i => this.state.form[i] = '')
    this.toggle_modal();
  }

  render() {

    return (
      <Dialog
        title=""
        size="tiny"
        visible={ this.props.visible }
        onCancel={ this.props.toggle_modal }
        lockScroll={ false }
      >

        <Dialog.Body>
          <Form ref="form" model={this.state.form} rules={this.state.rules}>
            <Layout.Row gutter="10">

              <Layout.Col lg="12">
                <Form.Item label="Ticker" prop="ticker">
                  <Input value={this.state.form.ticker} onChange={this.onChange.bind(this, 'ticker')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Target Allocation (%)" prop="target">
                  <Input value={this.state.form.target} onChange={this.onChange.bind(this, 'target')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Price" prop="price">
                  <Input value={this.state.form.price} onChange={this.onChange.bind(this, 'price')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Quantity" prop="quantity">
                  <Input value={this.state.form.quantity} onChange={this.onChange.bind(this, 'quantity')}></Input>
                </Form.Item>
              </Layout.Col>

            </Layout.Row>
          </Form>
        </Dialog.Body>

        <Dialog.Footer>
          <Button type="primary" onClick={ this.onSubmit.bind(this) }>Confirm</Button>
          <Button onClick={this.close_modal}>Cancel</Button>
        </Dialog.Footer>

      </Dialog>
    )
  }

}
