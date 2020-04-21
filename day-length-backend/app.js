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
    
    return axios.get("https://api.sunrise-sunset.org/json?lat="+latitude+"&lng="+longitude+"&date"+date).then(
        
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





   app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});