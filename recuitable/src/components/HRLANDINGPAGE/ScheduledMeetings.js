import React, { useEffect, useState } from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as moment from 'moment';
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScheduledMeetings from "../../Service/ScheduledMeetings";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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


let SignupSchema = yup.object().shape({
    MeetingName: yup.string()
    .min(2, 'Too Short!')
       .max(70, 'Too Long!')
       .required("This field is required."),
       MeetingDescription: yup.string()
       .min(10, 'Too Short!')
          .max(70, 'Too Long!')
          .required("This field is required."),
          Platform: yup.string()
          .min(10, 'Too Short!')
             .max(70, 'Too Long!')
             .required("direct or online interview is required."),
                 MeetingDate: yup.date()
        .min(new Date())
        .required(),
        ApplicantId:yup.number()
        .min(1, 'Too Short!')
           .max(5, 'Too Long!')
           .required("required."),
           RecuiterId:yup.number()
           .min(1, 'Too Short!')
              .max(5, 'Too Long!')
              .required("required."),
  });

  
const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
          backgroundColor: theme.palette.common.white
        }
      },
      paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
      },
      submit: {
        margin: theme.spacing(3, 0, 2)
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

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveScheduled=(data)=>{
    let time=data.MeetingDate+'T'+data.MeetingTime+':'+'00';
    let dateObj = new Date(time);
    console.log(dateObj);
    console.log(time)
    const json={
      "applicantId": data.ApplicantId,
  "meetingDescription": data.MeetingDescription,
  "meetingName": data.MeetingName,
  "platformLink": data.Platform,
  "recuiterId": data.RecuiterId,
  "scheduledDate": data.MeetingDate,
  "scheduledTime": dateObj,
  "schedulestatus": "Scheduled"
    }
    ScheduledMeetings.create(json);
    console.log("success")
  }
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
    <div>
      <Button type="button" onClick={handleOpen}  variant="contained"
              color="primary">
        SCHEULED
      </Button>
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
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          SCEHULE MEETING
        </Typography>
        <Formik
          initialValues={{
            MeetingName:'',
            MeetingDescription:'',
            Platform:'',
            MeetingDate:new Date(),
            MeetingTime:'',
            ApplicantId:'',
            RecuiterId:''
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(values);
            saveScheduled(values);
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.ApplicantId && touched.ApplicantId}
                    autoComplete="ApplicantId"
                    name="ApplicantId"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="ApplicantId"
                    label="ApplicantId"
                    autoFocus
                    helperText={
                      errors.ApplicantId && touched.ApplicantId
                        ? errors.ApplicantId
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.RecuiterId && touched.RecuiterId}
                    autoComplete="RecuiterId"
                    name="RecuiterId"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="RecuiterId"
                    label="RecuiterId"
                    autoFocus
                    helperText={
                      errors.RecuiterId && touched.RecuiterId
                        ? errors.RecuiterId
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.MeetingName && touched.MeetingName}
                    autoComplete="MeetingName"
                    name="MeetingName"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="MeetingName"
                    label="MeetingName"
                    autoFocus
                    helperText={
                      errors.MeetingName && touched.MeetingName
                        ? errors.MeetingName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.MeetingDescription && touched.MeetingDescription}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="MeetingDescription"
                    label="MeetingDescription"
                    name="MeetingDescription"
                    autoComplete="lname"
                    helperText={
                      errors.MeetingDescription && touched.MeetingDescription
                        ? errors.MeetingDescription
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.Platform && touched.Platform}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="Platform"
                    label="Platform"
                    name="Platform"
                    autoComplete="Platform"
                    helperText={
                      errors.Platform && touched.Platform ? errors.Platform : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.MeetingDate && touched.MeetingDate}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="MeetingDate"
                    label="MeetingDate"
                    name="MeetingDate"
                    type="date"
                    autoComplete="MeetingDate"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      errors.MeetingDate && touched.MeetingDate ? errors.MeetingDate : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={errors.MeetingTime && touched.MeetingTime}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="MeetingTime"
                    label="MeetingTime"
                    name="MeetingTime"
                    type="time"
                    defaultValue="10:30"
                    autoComplete="MeetingTime"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      errors.MeetingTime && touched.MeetingTime ? errors.MeetingTime : null
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
              <Button color="secondary"
              
              variant="contained"
              color="primary"
               onClick={handleClose}>CANCEL</Button>

            </Form>
          )}
        </Formik>
        </div>
    </Container>
        </Fade>
      </Modal>
    {/* ------------------- */}

    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openUpdate}
        onClose={handleReschuledClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUpdate}>
          <div className={classes.paper}>
          <Typography component="h1" variant="h5">
          SCEHULE MEETING
        </Typography>
        <Formik
          initialValues={{
            MeetingName:'',
            MeetingDescription:'',
            Platform:'',
            MeetingDate:new Date(),
            MeetingTime:'',
            ApplicantId:'',
            RecuiterId:''
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // console.log("update"+values);
           handleUpdate(UpdateData.id,values);
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.ApplicantId && touched.ApplicantId}
                    autoComplete="ApplicantId"
                    name="ApplicantId"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    defaultValue={UpdateData.applicantId}
                    id="ApplicantId"
                    label="ApplicantId"
                    autoFocus
                    helperText={
                      errors.ApplicantId && touched.ApplicantId
                        ? errors.ApplicantId
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.RecuiterId && touched.RecuiterId}
                    autoComplete="RecuiterId"
                    name="RecuiterId"
                    variant="outlined"
                    fullWidth
                    defaultValue={UpdateData.recuiterId}
                    onChange={handleChange}
                    id="RecuiterId"
                    label="RecuiterId"
                    autoFocus
                    helperText={
                      errors.RecuiterId && touched.RecuiterId
                        ? errors.RecuiterId
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.MeetingName && touched.MeetingName}
                    autoComplete="MeetingName"
                    name="MeetingName"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    defaultValue={UpdateData.meetingName}
                    id="MeetingName"
                    label="MeetingName"
                    autoFocus
                    helperText={
                      errors.MeetingName && touched.MeetingName
                        ? errors.MeetingName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.MeetingDescription && touched.MeetingDescription}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    defaultValue={UpdateData.meetingDescription}
                    id="MeetingDescription"
                    label="MeetingDescription"
                    name="MeetingDescription"
                    autoComplete="lname"
                    helperText={
                      errors.MeetingDescription && touched.MeetingDescription
                        ? errors.MeetingDescription
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.Platform && touched.Platform}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    defaultValue={UpdateData.platformLink}
                    id="Platform"
                    label="Platform"
                    name="Platform"
                    autoComplete="Platform"
                    helperText={
                      errors.Platform && touched.Platform ? errors.Platform : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.MeetingDate && touched.MeetingDate}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    defaultValue={UpdateData.scheduledDate}
                    id="MeetingDate"
                    label="MeetingDate"
                    name="MeetingDate"
                    type="date"
                    autoComplete="MeetingDate"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      errors.MeetingDate && touched.MeetingDate ? errors.MeetingDate : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={errors.MeetingTime && touched.MeetingTime}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    defaultValue={UpdateData.scheduledTime}
                    id="MeetingTime"
                    label="MeetingTime"
                    name="MeetingTime"
                    type="time"
                    defaultValue="10:30"
                    autoComplete="MeetingTime"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      errors.MeetingTime && touched.MeetingTime ? errors.MeetingTime : null
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>
              <Button color="secondary"
              
              variant="contained"
              color="primary"
               onClick={handleReschuledClose}>CANCEL</Button>

            </Form>
          )}
        </Formik>
            </div>
        </Fade>
      </Modal>

    </div>
    // -----

    
  );
}
