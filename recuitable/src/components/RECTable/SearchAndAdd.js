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
import Table from "./Table";
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
    const [searchTerm, setSearchTerm] =useState();
    const [getSearch,setSearch]=useState([]);
      const handleOpen = () => {
        setOpen(true);
        };

        const handleClose= () => {
            setOpen(false);
            };

  
const search=(searchTerm)=>{
DataService.search(searchTerm).then(responce=>{
    setSearch(responce.data);
    console.log("SERACH"+JSON.stringify(getSearch));
});
}

    return(
        <>
        <div style={{float:'left',margin:'20px'}}>
REGISTERED USER
</div>
<div style={{float:'right',margin:'20px'}}>

<TextField label="Search..." variant="outlined"
        onKeyUp={e=> search(e.target.value)} />
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
{false&&<Table sea={getSearch}/>}
        </>
    )
}

export default SearchAndAdd;