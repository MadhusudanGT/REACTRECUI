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
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import ApplicationService from "../../Service/ApplicationService";
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

  const handleAccept=(id)=>{
    ApplicationService.AcceptUser(id);
    retrieveUsers();
  }
  return (
    <>
    <Typography align='center'>REJECTED APPLICATION LIST</Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>APPLICATION ID</StyledTableCell>
            <StyledTableCell align="right">APPLICANT NAME</StyledTableCell>
            <StyledTableCell align="right">Email ID</StyledTableCell>
            <StyledTableCell align="right">RESUME LINK</StyledTableCell>
            <StyledTableCell align="right">REVOKE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
             <>
             {row.status==='Reject' &&
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.applicantmodel.firstName}</StyledTableCell>
              <StyledTableCell align="right">{row.applicantmodel.email}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.RecuiterId}</StyledTableCell> */}
              <StyledTableCell align="right"><GetAppIcon color='primary'/></StyledTableCell>
              <StyledTableCell align="right"><Button  onClick={() => handleAccept(row.id)} variant="contained" color="primary">REVOKE
</Button></StyledTableCell>
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
