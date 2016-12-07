import React, { Component } from 'react';
import { Collapsible, Row, Col, Card } from 'react-materialize';
import AtendInfo from '../AtendInfo/AtendInfo';
import moment from 'moment';
import { Line } from 'react-chartjs';
import groupArray from 'group-array';
import util from '../Util';

class ResultItem extends Component {
  constructor(props) {
    super(props);
  }

  createDataQueue(array) {

    const dates = array.map(x => ({
      date: moment(x.date).format('mm:ss:SS'),
      size: x.size
    }));
    const grouped = groupArray(dates, 'date');
    const keys = Object.keys(grouped);

    const temp = keys.map(key => {
      return grouped[key].reduce((p, c)  => p + c.size, 0);
    });

    return  {
        labels: keys.map(_ => ""),
        datasets: [{
            data: temp
        }]
    };
  }

  createDataArrival(array) {
    const dates = array.map(x => ({
      date: moment(x.processDate).format('mm:ss:SS'),
      size: x.size
    }));
    const grouped = groupArray(dates, 'date');
    const keys = Object.keys(grouped);

    const temp = keys.map(key => {
      return grouped[key].reduce((p, c)  => p + c.size, 0);
    });
    const lengths = keys.map(key => grouped[key].length);
    return {
        labels: keys.map(_ => ""),
        datasets: [{
            data: lengths
        }]
    };
  }

  getGraphs(item) {
    const opts = {
      responsive: true
    };

    return (
      <div>
        <p><b>Gráficos</b></p>

        <h6>Tamanho da fila</h6>
        <Line data={this.createDataQueue(item.queueLogs)}  options={opts} />

        <h6>Números de clientes que chegaram</h6>
        <Line data={this.createDataArrival(item.clients)} options={opts} />
      </div>
    );
  }

  render() {
    const item = this.props.data;

    return (
      <Col s={6} m={6}>
        <Card title={`Gerado às ${moment(item.end).format("HH:mm:ss")}`}>
          <Row>
            <p><b>Parâmetros</b></p>
            <Col s={5} m={5}>
              <p>Atendentes Normais: {item.normalNumber}</p>
            </Col>
            <Col s={5} m={5}>
              <p>Atendentes Especializados: {item.topNumber}</p>
            </Col>
            <Col s={2} m={2}>
              <p>Random: {item.random ? 'Sim' : 'Não'}</p>
            </Col>
          </Row>
          <Row>
            <p><b>Métricas</b></p>
            <Col s={6} m={6}>
              <p>Tempo total: {item.time}</p>
              <p>Tempo máximo para conclusão: {item.timeToComplete}</p>
              <p>Tempo máximo na fila: {item.timeInQueue}</p>
            </Col>
            <Col s={6} m={6}>
              <p>Tempo médio para conclusão: {Math.round(item.avgComplete * 100) / 100}</p>
              <p>Tempo médio na fila: {Math.round(item.avgInQuere * 100) / 100}</p>
              <p>Maior fila: {item.maxInQueue}</p>
            </Col>
          </Row>

          <p><b>Informações sobre os atendentes</b></p>

          <Collapsible>
            <AtendInfo
              name='Atendentes Especializados'
              data={item.topInfo}/>

            <AtendInfo
              name='Atendentes Normais'
              data={item.normaInfo}/>
          </Collapsible>

          {
            this.props.showGraph
            ? this.getGraphs(item) : null
          }
        </Card>
      </Col>
    );
  }
}

export default ResultItem;
