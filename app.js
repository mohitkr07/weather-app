const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const axios=require("axios");
const app = express();

const _=require('lodash');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

    res.render("home", {
        city: null, temp: null, status:null, today:null, url_icon:null
    });

});

app.post("/",function(req,res){
    const city=_.upperFirst(req.body.searchCity);
    const API_KEY="655688ef8fcb818d223817edb8b01a39";
    const url_api="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=655688ef8fcb818d223817edb8b01a39&units=metric";
    

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    axios.get(url_api).then(response=>{
        
        
            try{
                if (response.data.cod=='404')
                {
                    city = response.data.message;

                    res.render("home", {
                        city:city, 
                        temp:null, 
                        status:null, 
                        today: null, 
                        url_icon: null
                    });
                }
                else
                { 
                    const temperature=Math.round(response.data.main.temp);
                    const main=_.upperFirst(response.data.weather[0].main);
                    const description=response.data.weather[0].description;
                    const icon=response.data.weather[0].icon;
                    const url_icon="http://openweathermap.org/img/wn/"+icon+"@2x.png";
                    res.render("home", {
                        city: city, 
                        temp: temperature, 
                        status: main, 
                        today: today, 
                        url_icon:url_icon
                    });
                } 
            }
            catch(err){
                console.log(err);
                res.status(404).send({message:'something went wrong'});
            }
    });
    
}); 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port,function(){
    console.log("Server has started Successfully");
});

