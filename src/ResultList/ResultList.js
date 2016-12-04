import React, { Component } from 'react';
import { Collection, CollectionItem } from 'react-materialize';

class ResultList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divs = this.props.data
    .sort((a, b) => b.date - a.date)
    .map((item, i) => {
      const busyNormal = item.normaAtendBusy.map((obj, i) => (
        <p key={i.toString()}>Atendente Normal {obj.atend} atendeu em {Math.round(obj.busy * 10000) / 100}% do seu tempo</p>
      ));
      const busytop = item.topAtendBusy.map((obj, i) => (
        <p key={i.toString()}>Atendente Especializado {obj.atend} atendeu em {Math.round(obj.busy * 10000) / 100}% do seu tempo</p>
      ));
      
      return (
        <CollectionItem key={i.toString()}>
          <h6>Informações de atendimentos</h6>
          <p>Atendentes Normais: {item.normalNumber} / Atendentes Especializados: {item.topNumber}</p>
          <p>Tempo total em milisegundos: {item.time}</p>
          <p>Tempo máximo para conclusão: {item.timeToComplete}</p>
          <p>Tempo máximo na fila: {item.timeInQueue}</p>
          <p>Tempo médio para conclusão: {item.avgComplete}</p>
          <p>Tempo médio na fila: {item.avgInQuere}</p>
          <p>Maior fila: {item.maxInQueue}</p>
          <b>Informações sobre os atendentes</b>
          {busytop}
          {busyNormal}
        </CollectionItem>
      );
    });

    return (
      <Collection>
        {divs}
      </Collection>
    );
  }
}

export default ResultList;
