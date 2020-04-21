var express = require("express");
import axios from 'axios';
import bodyParser from 'body-parser';
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const PORT = 5000;
const cors = require('cors');


// Set up the express app

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
//For getting all the dates in range(date a, date b)
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
   var dateArray = new Array();
   var currentDate = startDate;
   while (currentDate <= stopDate) {
     dateArray.push(currentDate.toJSON().slice(0,10))
     currentDate = currentDate.addDays(1);
   }
   return dateArray;
 }


//Post request for getting information about one day
app.post("/daylength", (req, response) => {
    const data = req.body
    if(!data.latitude || !data.longitude || !data.date){
        return response.status(400).send({
            success: 'false',
            message: 'Missing values'
          });
    }
    
    const latitude = data.latitude;
    const longitude = data.longitude;
    const date = data.date;
    
    return axios.get("https://api.sunrise-sunset.org/json?lat="+latitude+"&lng="+longitude+"&date="+date).then(
        
        res =>{
            
            const results = res.data["results"];
            console.log(results);
            response.status(200).send({
                success: 'true',
                message: 'Information retrieved successfully',
                assets: results
            })
        }
    ).catch(error =>{
        return response.status(400).send({
            success: 'false',
            message: 'Failed handling request'
          });
    }
    
    )

   });



//Post request
//Getting information about latitude, longitude and date range 
//Returning Day length for every day in the range
app.post("/dayrange", (req, response) => {
    const data = req.body
    if(!data.latitude || !data.longitude || !data.dateRange){
        return response.status(400).send({
            success: 'false',
            message: 'Missing values'
            });
    }

    const latitude = data.latitude;
    const longitude = data.longitude;
    const dateRange = data.dateRange;
    
    //Get all dates that are in the range
    const dateArray = getDates(new Date(dateRange[0]), new Date(dateRange[1]))
    
   

    return returnDayLengths(dateArray, latitude, longitude, [], (dateRangeData) =>{
        response.status(200).send({
            success: 'true',
            message: 'Information retrieved successfully',
            assets: dateRangeData
        })
    });

    

});

//Helper function for /dayrange post.
//Rec function that finds day length for every el in array.
function returnDayLengths(dateArray, latitude, longitude, dayLengths, response){
    if(dateArray.length == 1){
        axios.get("https://api.sunrise-sunset.org/json?lat="+latitude+"&lng="+longitude+"&date="+dateArray[0]).then(
        res =>{
            
            const results = res.data["results"]["day_length"];
            dayLengths.push([dateArray[0],results]);
            response({dateRangeData: dayLengths});
            
        });
    }else{
        axios.get("https://api.sunrise-sunset.org/json?lat="+latitude+"&lng="+longitude+"&date="+dateArray[0]).then(
        res =>{
            
            const results = res.data["results"]["day_length"];
            dayLengths.push([dateArray[0],results]);
            returnDayLengths(dateArray.slice(1), latitude, longitude, dayLengths, response);
            
        });



    }

}





   app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});