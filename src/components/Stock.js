import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import { Layout } from 'element-react';

export function Stock(props) {

    return (
      <Layout.Row className="card">
        <Layout.Col sm="5"> {props.ticker} </Layout.Col>
        <Layout.Col sm="3"> {props.quantity} </Layout.Col>
        <Layout.Col sm="3"> ${props.price} </Layout.Col>
        <Layout.Col sm="3"> ${props.value} </Layout.Col>
        <Layout.Col sm="3"> {props.target * 100}% </Layout.Col>
        <Layout.Col sm="3"> {Math.round(props.value / props.total_capital * 100)}% </Layout.Col>
        <Layout.Col sm="3"> -- </Layout.Col>
        <Layout.Col sm="1">
          <i className="fa fa-pencil fa-fw" aria-hidden="true"></i>
          <i className="fa fa-trash fa-fw" aria-hidden="true"></i>
        </Layout.Col>
      </Layout.Row>
    )
}
