import React, {useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebookF ,faGoogle } from '@fortawesome/free-brands-svg-icons'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import  { Redirect } from 'react-router-dom';

import Snackbox from "../components/snackbox";
// import { set } from 'mongoose';

import Google from "../components/GoogleLogin"
import Facebook from "../components/FacebookAuth"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/omar-khaled-424a72185/">
        Omar Khaled
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#424242',
        light : ''
      },
    },
  });

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 4),
  },
  submit2: {
    margin: theme.spacing(1, 0, 1),
  },
  gap: {
    margin: theme.spacing(3, 0, 0),
  },
  facebook: {
    margin: theme.spacing(1, 1, 1),
  },
  google: {
    margin: theme.spacing(1, 0, 0),
  },
//   back:{
//     backgroundColor : "#ffeaa7",
//     height: '100%',
//     width : "50%",
//     alignItems: 'center',
//   }
}));

export default function SignIn() {
  const classes = useStyles();
  const [userData,setUserdata]=useState({username:"", password:""});
  const [logged,setLogged]=useState(false);
  const [user,setUser] = useState({});
  const [errmsg, setErr] = useState("") 


  const [password, setPassword] = useState(false) 
  const [network, setNetwork] = useState(false)
  const [usermsg, setUsermsg] = useState(false) 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPassword(false);
    setNetwork(false);
    setUsermsg(false);

  };

  function handleFailure(response){
    if(response.error === "popup_closed_by_user"){
      setErr("Google Sign in failed");
      setUsermsg(true);
    }

  }
  function handleSuccess(userInfo){
    var hasUser = false;
    fetch(("/google/signin") , {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({tokenId : userInfo.tokenId})
      })
      .then((result) => {
          if(result.status===202){
            hasUser=true;
          }
          return result.json();
      })
      .then((info)=>{
        if(hasUser){
          setUser(info)
          setLogged(true)
        }
        else{
          setErr(info.msg);
          if(info.err === "pass"){
            setPassword(true);
          }
          else{
            if(info.err === "user"){
              setUsermsg(true);
            }
            else{
              setNetwork(true);
            }
          }
        }
      })
      .catch(alert => alert)
  
  
  }


  function facebook(response){
    if(response.accessToken){
     var hasUser = false;
     fetch(("/facebook/signin") , {
       method: "POST",
       headers: {'Content-type': 'application/json'},
       body: JSON.stringify({accessToken:response.accessToken, userID : response.userID})
       })
       .then((result) => {
           if(result.status===202){
             hasUser=true;
           }
           return result.json();
       })
       .then((info)=>{
         if(hasUser){
           setUser(info)
           setLogged(true)
         }
         else{
           if(info.err === "user"){
             setUsermsg(true);
             setErr(info.msg);
           }
           else{
             setNetwork(true);
           }
         }
       })
       .catch(alert => alert)
   
    }
    else{
     setUsermsg(true);
     setErr("Authentication With Facebook Failed");
    }
  }
  function handlechange(event){
      const name = event.target.name;
      const value = event.target.value;
      setUserdata((prev)=>{
        if(name==="username"){
          return({username:value , password : prev.password })
        }
        else{
          return({username:prev.username , password : value })
        }
      })
  }
  function handleClick(){
    var hasUser = false;
    fetch(("/login") , {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userData)
      })
      .then((result) => {
          if(result.status===202){
            hasUser=true;
          }
          return result.json();
      })
      .then((info)=>{
        if(hasUser){
          setUser(info)
          setLogged(true)
        }
        else{
          setErr(info.msg);
          if(info.err === "pass"){
            setPassword(true);
          }
          else{
            if(info.err === "user"){
              setUsermsg(true);
            }
            else{
              setNetwork(true);
            }
          }
        }
      })
      .catch(alert => alert)

  }



  if(logged) {
    return <Redirect to={{
    pathname: '/todo',
    state: {logged : true, data :user}
    }}/>
  }

  return (
    <div className="signin">
    <Snackbox password={password} user={usermsg} network={network} msg={errmsg} handleClose={handleClose}/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        {/* <Typography component="h1" variant="h5"> */}
            <h1 className="signinHeading">
                Sign in
          </h1>
        {/* </Typography> */}
        <form className={classes.form} noValidate>
          <TextField
            onChange={handlechange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username or Email"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={handlechange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //href="/todo"
            onClick={handleClick}
            className={classes.submit}
          >
            Sign In 
          </Button>
          <ThemeProvider theme={theme}>
          
          <Grid className={classes.facebook}>
              <Facebook text={" IN "} facebook={facebook}/>
          </Grid>
          <Grid className={classes.google} >
             <Google  success={handleSuccess} failure={handleFailure} text={" IN "} />
          </Grid> 

          </ThemeProvider>
          {/* <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit2}
          >
          <span className="facebookIcon"><FontAwesomeIcon icon={faGoogle} />
            </span> 
            Sign In with Google
          </Button>
          

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit2}
          >
          <span className="facebookIcon"><FontAwesomeIcon icon={faFacebookF} />
            </span> Sign In with Facebook
          </Button> */}
          
          
          <Grid container className={classes.gap}>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>

    {/* <Container component="main" maxWidth="xs"> 
                    <div class="card-body">
                        <a class="btn btn-block" href="/auth/google" role="button">
                            <i class="fab fa-google"></i>
                            Sign Up with Google
                        </a>
                    </div>
    </Container> */}
    </div>
  );
}