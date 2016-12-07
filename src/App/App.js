import React, { Component } from 'react';
import { Row, Col, CardPanel } from 'react-materialize';
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
      resultList: [],
      random: true,
      graph: false
    }

    this.onChangeNormalAtend = this.onChangeNormalAtend.bind(this);
    this.onChangeTopAtend = this.onChangeTopAtend.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onProcess = this.onProcess.bind(this);
    this.onRandomChange = this.onRandomChange.bind(this);
    this.onGraphChange = this.onGraphChange.bind(this);
  }

  onRandomChange(check) {
    this.setState({
      random: check
    });
  }

  onGraphChange(check) {
    this.setState({
      graph: check
    });
  }

  onChangeDay(days) {
    this.setState({
      days: days
    });
  }

  onChangeNormalAtend(list) {
    this.setState({
      normal: (
        <Col s={3} m={3}>
          <CardPanel>
            <h6><b>Atendente Normal</b></h6>
            <p>Média: {util.getAverage(list.map(i => i.average))}</p>
            <p>Variância: {util.getAverage(list.map(i => i.variance))}</p>
            <p>Desvio Padrão: {util.getAverage(list.map(i => i.deviation))}</p>
          </CardPanel>
        </Col>
      )
    });
  }

  onChangeTopAtend(list) {
    this.setState({
      top: (
        <Col s={3} m={3}>
          <CardPanel>
            <h6><b>Atendente Especializado</b></h6>
            <p>Média: {util.getAverage(list.map(i => i.average))}</p>
            <p>Variância: {util.getAverage(list.map(i => i.variance))}</p>
            <p>Desvio Padrão: {util.getAverage(list.map(i => i.deviation))}</p>
          </CardPanel>
        </Col>
      )
    });
  }

  onProcess(list, normal, normalNumber, top, topNumber, callback) {
    const begin = new Date();
    const weight = 1;
    const random = this.state.random;
    const normalAvg = util.getAverage(normal.map(i => i.average));
    const normalVar = util.getAverage(normal.map(i => i.variance));
    const normalDev = util.getAverage(normal.map(i => i.deviation));
    const topAvg = util.getAverage(top.map(i => i.average));
    const topVar = util.getAverage(top.map(i => i.variance));
    const topDev = util.getAverage(top.map(i => i.deviation));

    const normalExec = new Executor(normalNumber, weight, ((normalVar * weight) / normalAvg), ((normalDev * weight) / normalAvg), random);
    const topExec = new Executor(topNumber, ((topAvg * weight) / normalAvg), ((topVar * weight) / normalAvg), ((topDev * weight) / normalAvg), random);
    let arr = 0;
    let lastIndex = list.length - 1;
    let completed = 0;
    let clientsInfo = [];

    const manager = new Manager([topExec, normalExec], (client) => {
      clientsInfo.push(client);
      completed++;
      if (completed == list.length) {
        const end = new Date();
        const queueLogs = manager.queueLogs;
        const maxInQueue = manager.maxInQueue;
        const timeToComplete = manager.itemMostDelayed.timeToComplete;
        const timeInQueue = manager.itemMostTimeInQueue.timeInQueue;
        const avgComplete = util.getAverage(clientsInfo.map(i => i.timeToComplete));;
        const avgInQuere = util.getAverage(clientsInfo.map(i => i.timeInQueue));;
        const normaInfo = normalExec.getInfo(end);
        const topInfo = topExec.getInfo(end);
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
          normaInfo,
          topInfo,
          infoNormalExec: normalExec.processesInfo,
          infoTopExec: topExec.processesInfo,
          begin,
          end,
          queueLogs,
          random,
          clients: list,
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
          onProcess={this.onProcess}
          randomChange={this.onRandomChange}
          graphChange={this.onGraphChange} />

        <Row>
          {this.state.normal}
          {this.state.top}
        </Row>
        <ResultList
          data={this.state.resultList}
          showGraph={this.state.graph}/>
      </div>
    );
  }
}

export default App;
