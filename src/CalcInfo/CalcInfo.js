import React, { Component } from 'react';
import { Col } from 'react-materialize';
import util from '../Util';

class CalcInfo extends Component {
  constructor(props) {
  	super(props);

    this.state = {
      average: 0,
      mode: 0,
      median: 0,
      variance: 0,
      deviation: 0
    }
  }

  componentDidMount() {
    const list = util.listInterval(this.props.data);
    const numbers = list.reduce((p, c) => {
      p.push(c.interval);
      return p;
    }, []);
    const average = util.getAverage(numbers);
    const variance = util.getVariance(numbers, average);

    this.setState({
      average: average,
      mode: util.getMode(numbers),
      median: util.getMedian(numbers),
      variance: variance,
      deviation: util.getDeviation(variance)
    });
  }

  render() {

    return (
      <Col s={4} m={4}>
        <h6>{this.props.name}</h6>
        <p>Média: {this.state.average}</p>
        <p>Moda: {this.state.mode}</p>
        <p>Mediana: {this.state.median}</p>
        <p>Variância: {this.state.variance}</p>
        <p>Devio Padrão: {this.state.deviation}</p>
      </Col>
    );
  }
}

export default CalcInfo;
