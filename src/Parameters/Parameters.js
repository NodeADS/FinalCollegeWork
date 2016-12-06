import React, { Component } from 'react';
import { Row, Button, Input, ProgressBar } from 'react-materialize';
import util from '../Util';
import j from '../../data.json';
import store from 'store';

class Parameters extends Component {
  constructor(props) {
    super(props);
    const json = store.get('JSON') || j;

    this.state = {
      text: JSON.stringify(json),
      data: json,
      atendNormal: store.get('ATEND_NORMAL'),
      atendTop: store.get('ATEND_TOP'),
      processing: false
    }

    this.dataChange = this.dataChange.bind(this);
    this.clickedBtn = this.clickedBtn.bind(this);
    this.atendNormalChange = this.atendNormalChange.bind(this);
    this.atendTopChange = this.atendTopChange.bind(this);
  }

  dataChange(e) {
    let json = [];

    try {
      json = JSON.parse(e.target.value);
      store.set('JSON', json);
    } catch (e) { }

    this.setState({
      text: e.target.value,
      data: json
    });
  }

  atendNormalChange(e) {
    store.set('ATEND_NORMAL', e.target.value);
    this.setState({
      atendNormal: e.target.value
    });
  }

  atendTopChange(e) {
    store.set('ATEND_TOP', e.target.value);
    this.setState({
      atendTop: e.target.value
    });
  }

  validNumber(n) {
    var number = parseInt(n);

    return number !== NaN && number >= 0;
  }

  clickedBtn() {
    if (!this.validNumber(this.state.atendNormal)) {
      alert('Número Atendente inválido!');
      return;
    }
    if (!this.validNumber(this.state.atendTop)) {
      alert('Número Atendente Especializado inválido!');
      return;
    }
    if (parseInt(this.state.atendTop) === 0 && parseInt(this.state.atendNormal) === 0) {
      alert('Número de atendentes tem que ser maior que 0!');
      return;
    }

    this.setState({
      processing: true
    });

    const json = this.state.data;
    const days = util.splitByDay(json);
    const list = util.splitByPosto(json);

    const arrivals = Object.keys(days).map(key => {
      const day = days[key];
      return util.listClients(day);
    })
    .reduce((p, c) => {
      p = p.concat(c);
      return p;
    },[]);

    const temp = Object.keys(list).map(key => {
      const atends = list[key];
      const info = util.postoAvagAtend(atends);
      info.posto = key;

      return info;
    });

    const quartile1 = util.getQuartile1(temp.map(i => i.average));
    const normal = temp.filter(item => item.average > quartile1);
    const top = temp.filter(item => item.average <= quartile1);

    this.props.onChangeNormalAtend(normal);
    this.props.onChangeTopAtend(top);
    this.props.onChangeDay(days);
    this.props.onProcess(
      arrivals,
      normal,
      parseInt(this.state.atendNormal),
      top,
      parseInt(this.state.atendTop),
      () => {

        this.setState({
          processing: false
        });
      }
    );
  }

  render() {
    return (
      <Row>
        <textarea
          className='materialize-textarea'
          placeholder='JSON'
          value={this.state.text}
          onChange={this.dataChange}></textarea>

        <Input s={6}
          label="Atend. Normal"
          defaultValue={this.state.atendNormal}
          onChange={this.atendNormalChange} />

          <Input s={6}
            label="Atend. Especializado"
            defaultValue={this.state.atendTop}
            onChange={this.atendTopChange} />

          {
            this.state.processing
            ? <ProgressBar />
            : <Button onClick={this.clickedBtn}>Processar</Button>
          }
      </Row>
    );
  }
}

export default Parameters;
