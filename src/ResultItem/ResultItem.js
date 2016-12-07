import React, { Component } from 'react';
import { Collapsible, Row, Col, Card } from 'react-materialize';
import AtendInfo from '../AtendInfo/AtendInfo';
import moment from 'moment';
import { Line } from 'react-chartjs';
import groupArray from 'group-array';

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

  createDataAtend() {

    return {
        labels: ['',''],
        datasets: [{
            'atendente 1': 10,
            'atendente 2': 0,
        },{
            'atendente 1': 130,
            'atendente 2': 60,
        }]
    };
  }

  render() {
    const item = this.props.data;

    // item.normaInfo.map(atend => {
    //   console.log(atend.atend, atend.logs);
    // });


    const opts = {
      responsive: true
    };
    return (
      <Col s={6} m={6}>
        <Card title={`Gerado às ${moment(item.end).format("HH:mm:ss")}`}>
          <Row>
            <p><b>Parâmetros</b></p>
            <Col s={6} m={6}>
              <p>Atendentes Normais: {item.normalNumber}</p>
            </Col>
            <Col s={6} m={6}>
              <p>Atendentes Especializados: {item.topNumber}</p>
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

          <p><b>Gráficos</b></p>

          <h6>Tamanho da fila</h6>
          <Line data={this.createDataQueue(item.queueLogs)}  options={opts} />

          <h6>Números de clientes que chegaram</h6>
          <Line data={this.createDataArrival(item.clients)} options={opts} />


        </Card>
      </Col>
    );
  }
}
// <h6>Teste</h6>
// <Line data={this.createDataAtend(item.clients)} options={opts} />
export default ResultItem;
