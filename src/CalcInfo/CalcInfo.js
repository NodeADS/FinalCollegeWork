import React, { Component } from 'react';
import { Row } from 'react-materialize';

class CalcInfo extends Component {
  constructor(props) {
  	super(props);

    this.state = {
      total: 0,
      average: 0,
      mode: 0,
      median: 0,
      variance: 0,
      deviation: 0
    }
  }

  componentDidMount() {
    this.setState({
      total: this.props.data.length
    });
  }

  render() {

    return (
      <Row>
        <h6>{this.props.name}</h6>
        <p>Total: {this.state.total}</p>
        <p>Média: {this.state.average}</p>
        <p>Moda: {this.state.mode}</p>
        <p>Mediana: {this.state.median}</p>
        <p>Variância: {this.state.variance}</p>
        <p>Devio Padrão: {this.state.deviation}</p>
      </Row>
    );
  }
}

export default CalcInfo;
