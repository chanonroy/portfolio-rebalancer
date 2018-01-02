import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import { Button, Layout } from 'element-react';

export function Stock(props) {

    return (
      <Layout.Row className="card">
        <Layout.Col sm="5"> <b> {props.ticker} </b> </Layout.Col>
        <Layout.Col sm="3" className="text-center"> {props.quantity} </Layout.Col>
        <Layout.Col sm="3" className="text-center"> ${props.price} </Layout.Col>
        <Layout.Col sm="3" className="text-center"> ${props.value} </Layout.Col>
        <Layout.Col sm="3" className="text-center"> {props.target * 100}% </Layout.Col>
        <Layout.Col sm="3" className="text-center"> {Math.round(props.value / props.total_capital * 100)}% </Layout.Col>
        <Layout.Col sm="4" className="card__links">
          <Button plain={true} type="warning" onClick={() => { props.edit_stock(props.index) }}> Edit </Button>
          <Button plain={true} type="danger" onClick={() => { props.delete_stock(props.ticker) }}> 
            <i className="fa fa-trash" aria-hidden="true"></i>
          </Button>
        </Layout.Col>
      </Layout.Row>
    )
}
