import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function ValidationTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="USER NAME"
          helperText="Incorrect entry."
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="DOB"
          helperText="Incorrect entry."
        />
      </div>
      <div>
      <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="JOIN DATE"
          helperText="Incorrect entry."
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="PHONE NO"
          helperText="Incorrect entry."
        />
      </div>
      <div>
      <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="EMAIL"
          helperText="Incorrect entry."
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="STATE"
          helperText="Incorrect entry."
        />
      </div>
<Button color="primary">SAVE</Button>
<Button color="secondary">CANCEL</Button>
    </form>
  );
}
