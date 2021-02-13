import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DataService from "../../Service/service";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
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

export default function ValidationTextFields({data}) {
  const classes = useStyles();
  const [fName, setfName] = useState(data.firstName);
  const [lName, setlName] = useState(data.lastName);
  const [dob, setdob] = useState(data.dob);
  const [email, setEmail] = useState(data.email);
  const [adhar,setAdhar] =useState(data.adhar);
  const [status,setstatus]=useState(data.status);
const [id,setId]=useState(data.id);
const [createdAt,setcreatedAt]=useState(data.createdAt);
const [updatedAt,setupdatedAt]=useState(data.updatedAt);
const [state, setState] = React.useState({
  open: false,
  vertical: 'top',
  horizontal: 'center',
});
let history = useHistory();
const { vertical, horizontal} = state;
  const submitValue = () => {
    const frmdetails = {
       'id':id,
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
    updateUser(id,frmdetails);
}

const updateUser=(id,data)=>{
  console.log(id+"/////"+JSON.stringify(data))
  DataService.update(id,JSON.stringify(data));
  handleClick()
}

const Close = () => {
  history.push("/UserManagement");
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
          user information updated successfully!
        </Alert>
      </Snackbar>
    </div>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField
          label="FirstName"
          id="outlined-size-small"
          defaultValue={data.firstName}
          variant="outlined"
          size="small"
          onChange={e => setfName(e.target.value)}
        />
        <TextField
          label="lastName"
          id="outlined-size-small"
          defaultValue={data.lastName}
          variant="outlined"
          size="small"
          onChange={e => setlName(e.target.value)}
        />
      </div>
      <div>
      <TextField
          label="DOB"
          id="outlined-size-small"
          defaultValue={data.dob}
          variant="outlined"
          size="small"
          onChange={e => setdob(e.target.value)}
        />
        <TextField
          label="Email Id"
          id="outlined-size-small"
          defaultValue={data.email}
          variant="outlined"
          size="small"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
      <TextField
          label="adhar"
          id="outlined-size-small"
          defaultValue={data.adhar}
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
