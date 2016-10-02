import React from 'react';
import StarsRating from './StarsRating.js'
import '../styles/Popup.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className='popup-content'>
        <h4 className='popup-name'>{this.props.name}</h4>
        <StarsRating stars={this.props.stars} />
      </div>
    );
  }
});
