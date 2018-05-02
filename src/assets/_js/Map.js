import React from "react";
import ReactDOM from "react-dom";
import LocateMap from './mapbox/locate_map';

const wrapper = document.getElementById("map")

const Map = () => {
  return (
    <LocateMap showHotels={true} preventScroll={true} />
  );
};

export default Map;

if(wrapper) {
  ReactDOM.render(<Map />, wrapper);
}

