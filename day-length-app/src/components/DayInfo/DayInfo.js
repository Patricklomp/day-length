import React from "react";
import {Component} from 'react';

import {Paper, Grid} from '@material-ui/core';
import LooksOutlinedIcon from '@material-ui/icons/LooksOutlined';
import dayinfo from './dayinfo.css';

class DayInfo extends Component{
constructor(props){
  super(props)
  const day = props.day;
  this.state = {
    sunrise: day[0],
    sunset: day[1],
    day_length: day[2]
  }

}


render(){
  const sunrise = this.state.sunrise;
  const sunset = this.state.sunset;
  const day_length = this.state.day_length;

 
const styles = {
    largeicon:{
        width: 120,
        height: 120
    }
}
  return (
    <Paper className="day-paper">
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        
        >
        <LooksOutlinedIcon
        className="day-icon"
        style={styles.largeicon}
        color="primary"
        ></LooksOutlinedIcon>
        </Grid>
        <Paper><h2>Päeva info</h2></Paper>
        <Paper><h3>Päikesetõus: </h3><h3>{sunrise}</h3></Paper>
        <Paper><h3>Päikeseloojang:</h3><h3>{sunset}</h3></Paper>
        <Paper><h3>Päeva pikkus: </h3><h3>{day_length}</h3></Paper>
        
    </Paper>
  );
}
}


export default DayInfo;
