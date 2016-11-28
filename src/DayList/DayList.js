DayList.js
import React, { Component } from 'react';
import DayItem from '../DayItem/DayItem';

class DayList extends Component {
  constructor(props) {
  	super(pros);

  	this.state = {
  	  days: []
  	}
  }

  render() {
  	let divs = this.state.day.map((d, i) => {
  	  return (
  	  	<DayItem 
  	  	  key={i.toString()} />
	  );
  	});

    return (
      <div>
        {divs}
      </div>
    );
  }
}

export default DayList;
