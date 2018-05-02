/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { MAPBOX_ACCESS_TOKEN } from './config_production'
import { API_URL_ORIGIN } from './config_production';
import { VERSION_GL_JS } from './constants';
import FEATURES from './features';
import { loadMapboxgl } from './load_mapboxgl';



export default class LocateMap extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.mapRef = null;
  
    this.state = {
      isMapLoaded: false
    };  
  }

  componentDidMount() {
    Promise.all([loadMapboxgl()]).then(this.initializeMap);
  }

  shouldComponentUpdate() {
    return false;
  }

  renderLoader() {
    console.log("renderLoader");
    return null;
    // if (this.state.isMapLoaded) return null;
    // return <LoaderLocal themeLoader="bg-black" />;
  }

  render() {
    let mapHeight = 360;
    if (this.props.showHotels) {
      mapHeight = 425;
    }
    return (
      <div>
        <Helmet>
          <link
            href={`${API_URL_ORIGIN}/mapbox-gl-js/v${VERSION_GL_JS}/mapbox-gl.css`}
            rel="stylesheet"
          />
        </Helmet>
        <div className="relative bg-fade-up" style={{ height: mapHeight }}>
          {/* {this.renderLoader()} */}
          <div
            className="mapboxgl-map"
            ref={ref => (this.mapRef = ref)}
            style={{ height: mapHeight }}
          />
        </div>
      </div>
    );
  }

  buildHotelInfo = feature => {
    return `<div>
        <p>
          <strong>${feature.properties.name}</strong>
        </p>
        <p>
          ${feature.properties.address}
          ${feature.properties.postalCode}
          ${feature.properties.state}
        </p>
        <p>
          ${feature.properties.pierDistance}
          <a href="${feature.properties.url}" target="_blank">
            <p>(Hotel website)</p>
          </a>
        </p>
      </div>`;
  };

  buildHotelFunctionality = (layer, event) => {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();

    let features;
    if (this.map) {
      this.map.getCanvas().style.cursor = 'pointer';
      // Need to appease Flow.
      if (this.map) {
        features = this.map.queryRenderedFeatures(event.point, {
          layers: [layer]
        });
      }
    }

    if (!features || !features.length) return;

    const feature = features[0];
    const hotelInfo = this.buildHotelInfo(feature);

    const popup = this.createPopup();

    popup
      .setLngLat(feature.geometry.coordinates)
      .setHTML(hotelInfo)
      .addTo(this.map);

    if (popUps[0]) {
      popUps[0].addEventListener('click', function() {
        popUps[0].remove();
      });
    }
  };

  createPopup = () => {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
    return popup;
  };

  clearPopup = () => {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    if (this.map) {
      this.map.getCanvas().style.cursor = '';
    }
  };

  addSVGMarker = (markers, className, map) => {
    markers.features.forEach(function(marker) {
      // create an HTML element for each feature
      var el = document.createElement('div');
      el.className = className;

      // make a marker for each feature and add to the map
      if (map !== null && map !== undefined) {
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      }
    });
  };

  locate2018Popup() {
    return '<div style="text-align:center">\
        <h3>Locate 2018</h3>\
        <h4>Pier 27, The Embarcadero</h4>\
        <p>San Francisco, CA 94111</p>\
      </div>';
  }

  initializeMap = () => {
    if (!this.mapRef) return;
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    let zoomLevel = 12.5;

    let mapConfig = {
      container: this.mapRef,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-122.41577883435139, 37.801],
      zoom: zoomLevel
    };
    if (this.props.preventScroll) {
      mapConfig.zoom = 13;
      mapConfig.dragPan = true;
      mapConfig.dragRotate = false;
      mapConfig.scrollZoom = false;
    }

    this.map = new mapboxgl.Map(mapConfig);

    // Need to appease Flow.
    if (this.map) {
      this.map.on('load', () => {
        this.setState({ isMapLoaded: true });

        if (this.props.showHotels) {
          // https://www.mapbox.com/mapbox-gl-js/api/#map%23addLayer
          // $FlowFixMe
          this.map.addLayer({
            id: 'hotel-symbol',
            type: 'circle',
            source: {
              type: 'geojson',
              data: FEATURES.hotels
            },
            paint: {
              'circle-radius': 10,
              'circle-color': '#4264fb'
            }
          });

          this.addSVGMarker(FEATURES.hotels, 'hotelmarker', this.map);

          // The `on` method accepts either two or three arguments.
          // https://www.mapbox.com/mapbox-gl-js/api/#map%23on
          // $FlowFixMe
          this.map.on('mouseenter', 'hotel-symbol', e => {
            this.buildHotelFunctionality('hotel-symbol', e);
          });
        }

        // $FlowFixMe
        this.map.addLayer({
          id: 'locate-symbol',
          type: 'circle',
          source: {
            type: 'geojson',
            data: FEATURES.locateMarker
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#4264fb'
          }
        });

        // This is needed so we can add svg programatically
        this.addSVGMarker(FEATURES.locateMarker, 'locatemarker', this.map);

        // Map listeners
        // The `on` method accepts either two or three arguments.
        // https://www.mapbox.com/mapbox-gl-js/api/#map%23on
        // $FlowFixMe
        this.map.on('mouseenter', 'locate-symbol', e => {
          this.clearPopup();
          // $FlowFixMe
          const features = this.map.queryRenderedFeatures(e.point, {
            layers: ['locate-symbol']
          });

          if (!features.length) return;

          const feature = features[0];

          const popup = this.createPopup();
          popup
            .setLngLat(feature.geometry.coordinates)
            .setHTML(this.locate2018Popup())
            .addTo(this.map);
        });

        // $FlowFixMe
        this.map.on('click', () => {
          this.clearPopup();
        });
      });
    }
  }
}