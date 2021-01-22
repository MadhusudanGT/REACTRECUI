import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Card from '@material-ui/core/Card';
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
    <div>SECONDARY EDUCATION DEATILS (10th)</div>
      <FormControl>
        <InputLabel htmlFor="component-simple">Collage Name</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Board</InputLabel>
        <Input
          id="component-helper"
         
          aria-describedby="component-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">State</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Percentage</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      </form>
      </Card>

      
      <Card className={classes.root} variant="outlined" style={{margin:"20px"}}>
<form className={classes.root} noValidate autoComplete="off">
<div>HIGHER SECONDARY EDUCATION DEATILS (12th)</div>
<FormControl>
        <InputLabel htmlFor="component-simple">Collage Name</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Board</InputLabel>
        <Input
          id="component-helper"
         
          aria-describedby="component-helper-text"
        />
        {/* <FormHelperText id="component-helper-text">Some important helper text</FormHelperText> */}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">State</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Percentage</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      </form>
      </Card>

      <Card className={classes.root} variant="outlined" style={{margin:"20px"}}>
<form className={classes.root} noValidate autoComplete="off">
<div>GRADUCATION DEATILS</div>
<FormControl>
        <InputLabel htmlFor="component-simple">Collage Name</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Board</InputLabel>
        <Input
          id="component-helper"
         
          aria-describedby="component-helper-text"
        />
        {/* <FormHelperText id="component-helper-text">Some important helper text</FormHelperText> */}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">State</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Percentage</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      </form>
      </Card>
</>
    )
}
export default UserDeatilsForm;