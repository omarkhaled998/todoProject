import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Motivation from './Motivation';
import  { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const auth = true
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [signout,setSignOut] = React.useState(false);
  // const [edit,setEdit] = React.useState(false);

 


  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  function signOut(){
    setSignOut(true);
    setAnchorEl(null);
  }

  // function editProfile(){
  //   setEdit(true);
  //   setAnchorEl(null);
  // }


  if(signout){
    return <Redirect to={{
      pathname: '/login',
      // state: { logged: true ,  userl :loggedUser}
  }}
  />
  }
  else{
    // if(edit){
    //   return <Redirect to={{
    //     pathname: '/register',
    //     // state: { logged: true ,  userl :loggedUser}
    // }}
    // />
    // }
  
    // else{
      return (
            <div className={classes.root} style={{color:"#ffeaa7"}}>
              {/* <FormGroup>
                <FormControlLabel
                  control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                  label={auth ? 'Logout' : 'Login'}
                />
              </FormGroup> */}
              <div style={{color:"#ffeaa7"}}>
              <AppBar position="static" color="inherit">
                <Toolbar>
                  {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton> */}
                  <Typography component={'span'} className={classes.title}>
                    <Motivation motivationCount = {props.motivationCount} userID = {props.userID}/>
                  </Typography>
                  <Typography className="username" color="textPrimary" >{props.username}</Typography>
                  {auth && (
                    <div>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                      >
                        {/* <MenuItem onClick={editProfile}>Edit Profile</MenuItem> */}
                        <MenuItem onClick={signOut}>Sign Out</MenuItem>
                      </Menu>
                    </div>
                  )}
                </Toolbar>
              </AppBar>
              </div>
            </div>
          );
    }
// }
}
