import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DataService from "../../Service/service";
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
  const [state,setState]=useState(data.state);
const [id,setId]=useState(data.id);
const [createdAt,setcreatedAt]=useState(data.createdAt);
const [updatedAt,setupdatedAt]=useState(data.updatedAt);
  const submitValue = () => {
    const frmdetails = {
       'id':id,
        'firstName' : fName,
        'lastName' : lName,
        'dob' : dob,
        'email' : email,
        'adhar':adhar,
        'status':state,
        'createdAt':createdAt,
        'updatedAt':updatedAt
    }
    console.log(frmdetails);
    updateUser(id,frmdetails);
}

const updateUser=(id,data)=>{
  console.log(id+"/////"+JSON.stringify(data))
  DataService.update(id,JSON.stringify(data));
}

const Close = () => {
  window.location="/"
}

  return (
    <>
    
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
