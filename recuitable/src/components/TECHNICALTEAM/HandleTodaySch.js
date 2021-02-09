import React, { useEffect, useState } from 'react';
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
import ScheduledMeetings from "../../Service/ScheduledMeetings";

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


export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [row,setSceduled]=useState([]);
  useEffect(()=>{
    getMeetings();
  },[])
  const getMeetings = async () => {
    await ScheduledMeetings.fetchUsers()
       .then(response => {
        setSceduled(response.data);
         console.log(response);
       })
       .catch(e => {
         console.log(e);
       });
   };
   const [openUpdate, setOpenUpdate] = React.useState(false);
   const[UpdateData,setUpdateData]=useState([]);
   const handleReschuled=(id,data)=>{
     setUpdateData(data);
console.log(id+'...........'+UpdateData)
setOpenUpdate(true);
   }

   const handleReschuledClose = () => {
    setOpenUpdate(false);
  };

  const handleUpdate=(id,data)=>{
    let time=data.MeetingDate+'T'+data.MeetingTime+':'+'00';
    let dateObj = new Date(time);
    const updatejson={
      "id":id,
      "applicantId": data.ApplicantId,
  "meetingDescription": data.MeetingDescription,
  "meetingName": data.MeetingName,
  "platformLink": data.Platform,
  "recuiterId": data.RecuiterId,
  "scheduledDate": data.MeetingDate,
  "scheduledTime": dateObj,

  "schedulestatus": "Scheduled"
    }
console.log(updatejson)
ScheduledMeetings.editUser(id,updatejson);
  }


  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading} color='primary'>INTERVIEWS SCHEDULES</Typography>
          <Typography className={classes.secondaryHeading}color='primary'>THIS IS FOR OVER ALL INTERVIEW SCHEDULES</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
        <TableContainer component={Paper} style={{marginTop:'20px'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ApplicantID</StyledTableCell>
            <StyledTableCell align="right">MEETING NAME</StyledTableCell>
            <StyledTableCell align="right">RecuiterId</StyledTableCell>
            <StyledTableCell align="right">MEETING DATE</StyledTableCell>
            <StyledTableCell align="right">MEETING TIME</StyledTableCell>
            <StyledTableCell align="right">RESCHULIE MEETINGS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <StyledTableRow key={row.applicantId}>
              <StyledTableCell component="th" scope="row">
                {row.applicantId}
              </StyledTableCell>
              <StyledTableCell align="right">{row.meetingName}</StyledTableCell>
              <StyledTableCell align="right">{row.recuiterId}</StyledTableCell>
              <StyledTableCell align="right">{row.scheduledDate}</StyledTableCell>
              <StyledTableCell align="right">{row.scheduledTime}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="secondary" onClick={() => handleReschuled(row.id,row)}>RESCHULIED</Button></StyledTableCell>
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
          <Typography className={classes.heading} color='primary'>MEETINGS SCHEDULES INFORMATION</Typography>
          <Typography className={classes.secondaryHeading} color='primary'>
            ANY MEETINGS FROM COMPANY SIDE
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper} style={{marginTop:'20px'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ApplicantID</StyledTableCell>
            <StyledTableCell align="right">MEETING NAME</StyledTableCell>
            <StyledTableCell align="right">RecuiterId</StyledTableCell>
            <StyledTableCell align="right">MEETING DATE</StyledTableCell>
            <StyledTableCell align="right">MEETING TIME</StyledTableCell>
            <StyledTableCell align="right">RESCHULIE MEETINGS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <StyledTableRow key={row.applicantId}>
              <StyledTableCell component="th" scope="row">
                {row.applicantId}
              </StyledTableCell>
              <StyledTableCell align="right">{row.meetingName}</StyledTableCell>
              <StyledTableCell align="right">{row.recuiterId}</StyledTableCell>
              <StyledTableCell align="right">{row.scheduledDate}</StyledTableCell>
              <StyledTableCell align="right">{row.scheduledTime}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="secondary" onClick={() => handleReschuled(row.id,row)}>RESCHULIED</Button></StyledTableCell>
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
          <Typography className={classes.secondaryHeading}color='primary'>
            ANY TYPE OF MEETINGS ASSIGNED TO TECHNICAL TEAM
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
      
        <TableContainer component={Paper} style={{marginTop:'20px'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ApplicantID</StyledTableCell>
            <StyledTableCell align="right">MEETING NAME</StyledTableCell>
            <StyledTableCell align="right">RecuiterId</StyledTableCell>
            <StyledTableCell align="right">MEETING DATE</StyledTableCell>
            <StyledTableCell align="right">MEETING TIME</StyledTableCell>
            <StyledTableCell align="right">RESCHULIE MEETINGS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <StyledTableRow key={row.applicantId}>
              <StyledTableCell component="th" scope="row">
                {row.applicantId}
              </StyledTableCell>
              <StyledTableCell align="right">{row.meetingName}</StyledTableCell>
              <StyledTableCell align="right">{row.recuiterId}</StyledTableCell>
              <StyledTableCell align="right">{row.scheduledDate}</StyledTableCell>
              <StyledTableCell align="right">{row.scheduledTime}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="secondary" onClick={() => handleReschuled(row.id,row)}>RESCHULIED</Button></StyledTableCell>
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
