import React from 'react';

import { GoogleLogin } from 'react-google-login';



function Google(props){
    
    const responseGoogle = (response) => {
        props.success(response);
        
    }
    const failureGoogle = (response) => {
        props.failure(response);
        
    }
    var text = "SIGN"+props.text+"WITH GOOGLE";
    return(
        <GoogleLogin
        clientId="172713392219-e1m1a7amlb7joh7fsaeluqngbhg7d8tg.apps.googleusercontent.com"
        buttonText = {text}
        onSuccess={responseGoogle}
        onFailure={failureGoogle}
        cookiePolicy={'single_host_origin'}
        className ="GoogleButton"
        disabled={false}
      />
        
    )
}


export default Google;