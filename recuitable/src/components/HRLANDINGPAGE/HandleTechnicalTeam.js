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
import HandleTechnicalTeamService from "../../Service/HandleTechnicalTeam";
import Menu from "../MenuBar/Menu";
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


let SignupSchema = yup.object().shape({
    username: yup.string()
    .min(2, 'Too Short!')
       .max(70, 'Too Long!')
       .required("This field is required."),
       position: yup.string()
       .min(4, 'Too Short!')
          .max(70, 'Too Long!')
          .required("This field is required."),
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
    const json={
        "firstName": data.username,
        "lastName": data.position
    }
    HandleTechnicalTeamService.create(json);
    handleClickSnackbar();
    getMeetings();
    console.log("success",json)
  }
  const [row,setSceduled]=useState([]);
  useEffect(()=>{
    getMeetings();
  },[])
  const getMeetings = async () => {
    await HandleTechnicalTeamService.fetchUsers()
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
// console.log(id+'...........'+UpdateData)
getMeetings();
setOpenUpdate(true);
   }

   const handleReschuledClose = () => {
    setOpenUpdate(false);
  };

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
      <Menu/>
      <div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}
       open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
      RECUITER CREATED SUCCESSFULLY
        </Alert>
      </Snackbar>
    </div>
    <div>
      <Button type="button" onClick={handleOpen}  variant="contained" style={{marginTop:'20px'}}
              color="primary">
        CREATE RECUITER
      </Button>
       <TableContainer component={Paper} style={{marginTop:'20px'}} >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>RecuiterID</StyledTableCell>
            <StyledTableCell align="right">USER NAME</StyledTableCell>
            <StyledTableCell align="right">POSITION</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.firstName}</StyledTableCell>
              <StyledTableCell align="right">{row.lastName}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.scheduledDate}</StyledTableCell>
              <StyledTableCell align="right">{row.scheduledTime}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="secondary" onClick={() => handleReschuled(row.id,row)}>RESCHULIED</Button></StyledTableCell>
            */}
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
           username:'',
           position:''
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
            
                <Grid item xs={12}>
                  <TextField
                    error={errors.username && touched.username}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      errors.username && touched.username ? errors.username : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    error={errors.position && touched.position}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="position"
                    label="position"
                    name="position"
                    autoComplete="position"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      errors.position && touched.position ? errors.position : null
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
</div>

    </>
  );
}
