import React from 'react';
import FacebookLogin from 'react-facebook-login';

function Facebook(props){
    

    const callBack = (response) => {
        props.facebook(response);
        
    }

    var text = "Sign"+props.text+"with Facebook ";
    return(
    <FacebookLogin
        textButton = {text}
        size = "small"
        appId="428596325028486"
        fields="name,email,picture"
        callback={callBack}
        icon="fa-facebook"
        isMobile={false}
        
        
        />
        
    )
}


export default Facebook;