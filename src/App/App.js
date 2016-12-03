import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import Parameters from '../Parameters/Parameters';
import './App.css';
import util from '../Util';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: [],
      normal: null,
      top: null
    }

    this.onChangeNormalAtend = this.onChangeNormalAtend.bind(this);
    this.onChangeTopAtend = this.onChangeTopAtend.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
  }

  onChangeDay(days) {
    this.setState({
      days: days
    });
  }

  onChangeNormalAtend(list) {
    this.setState({
      normal: (
        <Col s={4} m={4}>
          <h6>Atendente Normal</h6>
          <p>Média: {util.getAverage(list.map(i => i.average))}</p>
          <p>Variância: {util.getAverage(list.map(i => i.variance))}</p>
        </Col>
      )
    });
  }

  onChangeTopAtend(list) {
    this.setState({
      top: (
        <Col s={4} m={4}>
          <h6>Atendente Bom</h6>
          <p>Média: {util.getAverage(list.map(i => i.average))}</p>
          <p>Variância: {util.getAverage(list.map(i => i.variance))}</p>
        </Col>
      )
    });
  }

  render() {
    return (
      <div>
        <Parameters
          onChangeDay={this.onChangeDay}
          onChangeNormalAtend={this.onChangeNormalAtend}
          onChangeTopAtend={this.onChangeTopAtend} />

        <Row>
          {this.state.normal}
          {this.state.top}
        </Row>
      </div>
    );
  }
}

export default App;
