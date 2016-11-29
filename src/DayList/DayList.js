import React, { Component } from 'react';
import { Row } from 'react-materialize';
import DayItem from '../DayItem/DayItem';

class DayList extends Component {
  render() {
    let divs = Object.keys(this.props.days).map((key, i) => {
      return (
  	  	<DayItem
  	  	  key={i.toString()}
          day={key}
          services={this.props.days[key]} />
	     );
  	});

    return (
      <Row>
        {divs[0]}
      </Row>
    );
  }
}

export default DayList;
