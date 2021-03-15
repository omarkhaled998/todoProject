import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  var open = props.show

  var list = [];
  var date ="";
  if(open && props.todo){
   
    list = props.todo.list;
    date = props.todo.date
  }
  else{
    open = false;
  }
 




  var count=0;

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog onClose={()=>props.hide()} aria-labelledby="customized-dialog-title" open={open}>
        {/* <DialogTitle id="customized-dialog-title" onClose={()=>props.hide()}>
          Modal title
        </DialogTitle> */}
        <DialogContent>
            <div className="container Dialog">
                <div className="heading">
                    <h1 className="previousHeading">{date}</h1>
                </div>
                <div>
                    <ul>
                    {list.map((elem) => <li id={props.id} key={count++}>{elem}</li> )}
                    </ul>
                </div>
            </div>
    </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={()=>props.hide()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
