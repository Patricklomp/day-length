import React from "react";
import {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, latLng } from "leaflet";
import {Box} from '@material-ui/core';
import "./map.css";

class LocationMap extends Component{
constructor(props){
  super(props)
  console.log(props);
  this.state = {
    latitude: 58.3780,
    longitude: 26.7290
  }
  this.markerDragEndHandler = this.markerDragEndHandler.bind(this);
}
componentWillReceiveProps(nextProps) {
  this.setState({
     latitude: nextProps.latitude,
     longitude: nextProps.longitude 
    });

    
}

markerDragEndHandler(e){
  let latlng = e.target._latlng;
  this.props.changeCoordinates(latlng["lat"], latlng["lng"]);
}
render(){
  let longitude = 0;
  let latitude = 0;
  longitude = this.state.longitude;
  latitude = this.state.latitude;
  
 const position = [latitude, longitude];
 console.log(position);
  return (
    <Box>
      <Map center={position} zoom={4}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

      <Marker 
      position={position}
      draggable={true}
      onDragEnd={e => this.markerDragEndHandler(e)}
      >
      <Popup>
            Your location
          </Popup>
      </Marker>
      </Map>

      
      </Box>
  );
}
}


export default LocationMap;
