/* global mapboxgl */

import React from 'react';
import '../styles/Sidebar.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className='sidebar'>
        <Header />
        <GymsList state={this.props.state}/>
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <div className='sidebar-header'>
        <h2 className='sidebar-title'>
          Climbing gyms around the world
        </h2>
      </div>
    );
  }
});

var GymsList = React.createClass({
  render: function() {
    return (
      <ul className='gym-list'>
      {
        this.props.state.gyms.map(function(gym) {
          return <GymRow gym={gym}
                         key={gym.properties.key}
                         map={this.props.state.map}
                         popup={this.props.state.popup}/>
        }.bind(this))
      }
    </ul>
    );
  }
});

var GymRow = React.createClass({
  render: function() {
    return (
      <li onMouseOver={this.createPopup}>
        <div className='gym'>
          <h4 className='gym-name'>{this.props.gym.properties.name}</h4>
          <img src={this.props.gym.properties.image} alt={this.props.gym.properties.name} />
          <p className='gym-description'>{this.props.gym.properties.description}</p>
        </div>
      </li>
    );
  },
  createPopup: function() {
    this.props.popup.setLngLat(this.props.gym.geometry.coordinates)
         .setText(this.props.gym.properties.name)
         .addTo(this.props.map);
  }
});
