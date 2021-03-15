import React, {useEffect, useState} from "react";


function Time(){
    
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day = weekday[d.getDay()]; 
    const [time,setTime] = useState(d.toLocaleTimeString());
    const [date,setDate] = useState(d.toLocaleDateString());
    




    useEffect(()=>{
        const interval = setInterval(() => {
            var newTime = new Date();
            setTime(newTime.toLocaleTimeString());
            setDate(newTime.toLocaleDateString());
          }, 1000);
        return () => clearInterval(interval);
    },[])

    return(
        <div className="container TimeCard">
            <div className="heading">
                <h1 > {day} </h1>
            </div>
            
            <h2> {date} </h2>
            <h2> {time}</h2>
        </div>
    )
}

export default Time;