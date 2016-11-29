import React, { Component } from 'react';
import { Row, Col, CardPanel, Badge } from 'react-materialize';
import CalcInfo from '../CalcInfo/CalcInfo';
import util from '../Util';

class DayItem extends Component {
  render() {
    const json = this.props.services;
    const chegada = util.filerSortAndFormat(json, 'dataChegada');
    const atendimento = util.filerSortAndFormat(json, 'dataAtendimento');
    const conclusao = util.filerSortAndFormat(json, 'dataConclusao');

    return (
      <Col s={12} m={12}>
          <CardPanel>
              <span>{this.props.day}</span>
              <Badge>{json.length}</Badge>
          </CardPanel>
          <Row>
            <CalcInfo
              name='Chegada'
              data={chegada}/>

            <CalcInfo
              name='Atendimento'
              data={atendimento}/>

            <CalcInfo
              name='Conclusao'
              data={conclusao}/>
          </Row>
      </Col>
    );
  }
}

export default DayItem;
