import React, { Component } from 'react';
import Parameters from '../Parameters/Parameters';
import DayList from '../DayList/DayList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: []
    }

    this.onChangeDay = this.onChangeDay.bind(this);
  }

  onChangeDay(days) {
    this.setState({
      days: days
    });
  }

  render() {
    return (
      <div>
        <Parameters
          onChangeDay={this.onChangeDay} />

        <DayList
          days={this.state.days}/>
      </div>
    );
  }
}

export default App;
