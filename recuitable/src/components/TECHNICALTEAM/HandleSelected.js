import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import Typography from '@material-ui/core/Typography';
import ApplicationService from "../../Service/ApplicationService";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(ApplicationID, ApplicantName, RecuiterId, Resume,REJECT) {
  return { ApplicationID, ApplicantName, RecuiterId , Resume,REJECT};
}

const rows = [
  createData(1, 'MADHUSUDAN', 1,'DOWNLOAD','BUTTON'),
  createData(2, 'SHIV', 1,'DOWNLOAD', 'BUTTON'),
  createData(3, 'SWAGATA',1,'DOWNLOAD', 'BUTTON'),
  createData(4, 'UMESH',1,'DOWNLOAD',  'BUTTON'),
  createData(5, 'VISWA',1,'DOWNLOAD', 'BUTTON'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
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
  const handleReject=(id)=>{
    ApplicationService.RejectUser(id);
    retrieveUsers();
    handleClickSnackbar();
    retrieveUsers();
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
       APPLICANT REJECTED SUCCESSFULLY
        </Alert>
      </Snackbar>
    </div>
    <Typography align='center'>SELETED APPLICATION LIST</Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ApplicationID</StyledTableCell>
            <StyledTableCell align="right">ApplicantName</StyledTableCell>
            <StyledTableCell align="right">Email ID</StyledTableCell>
            <StyledTableCell align="right">Resume</StyledTableCell>
            <StyledTableCell align="right">REJECT</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
             <>
             {row.status==='Accepted' &&
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.applicantmodel.firstName}</StyledTableCell>
              <StyledTableCell align="right">{row.applicantmodel.email}</StyledTableCell>
              <StyledTableCell align="right"><GetAppIcon color='primary'/></StyledTableCell>
              <StyledTableCell align="right"><Button onClick={() => handleReject(row.id)}variant="contained" color="secondary">REJECT</Button></StyledTableCell>
            </StyledTableRow>
}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
