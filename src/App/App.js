import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import Parameters from '../Parameters/Parameters';
import './App.css';
import util from '../Util';
import Executor from '../Executor';
import Manager from '../Manager';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: [],
      normal: null,
      top: null,
      details: null
    }

    this.onChangeNormalAtend = this.onChangeNormalAtend.bind(this);
    this.onChangeTopAtend = this.onChangeTopAtend.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onProcess = this.onProcess.bind(this);
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
          <h6>Atendente Especializado</h6>
          <p>Média: {util.getAverage(list.map(i => i.average))}</p>
          <p>Variância: {util.getAverage(list.map(i => i.variance))}</p>
        </Col>
      )
    });
  }

  onProcess(list, normal, normalNumber, top, topNumber, callback) {
    const begin = new Date();
    const weight = 1;
    const normalAvg = util.getAverage(normal.map(i => i.average));
    const normalVar = util.getAverage(normal.map(i => i.variance));
    const topAvg = util.getAverage(top.map(i => i.average));
    const topVar = util.getAverage(top.map(i => i.variance));
    const normalExec = new Executor(normalNumber, weight, ((normalVar * weight) / normalAvg));
    const topExec = new Executor(topNumber, ((topAvg * weight) / normalAvg), ((topVar * weight) / normalAvg));
    let arr = 0;
    let lastIndex = list.length - 1;
    let completed = 0;

    const manager = new Manager([normalExec, topExec], (client) => {
      completed++;
      if (completed == list.length) {
        const end = new Date();
        callback();

        this.setState({
          details: (
            <Col s={4} m={4}>
              <h6>Informações de atendimentos</h6>
              <p>Tempo total em milisegundos: {end - begin}</p>
            </Col>
          )
        });
      }

    });


    list.forEach((client, i) => {
      arr += client.arrival;

      setTimeout(() => {
        manager.process(client);
      }, arr);
    });
  }

  render() {
    return (
      <div>
        <Parameters
          onChangeDay={this.onChangeDay}
          onChangeNormalAtend={this.onChangeNormalAtend}
          onChangeTopAtend={this.onChangeTopAtend}
          onProcess={this.onProcess} />

        <Row>
          {this.state.normal}
          {this.state.top}
        </Row>
        <Row>
          {this.state.details}
        </Row>
      </div>
    );
  }
}

export default App;
