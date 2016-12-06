import React, { Component } from 'react';
import { Collapsible, Row, Col, Card } from 'react-materialize';
import AtendInfo from '../AtendInfo/AtendInfo';
import moment from 'moment';
// import { Line } from 'react-chartjs';
// import groupArray from 'group-array';

class ResultItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.data;
    // const aa = item.clients.map(x => {
    //   console.log(x.processDate);
    //   return {
    //     data: moment(x.processDate).format('DD/MM/YYYY HH:mm'),
    //     count: 1
    //   };
    // });
    // const bb = groupArray(aa, 'data');
    // const data = {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [{
    //         label: '# of Votes',
    //         data: [12, 19, 3, 5, 2, 3]
    //     }]
    // };
    // const opts = {
    //   responsive: false
    // };
    // const a = item.clients.map(x => x.processDate);
    // console.log(aa);
    //<Line data={data} options={opts} />
    return (
      <Col s={4} m={4}>

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
        </Card>
      </Col>
    );
  }
}

export default ResultItem;
