import React from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './styles/App.css';

module.exports = React.createClass({
  getInitialState: function(){
    return {
      gyms: [],
      map: undefined,
      popup: undefined
    };
  },
  render: function () {
    return (
      <div>
        <Sidebar state={this.state}/>
        <Map onUpdate={this.updateGyms} onLoad={this.setMap}/>
      </div>
    );
  },
  updateGyms: function(gyms) {
    this.setState({
      gyms: gyms
    });
  },
  setMap: function(map, popup) {
    this.setState({
      map: map,
      popup: popup
    });
  }
});
