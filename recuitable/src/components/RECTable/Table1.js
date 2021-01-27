import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputFields from '../InputFieldsUser/AddUser';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import DataService from "../../Service/service";
import SearchAndAdd from "./SearchAndAdd";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
      },
      container: {
        maxHeight: 440,
      },
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

export default function BasicTable() {
const classes = useStyles();
const [open, setOpen] = React.useState(false);
const [getUser,setUserData]=useState([]);
const [getData,setData]=useState('');
const handleOpen = () => {
setOpen(true);
};


const handleClose = () => {
setOpen(false);
};

const handleDelete=(id)=>{
  deleteUser(id);
    console.log("user deleted with id:=",id);
    
}

const handleEdit=(e)=>{
console.log("edit",e);
setData(e);
setOpen(true);
}

const deleteUser =(id)=>{
 DataService.remove(id);
 console.log(getUser)
}


useEffect(() => {
 retrieveUsers();
  },[]);

  const retrieveUsers = async () => {
   await DataService.getAll()
      .then(response => {
         setUserData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

return (
<>
<TableContainer component={Paper}>
<Table stickyHeader aria-label="sticky table">
<TableHead>
<TableRow>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>ID</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>FIRST NAME</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>LAST NAME</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>STATUS</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>DOB</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>JOIN DATE</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>EMAIL</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>ACTION</TableCell>

</TableRow>
</TableHead>
<TableBody>
{getUser.map((row) => (
  <>
  {row.status==='inActive'&&
<TableRow key={row.id}  hover role="checkbox" tabIndex={-1}>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.id}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.firstName}</TableCell>
<TableCell style={{ minWidth: row.minWidth}}  align="center">{row.lastName}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.status}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.dob}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.createdAt}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.email}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">
<Button onClick={() => handleEdit(row)}><TimelapseIcon style={{color:'blue'}} /></Button>
</TableCell>
</TableRow>
}
</>
))}
</TableBody>

</Table>
</TableContainer>

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
Time Tracker for inActive user
</div>
</Fade>
</Modal>
</div>

</>
);
}