import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import { Form, Layout, Dialog, Input, Button } from 'element-react';


export function Modal(props) {
    let form_type = props.form_type;

    return (
      <Dialog
        title="Tips"
        size="tiny"
        visible={ props.visible }
        onCancel={ props.toggle_modal }
        lockScroll={ false }
      >

        <Dialog.Body>
          <Form model={props.form}>
            <Layout.Row gutter="10">

              <Layout.Col lg="12">
                <Form.Item label="Ticker">
                  <Input value={props.form.ticker} onChange={props.form_change.bind(this, 'ticker')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Target Allocation">
                  <Input value={props.form.target} onChange={props.form_change.bind(this, 'target')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Price">
                  <Input value={props.form.price} onChange={props.form_change.bind(this, 'price')}></Input>
                </Form.Item>
              </Layout.Col>

              <Layout.Col lg="12">
                <Form.Item label="Quantity">
                  <Input value={props.form.quantity} onChange={props.form_change.bind(this, 'quantity')}></Input>
                </Form.Item>
              </Layout.Col>

            </Layout.Row>
          </Form>
        </Dialog.Body>

        <Dialog.Footer>
          <Button type="primary" onClick={() => { props.modal_success(props.form, form_type) }}>Confirm</Button>
          <Button onClick={props.toggle_modal}>Cancel</Button>
        </Dialog.Footer>

      </Dialog>
    )

}
