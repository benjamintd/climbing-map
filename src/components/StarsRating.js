import React from 'react';
import FontAwesome from 'react-fontawesome';
import '../styles/StarsRating.css';

module.exports = React.createClass({
  render: function() {
    return (
      <div className='stars-rating'>
      {
       [...Array(5).keys()].map(function(i) {
         var name = 'star-o';
         if (this.props.stars > i) name = 'star';
         if (this.props.stars > i && this.props.stars < i + 1) name = 'star-half-o';
         return (
           <FontAwesome key={i} name={name}/>
         )
       }.bind(this))
     }
      </div>
    );
  }
});
