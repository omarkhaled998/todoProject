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

import  { Redirect } from 'react-router-dom'

import Snackbox from "../components/snackbox";
import Google from "../components/GoogleLogin";
import Facebook from "../components/FacebookAuth"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/omar-khaled-424a72185/">
        Omar khaled
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
    marginTop: theme.spacing(3),
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
}));






export default function SignUp() {
  const classes = useStyles();
  const [userData,setUserdata] = useState({})
  
  const [registered , setRegistered] = useState(false);
  const [user,setUser] = useState({});

  const [errmsg, setErr] = useState("") 
  const [usermsg, setUsermsg] = useState(false) 
  const [network, setNetwork] = useState(false) 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUsermsg(false);
    setNetwork(false);

  };


  function handleSuccess(userInfo){
    var hasUser = false;
    fetch(("/google/signup") , {
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
          setRegistered(true)
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
      .catch(alert =>alert)
  
  
  }



  function handleFailure(response){
    if(response.error === "popup_closed_by_user"){
      setErr("Google Sign in failed");
      setUsermsg(true);
    }
  }

  function handleChange(event){
    const {name,value} = event.target
    setUserdata(prev =>{ 
      return{
        ...prev,
        [name] : value
      } 
    })
  }

 function facebook(response){
   if(response.accessToken){
    var hasUser = false;
    fetch(("/facebook/signup") , {
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
          setRegistered(true)
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
      .catch(alert =>alert)
  
   }
   else{
    setUsermsg(true);
    setErr("Authentication With Facebook Failed");
   }
 }

  
  function handleClick(){
    var hasUser = false;
    fetch(("/register") , {
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
          setRegistered(true)
        }
        else{
          var strf = "";
          if(info.msg.errors){
            Object.keys(info.msg.errors).forEach(elem=>{strf = strf.concat(elem +" ")})
              if(Object.keys(info.msg.errors).length >1)
                info.msg = strf + "are missing"
              else
                info.msg = strf + "is missing"
          }
           
            // info.msg = strf + "is missing"
        

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
  if(registered) {
    return <Redirect to={{
    pathname: '/todo',
    state: { logged :true,data :user}
    }}/>
}

  return (
    <div className="signin signup">
    <Snackbox password={false} user={usermsg} network={network} msg={errmsg} handleClose={handleClose}/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        {/* <Typography component="h1" variant="h5"> */}
          <h1 className="signinHeading"> Sign up </h1>
        {/* </Typography> */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange = {handleChange}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange = {handleChange}
                name="country"
                variant="outlined"
                fullWidth
                id="country"
                label="Country"
                autoFocus
                autoComplete="Country"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange = {handleChange}
                variant="outlined"
                required
                fullWidth
                id="City"
                label="City"
                name="city"
                autoComplete="City"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange = {handleChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange = {handleChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            onClick = {handleClick}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <ThemeProvider theme={theme}>
          {/* <Button
            onClick={handleGoogle}
            variant="contained"
            color="secondary"
            className={classes.submit2}
          >
          <span className="facebookIcon"><FontAwesomeIcon icon={faGoogle} />
            </span> 
            Sign Up with Google
          </Button> */}

          <Grid className={classes.facebook}>
              <Facebook text={" Up "} facebook={facebook}/>
          </Grid>
          <Grid className={classes.google} >
             <Google  success={handleSuccess} failure={handleFailure} text={" UP "} />
          </Grid> 
          
          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit2}
          >
          <span className="facebookIcon"><FontAwesomeIcon icon={faFacebookF} />
            </span> Sign Up with Facebook
          </Button> */}
          </ThemeProvider>

          <Grid container justify="flex-end" className={classes.gap}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}