import React, { Component } from 'react';
import { CollapsibleItem, Table } from 'react-materialize';
import './AtendInfo.css';

class AtendInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const list = this.props.data.map((obj, i) => (
      <li
        className='atendente-info'
        key={i.toString()}>
        Atendente <b>{obj.atend}</b> atendeu em <b>{Math.round(obj.busy * 10000) / 100}%</b> do seu tempo <b>{obj.clients}</b> clientes
      </li>
    ));

    return (
      <CollapsibleItem header={this.props.name}>
        {this.props.data.length > 0
          ? <ul>{list}</ul>
        : <span className='atendente-info'>Sem atendentes</span>}
      </CollapsibleItem>
    );
  }
}

export default AtendInfo;
