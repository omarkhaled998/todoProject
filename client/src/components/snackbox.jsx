import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(0),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={props.password} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity="error">
          {props.msg}
        </Alert>
      </Snackbar>
      <Snackbar open={props.network} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity="warning">
          Network Error
        </Alert>
      </Snackbar>
      <Snackbar open={props.user} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity="info">
          {props.msg}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
