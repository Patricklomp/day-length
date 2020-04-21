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
import Graph from '../../components/Graph/Graph';
const qs = require('querystring');

class Home extends Component{
  constructor(props){
    super();
    this.state = {
      longitude:  26.7290,
      latitude: 58.3780,
      date: "2020-04-21",
      day:[],
      enableDateRange: false,
      dateRange: ["2020-04-21", "2020-04-21"],
      dateRangeData: []
    }
    this.sunButtonClickHandler = this.sunButtonClickHandler.bind(this);
    this.fieldValueChangeHandler = this.fieldValueChangeHandler.bind(this);
    this.changeCoordinates = this.changeCoordinates.bind(this);
    this.checkBoxHandler = this.checkBoxHandler.bind(this);
  }


  sunButtonClickHandler() {
    const longitude = this.state.longitude;
    const latitude = this.state.latitude;
    const date = this.state.date;
    const dateRange = this.state.dateRange;

    if(longitude.length<=0 || latitude.length<=0 || date.length<=0){
      console.log("empty value");
    }
    this.setState({day: []});

    //When date range is enabled use updateWhenRangeInformation otherwise use updateInformation
    if(!this.state.enableDateRange)
    this.updateInformation(latitude, longitude, date);
    else
    this.updateWhenRangeInformation(latitude, longitude, date, dateRange);


  }
 
  fieldValueChangeHandler(event){
    //Handling every field value change

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
      case "dateStart":
        this.setState({
          dateRange: [value, this.state.dateRange[1]]
        })
        break;
      case "dateEnd":
        this.setState({
          dateRange: [this.state.dateRange[0],value]
        })
        break;
    
      default:
        break;
    }
  }

  
  checkBoxHandler(event){
    this.setState({enableDateRange: !this.state.enableDateRange});
  }

  updateInformation(latitude, longitude, date){
    const requestBody = {
      latitude: latitude,
      longitude: longitude,
      date: date
    }
    console.log(date);
    axios.post("http://localhost:5000/daylength", qs.stringify(requestBody)).then(
      res => {
        const data = res.data.assets;
        
        this.setState({day: [data["sunrise"], data["sunset"], data["day_length"]]});
        
      }
    )
  }

  updateWhenRangeInformation(latitude, longitude,date, dateRange){

    //Baasinfo kindla päeva kohta
    this.updateInformation(latitude, longitude, date);

    //Päevadeinfo järjendi kättesaamine
    const requestBody = {
      latitude: latitude,
      longitude: longitude,
      dateRange: dateRange
    }

    axios.post("http://localhost:5000/dayrange", qs.stringify(requestBody)).then(
      res => {
        const data = res.data.assets;
        this.setState({dateRangeData: data["dateRangeData"]});
        
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
  //If day has been set show DayInfo
  if(day.length>0){
    info = <DayInfo day={day}/>
  }else{
    info = <Paper className="info-paper"><p>Sisesta latitude, longitude ja kuupäev, et näha päevapikkust</p></Paper>
  }

  let dateRangeSelection = <div></div>;

  //If enabled ranged check button is checked show option to choose daterange
  if(this.state.enableDateRange){
    dateRangeSelection = <div>
      <TextField id="dateStart"  type="date" variant="outlined" defaultValue={new Date().toJSON().slice(0,10)}
      onChange={e => this.fieldValueChangeHandler(e)}
      />
      <TextField id="dateEnd"  type="date" variant="outlined" defaultValue={new Date().toJSON().slice(0,10)}
      onChange={e => this.fieldValueChangeHandler(e)}
      />
    </div>
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
      <TextField id="date"  variant="outlined" type="date" defaultValue={new Date().toJSON().slice(0,10)}
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
        control={<Checkbox icon={<DateRangeOutlinedIcon />} onChange = {this.checkBoxHandler} checkedIcon={<DateRangeIcon />} checked={this.state.enableDateRange} name="checkedH" />}
        label="Vali kuupäevade vahemik"
      />
      {dateRangeSelection}
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
      <Graph
        dateRangeData={this.state.dateRangeData}
      />
      </Grid>

   

      
      
   


      

    </Box>
  );
  }
}

export default Home;
