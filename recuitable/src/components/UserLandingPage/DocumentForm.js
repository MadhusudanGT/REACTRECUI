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
const [open,setOpen]=useState(false);
const [getfiles ,setfiles]=useState([]);

const handleClose=()=>{
    setOpen(false)
}

const handleSave=(files)=>{
        setfiles(files)
        setOpen(false)
        console.log(getfiles)
    };

  const handleOpen=()=>{
       setOpen(true);
    }
    return(
<>
<div style={{marginTop:"20px"}}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                 UPLOAD FILES
                </Button>
                <DropzoneDialog
                    open={open}
                    onSave={handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={handleClose}
                />
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