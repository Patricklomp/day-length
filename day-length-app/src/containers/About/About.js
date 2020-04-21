import React from "react";
import {Component} from 'react';
import {Box} from '@material-ui/core';


class About extends Component{
constructor(props){
  super(props)
 
 
}

render(){

  return (

    <Box>
     <p>For more information check out github repo: </p><a href="https://github.com/Patricklomp/day-length">github.com/Patricklomp/day-length</a>
    </Box>
  );
}
}


export default About;
