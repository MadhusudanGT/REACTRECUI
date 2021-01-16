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
import DeleteIcon from "@material-ui/icons/Delete";
import DataService from "../../Service/service";
import CreateUser from "./AddUserTable";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
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
const [open1,setOpen1]=React.useState(false);
const [getUser,setUserData]=useState([]);
const [getData,setData]=useState('');
const handleOpen = () => {
setOpen(true);
};

const handleOpen1 = () => {
  setOpen1(true);
  };

const handleClose = () => {
setOpen(false);
};

const handleClose1 = () => {
  setOpen1(false);
  };

const handleDelete=(id)=>{
  deleteUser(id);
    console.log("user deleted with id:=",id);
    
}

const [openSnackbar, setOpenSnackbar] = React.useState(false);

const handleClickSnackbar = () => {
  setOpenSnackbar(true);
};

const handleCloseSnackbar = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenSnackbar(false);
};

const handleEdit=(e)=>{
console.log("edit",e);
setData(e);
setOpen(true);
}

const deleteUser =(id)=>{
 DataService.remove(id);
 console.log(getUser)
 handleClickSnackbar();
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
<div className={classes.root}>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
         User information status become inActive now!
        </Alert>
      </Snackbar>
    </div>
<TableContainer component={Paper}>

<div style={{float:'left',margin:'20px'}}>
REGISTERED USER
</div>
<div style={{float:'right',margin:'20px'}}>
<Button color="primary"><GetAppIcon/></Button>
<Button color="primary" onClick={handleOpen1}>
<AddIcon/>
ADD USER</Button>
</div>


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
  {row.status=='Active' &&
  <TableRow key={row.id}  hover role="checkbox" tabIndex={-1}>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.id}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.firstName}</TableCell>
<TableCell style={{ minWidth: row.minWidth}}  align="center">{row.lastName}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.status}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.dob}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.createdAt}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.email}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">
<Button onClick={() => handleEdit(row)}><EditIcon style={{color:'blue'}} /></Button>
<Button onClick={() => handleDelete(row.id)}><DeleteIcon style={{color:'red'}} /></Button>
</TableCell>
</TableRow>
}
</>

)

)}

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
<InputFields data={getData}/>
</div>
</Fade>

</Modal>
</div>
<div>
<Modal
aria-labelledby="transition-modal-title"
aria-describedby="transition-modal-description"
className={classes.modal}
open={open1}
onClose={handleClose1}
closeAfterTransition
BackdropComponent={Backdrop}
BackdropProps={{
timeout: 500,
}}
>
<Fade in={open1}>
<div className={classes.paper}>
<CreateUser/>
</div>
</Fade>

</Modal>
</div>
</>
);
}