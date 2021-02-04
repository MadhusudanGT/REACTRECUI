import React from 'react';
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

function createData(ApplicationID, ApplicantName, ProfileLink, RecuiterId, REVOKE) {
  return { ApplicationID, ApplicantName, ProfileLink , RecuiterId, REVOKE};
}

const rows = [
  createData(1, 'MADHUSUDAN', 'LINK',1, 'BUTTON'),
  createData(2, 'SHIV', 'LINK',1, 'BUTTON'),
  createData(3, 'SWAGATA','LINK',1, 'BUTTON'),
  createData(4, 'UMESH','LINK',1, 'BUTTON'),
  createData(5, 'VISWA','LINK',1, 'BUTTON'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <>
    <Typography align='center'>REJECTED APPLICATION LIST</Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>APPLICATION ID</StyledTableCell>
            <StyledTableCell align="right">APPLICANT NAME</StyledTableCell>
            <StyledTableCell align="right">PROFILE LINK</StyledTableCell>
            <StyledTableCell align="right">RECUITER ID</StyledTableCell>
            <StyledTableCell align="right">REVOKE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.ApplicationID}>
              <StyledTableCell component="th" scope="row">
                {row.ApplicationID}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ApplicantName}</StyledTableCell>
              <StyledTableCell align="right">{row.ProfileLink}</StyledTableCell>
              <StyledTableCell align="right">{row.RecuiterId}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="primary">REVOKE
</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
