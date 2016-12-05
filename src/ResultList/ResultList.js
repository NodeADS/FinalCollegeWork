import React, { Component } from 'react';
import { Collection, CollectionItem, Collapsible, CollapsibleItem, Row, Col, CardPanel, Card } from 'react-materialize';
import AtendInfo from '../AtendInfo/AtendInfo';
import moment from 'moment';

class ResultList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divs = this.props.data
    .sort((a, b) => b.date - a.date)
    .map((item, i) => {
      return (
        <Col s={4} m={4}
          key={i.toString()}>

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
                <p>Tempo total em milisegundos: {item.time}</p>
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
    });

    if (this.props.data.length == 0) return null;

    return (
      <div>
        <h5><b>Resultados</b></h5>
        <Row>
          {divs}
        </Row>
      </div>
    );
  }
}

export default ResultList;
