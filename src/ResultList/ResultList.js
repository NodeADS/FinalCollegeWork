import React, { Component } from 'react';
import { Row } from 'react-materialize';
import ResultItem from '../ResultItem/ResultItem';

class ResultList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divs = this.props.data
    .sort((a, b) => b.date - a.date)
    .map((item, i) => {

      return (
        <ResultItem
          key={i.toString()}
          data={item}/>
      );
    });

    if (this.props.data.length == 0) return null;


    return (
      <div>
        <h5><b>Resultados</b></h5>
        <h6>* Todos os valores das métricas são em <b>segundos</b>.</h6>
        <Row>
          {divs}
        </Row>
      </div>
    );
  }
}

export default ResultList;
