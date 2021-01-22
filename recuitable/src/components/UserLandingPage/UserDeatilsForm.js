import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        minWidth: 275,
      },
    },
  }));

const  UserDeatilsForm=()=>{
    const classes = useStyles();



    return(
<>
<Card className={classes.root} variant="outlined" style={{margin:"20px"}}>
<form className={classes.root} noValidate autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="component-simple">First Name</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Last Name</InputLabel>
        <Input
          id="component-helper"
         
          aria-describedby="component-helper-text"
        />
        {/* <FormHelperText id="component-helper-text">Some important helper text</FormHelperText> */}
      </FormControl>
      <FormControl>
      <TextField
        id="date"
        label="DOB"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Email id</InputLabel>
        <Input id="component-helper" aria-describedby="component-helper-text"/>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Phone No1</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Phone no2</InputLabel>
        <Input id="component-helper" aria-describedby="component-helper-text"/>
      </FormControl>
      </form>
      </Card>


      <Card className={classes.root} variant="outlined" style={{margin:"20px"}}>
<form className={classes.root} noValidate autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="component-simple">Address Line1</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Address Line1</InputLabel>
        <Input
          id="component-helper"
         
          aria-describedby="component-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Address Line2</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">City</InputLabel>
        <Input id="component-helper" aria-describedby="component-helper-text"/>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="component-simple">Country</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Pin Code</InputLabel>
        <Input id="component-helper" aria-describedby="component-helper-text"/>
      </FormControl>
      </form>
      </Card>
</>
    )
}
export default UserDeatilsForm;