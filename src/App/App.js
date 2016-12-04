import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import Parameters from '../Parameters/Parameters';
import './App.css';
import util from '../Util';
import Executor from '../Executor';
import Manager from '../Manager';
import ResultList from '../ResultList/ResultList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: [],
      normal: null,
      top: null,
      resultList: []
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
          <p>Desvio Padrão: {util.getAverage(list.map(i => i.deviation))}</p>
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
          <p>Desvio Padrão: {util.getAverage(list.map(i => i.deviation))}</p>
        </Col>
      )
    });
  }

  onProcess(list, normal, normalNumber, top, topNumber, callback) {
    const begin = new Date();
    const weight = 1;
    const normalAvg = util.getAverage(normal.map(i => i.average));
    const normalVar = util.getAverage(normal.map(i => i.variance));
    const normalDev = util.getAverage(normal.map(i => i.deviation));
    const topAvg = util.getAverage(top.map(i => i.average));
    const topVar = util.getAverage(top.map(i => i.variance));
    const topDev = util.getAverage(top.map(i => i.deviation));
    const normalExec = new Executor(normalNumber, weight, ((normalVar * weight) / normalAvg), ((normalDev * weight) / normalAvg));
    const topExec = new Executor(topNumber, ((topAvg * weight) / normalAvg), ((topVar * weight) / normalAvg), ((topDev * weight) / normalAvg));
    let arr = 0;
    let lastIndex = list.length - 1;
    let completed = 0;
    let clientsInfo = [];

    const manager = new Manager([topExec, normalExec], (client) => {
      clientsInfo.push(client);
      completed++;
      if (completed == list.length) {
        const end = new Date();
        const maxInQueue = manager.maxInQueue;
        const timeToComplete = manager.itemMostDelayed.timeToComplete;
        const timeInQueue = manager.itemMostTimeInQueue.timeInQueue;
        const avgComplete = util.getAverage(clientsInfo.map(i => i.timeToComplete));;
        const avgInQuere = util.getAverage(clientsInfo.map(i => i.timeInQueue));;
        const normaAtendBusy = normalExec.getBusyPercent(end);
        const topAtendBusy = topExec.getBusyPercent(end);
        let resultList = this.state.resultList;

        resultList.push({
          date: begin,
          normalNumber,
          topNumber,
          timeToComplete,
          timeInQueue,
          avgComplete,
          avgInQuere,
          maxInQueue,
          normaAtendBusy,
          topAtendBusy,
          infoNormalExec: normalExec.processesInfo,
          infoTopExec: topExec.processesInfo,
          begin,
          end,
          time: end - begin
        });

        callback();

        this.setState({
          resultList: resultList
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
        <ResultList
          data={this.state.resultList}/>
      </div>
    );
  }
}

export default App;
