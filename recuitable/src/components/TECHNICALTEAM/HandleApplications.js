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
import DeleteIcon from "@material-ui/icons/Delete";
import ApplicationService from "../../Service/ApplicationService";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useHistory } from "react-router-dom";
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
const[data,setData]=useState([]);
useEffect(() => {
 retrieveUsers();
  },[]);

  const retrieveUsers = async () => {
   await ApplicationService.fetchUsers()
      .then(response => {
         setData(response.data);
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  let history = useHistory();
  const handleAccept=(id)=>{
    ApplicationService.AcceptUser(id);
    history.push("/HrPage")
    retrieveUsers();
    handleClickSnackbar();
  }

  const handleReject=(id)=>{
    ApplicationService.RejectUser(id);
    retrieveUsers();
    handleClickSnackbar();
  }
const handleDownload=()=>{
  console.log("download resume")
}

const [openSnackbar, setOpenSnackbar] = React.useState(false);
const [state, setState] = React.useState({
  open: false,
  vertical: 'top',
  horizontal: 'center',
});
const { vertical, horizontal} = state;
const handleClickSnackbar = () => {
  setOpenSnackbar(true);
};

const handleCloseSnackbar = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenSnackbar(false);
};
return (
<>
<div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}
       open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
       APPLICATION ACCEPTED SUCCESSFULLY
        </Alert>
      </Snackbar>
    </div>
<TableContainer component={Paper}>
<Table stickyHeader aria-label="sticky table">
<TableHead>
<TableRow>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>APPLICANT ID</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>USER NAME</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>EMAIL ID</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>RESUME</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>ACCEPT</TableCell>
<TableCell align="center" style={{fontWeight: "bold",color: "blue"}}>REJECT</TableCell>

</TableRow>
</TableHead>
<TableBody>
{data.map((row) => (
  <>
  {row.status==='Waiting' &&
  <TableRow key={row.id}  hover role="checkbox" tabIndex={-1}>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.id}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">{row.applicantmodel.firstName}</TableCell>
<TableCell style={{ minWidth: row.minWidth}}  align="center">{row.applicantmodel.email}</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">
  <Button onClick={() => handleDownload(row)} color='primary'><GetAppIcon color='primary'/></Button></TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">
<Button onClick={() => handleAccept(row.id)} color='primary'>ACCEPT</Button>
</TableCell>
<TableCell  style={{ minWidth: row.minWidth}} align="center">
<Button onClick={() => handleReject(row.id)} color='secondary'>REJECT</Button>
</TableCell>
</TableRow>
}
</>

)

)}
</TableBody>
</Table>
</TableContainer>
</>
);
}