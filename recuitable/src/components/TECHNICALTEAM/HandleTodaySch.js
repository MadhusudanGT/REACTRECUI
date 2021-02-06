import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
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
  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 700,
  },
}));

function createData(ApplicationID, ApplicantName, RecuiterId, Resume,RESCHULIED) {
  return { ApplicationID, ApplicantName, RecuiterId , Resume,RESCHULIED};
}

const rows = [
  createData(1, 'MADHUSUDAN', 1,'DOWNLOAD','BUTTON'),
  createData(2, 'SHIV', 1,'DOWNLOAD', 'BUTTON'),
  createData(3, 'SWAGATA',1,'DOWNLOAD', 'BUTTON'),
  createData(4, 'UMESH',1,'DOWNLOAD',  'BUTTON'),
  createData(5, 'VISWA',1,'DOWNLOAD', 'BUTTON'),
];
export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading} color='primary'>TODAY'S INTERVIEWS SCHEDULES</Typography>
          <Typography className={classes.secondaryHeading} color='primary'>THIS IS FOR OVER ALL INTERVIEW SCHEDULES</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ApplicationID</StyledTableCell>
            <StyledTableCell align="right">ApplicantName</StyledTableCell>
            <StyledTableCell align="right">RecuiterId</StyledTableCell>
            <StyledTableCell align="right">Resume</StyledTableCell>
            <StyledTableCell align="right">RESCHULIED</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.ApplicationID}>
              <StyledTableCell component="th" scope="row">
                {row.ApplicationID}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ApplicantName}</StyledTableCell>
              <StyledTableCell align="right">{row.RecuiterId}</StyledTableCell>
              <StyledTableCell align="right"><GetAppIcon color='primary'/></StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="secondary">RESCHULIED</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading} color='primary'>TODAY'S MEETINGS SCHEDULES INFORMATION</Typography>
          <Typography className={classes.secondaryHeading} color='primary'>
            ANY MEETINGS FROM COMPANY SIDE
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ApplicationID</StyledTableCell>
            <StyledTableCell align="right">ApplicantName</StyledTableCell>
            <StyledTableCell align="right">RecuiterId</StyledTableCell>
            <StyledTableCell align="right">Resume</StyledTableCell>
            <StyledTableCell align="right">RESCHULIED</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.ApplicationID}>
              <StyledTableCell component="th" scope="row">
                {row.ApplicationID}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ApplicantName}</StyledTableCell>
              <StyledTableCell align="right">{row.RecuiterId}</StyledTableCell>
              <StyledTableCell align="right"><GetAppIcon color='primary'/></StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="secondary">RESCHULIED</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading} color='primary'>OTHER SCHEDULES</Typography>
          <Typography className={classes.secondaryHeading} color='primary'>
            ANY TYPE OF MEETINGS ASSIGNED TO TECHNICAL TEAM
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ApplicationID</StyledTableCell>
            <StyledTableCell align="right">ApplicantName</StyledTableCell>
            <StyledTableCell align="right">RecuiterId</StyledTableCell>
            <StyledTableCell align="right">Resume</StyledTableCell>
            <StyledTableCell align="right">RESCHULIED</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.ApplicationID}>
              <StyledTableCell component="th" scope="row">
                {row.ApplicationID}
              </StyledTableCell>
              <StyledTableCell align="right">{row.ApplicantName}</StyledTableCell>
              <StyledTableCell align="right">{row.RecuiterId}</StyledTableCell>
              <StyledTableCell align="right"><GetAppIcon color='primary'/></StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="secondary">RESCHULIED</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
