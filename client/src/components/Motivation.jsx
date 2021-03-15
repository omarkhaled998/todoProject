import React,{useState,useEffect} from 'react';
import axios from 'axios';

function Motivation(props){

    const [quote, setQuote] = useState("Hello");
    const [author, setAuthor] = useState("Omar khaled");
    const motivationCount = props.motivationCount;

    useEffect(() => {
      const fetchData = async()=>{
        const result = await axios(
          'https://type.fit/api/quotes',
        );
          setQuote(result.data[motivationCount].text);
          setAuthor(result.data[motivationCount].author);
      };
      fetchData();
      
    },[motivationCount]);
    updateCount()
    function updateCount(){
      fetch(("/user/"+props.userID) , {
      method: "PATCH",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({motivationCount : ((motivationCount%1600)+1)})
      })
      .catch(alert => alert)
    }

    return(
        <p className="quote">"{quote}"  ~{author}</p>
    )
};

export default Motivation