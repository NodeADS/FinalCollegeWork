import React, { Component } from 'react';
import { Row, Button } from 'react-materialize';
import util from '../Util';
import j from '../../data.json';

class Parameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: JSON.stringify(j),
      data: j
    }

    this.dataChange = this.dataChange.bind(this);
    this.clickedBtn = this.clickedBtn.bind(this);
  }

  dataChange(e) {
    let json = [];

    try {
      json = JSON.parse(e.target.value);
    } catch (e) { }

    this.setState({
      text: e.target.value,
      data: json
    });
  }

  clickedBtn() {
    const json = this.state.data;
    const days = util.splitByDay(json);

    this.props.onChangeDay(days);
  }

  render() {
    return (
      <Row>
        <textarea
          className='materialize-textarea'
          placeholder='JSON'
          value={this.state.text}
          onChange={this.dataChange}></textarea>

        <Button onClick={this.clickedBtn}>Do It</Button>
      </Row>
    );
  }
}

export default Parameters;
