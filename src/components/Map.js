/* global mapboxgl */

import React from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW50ZCIsImEiOiJjaW83enIwNjYwMnB1dmlsejN6cDBzbm93In0.0ZOGwSLp8OjW6vCaEKYFng';

var DATA = require('../data/data.json');

module.exports = React.createClass({
  render: function() {
    return (
      <div id='map' className='map'></div>
    );
  },
  componentDidMount: function() {
    this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/benjamintd/citrha4lg000a2jmgtsoqdfvn'
    });

    this.popup = new mapboxgl.Popup({
        closeButton: false
    });

    this.update = function() {
      var features = this.map.queryRenderedFeatures({layers:['gyms']});
      features = getUniqueFeatures(features, 'key');
      if (features) {
        this.props.onUpdate(features);
      }
    }.bind(this);

    this.map.on('load', function() {
      this.map.addSource('gyms', {
        'type': 'geojson',
        'data': DATA
      });

      this.map.addLayer({
        'id': 'gyms',
        'source': 'gyms',
        'type': 'symbol',
        'layout': {
            'icon-image': 'circle-15',
            'icon-allow-overlap':true
        }
      });

      this.props.onLoad(this.map, this.popup);

      this.map.on('moveend', this.update);

      this.map.on('mousemove', function(e) {
        var features = this.map.queryRenderedFeatures(e.point, {
            layers: ['gyms']
        });

        // Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';

        if (!features.length) {
            this.popup.remove();
            return;
        }

        var feature = features[0];
        // Populate the popup and set its coordinates
        // based on the feature found.
        this.popup.setLngLat(feature.geometry.coordinates)
                  .setText(feature.properties.name)
                  .addTo(this.map);
      }.bind(this));

    }.bind(this));
  }
});

function getUniqueFeatures(array, comparatorProperty) {
    var existingFeatureKeys = {};
    // Because features come from tiled vector data, feature geometries may be split
    // or duplicated across tile boundaries and, as a result, features may appear
    // multiple times in query results.
    var uniqueFeatures = array.filter(function(el) {
        if (existingFeatureKeys[el.properties[comparatorProperty]]) {
            return false;
        } else {
            existingFeatureKeys[el.properties[comparatorProperty]] = true;
            return true;
        }
    });

    return uniqueFeatures;
}
