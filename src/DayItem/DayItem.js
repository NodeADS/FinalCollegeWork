import React, { Component } from 'react';
import { Col, CardPanel } from 'react-materialize';
import CalcInfo from '../CalcInfo/CalcInfo';
import util from '../Util';

class DayItem extends Component {
  render() {
    const json = this.props.services;
    const chegada = util.filerSortAndFormat(json, 'dataChegada');
    const atendimento = util.filerSortAndFormat(json, 'dataAtendimento');
    const conclusao = util.filerSortAndFormat(json, 'dataConclusao');

    return (
      <Col s={12} m={2}>
          <CardPanel>
              <span>{this.props.day}</span>
          </CardPanel>
          <CalcInfo
            name='Chegada'
            data={chegada}/>

          <CalcInfo
            name='Atendimento'
            data={atendimento}/>

          <CalcInfo
            name='Conclusao'
            data={conclusao}/>
      </Col>
    );
  }
}

export default DayItem;
