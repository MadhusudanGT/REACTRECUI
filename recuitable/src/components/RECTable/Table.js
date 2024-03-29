import React, { useState, useEffect } from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputFields from '../InputFieldsUser/AddUser';
import DeleteIcon from "@material-ui/icons/Delete";
import DataService from "../../Service/service";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchAndAdd from "./SearchAndAdd";
import TextField from '@material-ui/core/TextField';
import UpdateProfileForm from "../FormikValidationForm/UpdateProfileForm";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
const [getUser,setUserData]=useState([]);
const [getData,setData]=useState('');
const[getfName,setfName]=useState('');
const [openDilogBox, setOpenDilogBox] = React.useState(false);
const [state, setState] = React.useState({
  open: false,
  vertical: 'top',
  horizontal: 'center',
});

const { vertical, horizontal} = state;
const [getUserName,setUserName]=useState('');
const [getUserId,setUserId]=useState('');
const handleDeleteBoxOpen = (e) => {
  setOpenDilogBox(true);
  setUserName(e.firstName);
  setUserId(e.id);
  
};

const handleDeleteBoxClose = () => {
  setOpenDilogBox(false);
 if(getUserName===getfName){
  handleDelete(getUserId);
 }else{
   alert("please check the user name")
 }
};
const handleClose = () => {
setOpen(false);
};

const handleDelete=(id)=>{
  deleteUser(id);
  retrieveUsers();
    // console.log("user deleted with id:=",id);
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
// console.log("edit",e);
setData(e);
setOpen(true);
}

const deleteUser =(id)=>{
 DataService.remove(id);
 retrieveUsers();
//  console.log(getUser)
 handleClickSnackbar();
 window.location="/UserManagement";
}

useEffect(() => {
 retrieveUsers();
  },[]);

  const retrieveUsers = async () => {
   await DataService.getAll()
      .then(response => {
         setUserData(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const [getSearch,setSearch]=useState([]);
  const search=(searchTerm)=>{
    if(searchTerm==''){
retrieveUsers();
    }
    else{
      DataService.search(searchTerm).then(responce=>{
        setSearch(responce.data);
        setUserData(responce.data);
        // console.log(getSearch)
       
    });
    }
    }
return (
<>
<TextField label="Search..." variant="outlined"
        onChange={e=> search(e.target.value)} />
        {/* <Button color="primary" onClick={handlesearch}>SERACH</Button> */}
<div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}
       open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
         User status become inActive now!
        </Alert>
      </Snackbar>
    </div>
<TableContainer component={Paper}>
<SearchAndAdd/>
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
  {row.status==='Active' &&
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
<Button onClick={() => handleDeleteBoxOpen(row)}><DeleteIcon style={{color:'Orange'}} /></Button>
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
<UpdateProfileForm data={getData}/>
</div>
</Fade>

</Modal>
</div>

<Dialog open={openDilogBox} onClose={handleDeleteBoxClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">YOU LIKE TO DELETE THIS USER</DialogTitle>
        {getUserName}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="USER NAME"
            type="email"
            fullWidth
            onChange={e => setfName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteBoxClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBoxClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
</>
);
}