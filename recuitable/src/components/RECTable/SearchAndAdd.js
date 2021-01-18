import React, { useState, useEffect } from 'react';
import {fade, makeStyles } from '@material-ui/core/styles';
import CreateUser from "./AddUserTable";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import DataService from "../../Service/service";

const useStyles = makeStyles((theme) => ({
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));

const SearchAndAdd=()=>{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

      const handleOpen = () => {
        setOpen(true);
        };

        const handleClose= () => {
            setOpen(false);
            };

            const handleChange = event => {
                setSearchTerm(event.target.value);
                console.log(event.target.value);
                // search(event.target.value);
              }

// const search=(keyword)=>{
// DataService.search(keyword).then(responce=>{
//     console.log("SERACH"+responce);
// });
// }

    return(
        <>
        <div style={{float:'left',margin:'20px'}}>
REGISTERED USER
</div>
<div style={{float:'right',margin:'20px'}}>

<TextField label="Search..." variant="outlined" value={searchTerm}
        onChange={handleChange} />
  
<Button color="primary"><GetAppIcon/></Button>
<Button color="primary" onClick={handleOpen}>
<AddIcon/>
ADD USER</Button>
</div>

<div>
<Modal
aria-labelledby="transition-modal-title"
aria-describedby="transition-modal-description"
className={classes.modal}
open={open}
onClose={handleClose}
closeAfterTransition
BackdropComponent={Backdrop}
BackdropProps={{
timeout: 500,
}}
>
<Fade in={open}>
<div className={classes.paper}>
<CreateUser/>
</div>
</Fade>

</Modal>
</div>
        </>
    )
}

export default SearchAndAdd;