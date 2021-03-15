
import React, {useState,useEffect} from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';


var fetched =false;

function Weather(props){
    const [weather,weatherDate] = useState(false);
    const [city ,setCity] = useState(props.city);
    const [citytext,settext] = useState("");

    function handleChange(e){
        settext(e.target.value);
    }

    function handleCity(){
        setCity(citytext)
        fetch(("/user/"+props.userID) , {
            method: "PATCH",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({city : citytext})
            })
            .catch(alert => alert)

    }
    useEffect(() => {
        let mounted = true;
            const fetchData = async()=>{
            const result = await axios(
            "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=0d05b585e9f26511f0da02952569e8e6&units=metric",
            );
            fetched =true;
            if(mounted)
                weatherDate(result.data);
            };
            if(city)
                fetchData();
            return () => mounted = false;
        },[city])
    
        
     
    
    if(fetched && weather){
        const src ="https://openweathermap.org/img/w/"+weather.weather[0].icon+".png" ;
        return(
            <div className="container weatherCard">
                <div className="heading">
                    <h1 className="weatherTitle"> Weather </h1>
                </div>
                <p className="CityName"> {weather.name}</p>
                <img src={src} alt="weatherImg"/>
                <p className="CityName"> {weather.weather[0].description} </p>
                <h2> {Math.round(weather.main.temp)}  &#8451; </h2>
                
                
            </div>
        )
    }
    else{
        if(!fetched && city){
            return(
                <div className="container weatherCard">
                <div className="heading">
                    <h1 className="weatherTitle"> Weather </h1>
                </div>
                </div>
            )

        }
        else{
                    return(
                        <div className="container weatherCard">
                                <div className="heading">
                                    <h1 className="weatherTitle"> Weather </h1>
                                </div>
                                
                                <Grid container direction="row" justify="space-evenly" alignItems="center">
                                    <TextField
                                    className="weatherCity"
                                        onChange={handleChange}
                                        variant="standard"
                                        name="city"
                                        label="City"
                                        type="City"
                                        id="City"
                                        autoComplete="City"
                                    />
                                    <AddIcon  onClick={handleCity}/>
                                </Grid>
                                
                        </div>
                    )
            
        }

    }
}

export default Weather;