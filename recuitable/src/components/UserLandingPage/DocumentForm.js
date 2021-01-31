import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Card from '@material-ui/core/Card';
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import axios from "axios";
import Typography from "@material-ui/core/Typography";

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
    const [file, setFile] = useState(null);

  const UPLOAD_ENDPOINT =
    "http://localhost:8080/file/uploadFile";

  const handleSubmit = async e => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(file);
 
  };

  const uploadFile = async file => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(UPLOAD_ENDPOINT, formData).then(res=>{
      console.log(res);
    });
  };

  const handleOnChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

    return(
<>
<div style={{marginTop:"20px"}}>
<form onSubmit={handleSubmit}>
      <Typography>UPLOAD RESUME</Typography>
      <Button
  variant="contained"
  component="label"
>
  Upload File
  <input type="file" onChange={handleOnChange} />
</Button>
     
      <Button color="secondary"
              variant="contained"
              color="primary" type="submit">Upload File</Button>
    </form>
              
            </div>
<Card className={classes.root} variant="outlined" style={{margin:"20px"}}>
<form className={classes.root} noValidate autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="component-simple">Project Names</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">WEB SITE LINKS</InputLabel>
        <Input id="component-helper" aria-describedby="component-helper-text"/>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Blog Links</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Git Hub repo Link</InputLabel>
        <Input id="component-helper" aria-describedby="component-helper-text"/>
      </FormControl>
      </form>
      </Card>

      
      <Card className={classes.root} variant="outlined" style={{margin:"20px"}}>
<form className={classes.root} noValidate autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="component-simple">Other</InputLabel>
        <Input id="component-simple" />
      </FormControl>
     
      <FormControl>
        <InputLabel htmlFor="component-simple">Other</InputLabel>
        <Input id="component-simple" />
      </FormControl>
     

      <FormControl>
        <InputLabel htmlFor="component-simple">Other</InputLabel>
        <Input id="component-simple" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-helper">Other</InputLabel>
        <Input id="component-helper" aria-describedby="component-helper-text"/>
      </FormControl>
      </form>
      </Card>
</>
    )
}
export default UserDeatilsForm;