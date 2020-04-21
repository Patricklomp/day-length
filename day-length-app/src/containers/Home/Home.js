import React from 'react';
import logo from '../../logo.svg';
import Header from '../../components/Header/Header'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import {Component} from 'react';
import {Box, Paper, Grid, IconButton, TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import axios from 'axios';
import home from './home.css';
import LocationMap from '../../components/Map/LocationMap';
import DayInfo from '../../components/DayInfo/DayInfo';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
const qs = require('querystring');

class Home extends Component{
  constructor(props){
    super();
    this.state = {
      longitude:  26.7290,
      latitude: 58.3780,
      date: "",
      day:[]
    }
    this.sunButtonClickHandler = this.sunButtonClickHandler.bind(this);
    this.fieldValueChangeHandler = this.fieldValueChangeHandler.bind(this);
    this.changeCoordinates = this.changeCoordinates.bind(this);
  }


  sunButtonClickHandler() {
    const longitude = this.state.longitude;
    const latitude = this.state.latitude;
    const date = this.state.date;

    if(longitude.length<=0 || latitude.length<=0 || date.length<=0){
      console.log("empty value");
    }
    this.setState({day: []});
    this.updateInformation(latitude, longitude, date);



  }
 
  fieldValueChangeHandler(event){
    let id = event.target.id;
    let value = event.target.value;
    switch (id) {
      case "latitude":
        if(isNaN(parseFloat(value)))
          break;
        this.setState({
          latitude: parseFloat(value)
        })
        break;
      case "longitude":
        if(isNaN(parseFloat(value)))
          break;
        this.setState({
          longitude: parseFloat(value)
        })
        break;
      case "date":
        this.setState({
          date: value
        })
        break;
    
      default:
        break;
    }
  }

  updateInformation(latitude, longitude, date){
    const requestBody = {
      latitude: latitude,
      longitude: longitude,
      date: date
    }
    axios.post("http://localhost:5000/daylength", qs.stringify(requestBody)).then(
      res => {
        const data = res.data.assets;
        
        this.setState({day: [data["sunrise"], data["sunset"], data["day_length"]]});
        
      }
    )
  }

  changeCoordinates(lat,long){
    console.log(this.state);
    this.setState({
      longitude: long,
      latitude: lat
    })
    
  }



  render(){
  let day = this.state.day;

  let info;
  if(day.length>0){
    info = <DayInfo day={day}/>
  }else{
    info = <Paper elevation={3} className="info-paper"><p>Sisesta latitude, longitude ja kuupäev, et näha päevapikkust või vali kuupäevade vahemik, et näha graafikut</p></Paper>
  }

  return (
    <Box className="App" >
      <Header/>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="insert-grid"
    >
      <TextField id="latitude" label="Latitude" variant="outlined" value={this.state.latitude}
      onChange={e => this.fieldValueChangeHandler(e)}
      />
      <TextField id="longitude" label="Longitude" variant="outlined" value={this.state.longitude}
      onChange={e => this.fieldValueChangeHandler(e)}
      />
      <TextField id="date" label="Kuupäev(YYYY-MM-DD)" variant="outlined" 
      onChange={e => this.fieldValueChangeHandler(e)}
      />
      <IconButton color="primary" aria-label="Vaata päevapikkust" onClick={this.sunButtonClickHandler}>
        <WbSunnyIcon />
      </IconButton>
    </Grid>
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    >
      <FormControlLabel
        control={<Checkbox icon={<DateRangeOutlinedIcon />} checkedIcon={<DateRangeIcon />} name="checkedH" />}
        label="Vali kuupäevade vahemik"
      />
    </Grid>
   
      <Box className="location-map">
      <LocationMap latitude={this.state.latitude} longitude={this.state.longitude} changeCoordinates = {this.changeCoordinates}></LocationMap>
      </Box>

      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center">

      {info}
      
      </Grid>

    </Box>
  );
  }
}

export default Home;
