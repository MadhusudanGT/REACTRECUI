import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DataService from "../../Service/service";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function CreateUser() {
  const classes = useStyles();
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [dob, setdob] = useState('');
  const [email, setEmail] = useState('');
  const [adhar,setAdhar] =useState('');
  const [status,setStatus]=useState('Active');
const [createdAt,setcreatedAt]=useState(new Date());
const [updatedAt,setupdatedAt]=useState(new Date());
const [state, setState] = React.useState({
  open: false,
  vertical: 'top',
  horizontal: 'center',
});

const { vertical, horizontal} = state;
  const submitValue = () => {
    const frmdetails = {
        'firstName' : fName,
        'lastName' : lName,
        'dob' : dob,
        'email' : email,
        'adhar':adhar,
        'status':status,
        'createdAt':createdAt,
        'updatedAt':updatedAt
    }
    console.log(frmdetails);
    createUser(frmdetails);
}

const createUser=(data)=>{
    console.log(data);
DataService.create(data);
handleClick();
}

const Close = () => {
  window.location="/"
}

const [open, setOpen] = React.useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

  return (
    <>
     <div className={classes.root}>
      <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          new user created successfully!
        </Alert>
      </Snackbar>
    </div>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField
          label="FirstName"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={e => setfName(e.target.value)}
        />
        <TextField
          label="lastName"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={e => setlName(e.target.value)}
        />
      </div>
      <div>
      <TextField
        id="date"
        label="DOB"
        type="date"
        className={classes.textField}
        onChange={e => setdob(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <TextField
          label="Email Id"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
      <TextField
          label="adhar"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={e => setAdhar(e.target.value)}
        />
      </div>
<Button color="primary" onClick={submitValue}>SAVE</Button>
<Button color="secondary" onClick={Close}>CANCEL</Button>
    </form>
    
    </>
  );
}
