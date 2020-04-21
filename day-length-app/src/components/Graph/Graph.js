import React from "react";
import {Component} from 'react';
import {Paper} from '@material-ui/core';
import "./graph.css";
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
  } from '@devexpress/dx-react-chart-material-ui';
  import { Animation } from '@devexpress/dx-react-chart';
class Graph extends Component{
constructor(props){
  super(props)
 this.state = {
    dateRangeData : []
 }
  
}
componentWillReceiveProps(nextProps) {
    //For updating state
    this.setState({
       dateRangeData: nextProps.dateRangeData
      });
  
      
  }

render(){
let data = [];


this.state.dateRangeData.forEach(date => {
    data.push({
        date: date[0],
        daytime: date[1]
    })
});
console.log(data)
let graph;
if(this.state.dateRangeData!= null && this.state.dateRangeData.length<=0)
    graph = <p className="graph-info-text">Siia ilmub päeva pikkuste graafik. Selleks tuleb lisaks sisestada kuupäevade vahemik.</p>
else
graph = 
<Chart
  data={data}
  className="chart-style"
>
  <ArgumentAxis />
  <ValueAxis max={7} />

  <BarSeries
    valueField="daytime"
    argumentField="date"
  />
  <Title text="Päevapikkuse muutumine" />
  
</Chart>


  return (
    
    <Paper className = "graph-paper">
      {graph}
      </Paper>
  );
}
}


export default Graph;
