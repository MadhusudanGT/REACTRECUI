import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuBar from "../MenuBar/Menu"
import { Formik, Form } from "formik";
import * as yup from "yup";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import JobService from "../../Service/JobService"
import { date } from "yup/lib/locale";
import * as moment from 'moment';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


let SignupSchema = yup.object().shape({
  JobTitle: yup.string()
    .min(2, 'Too Short!')
       .max(70, 'Too Long!')
       .required("This field is required."),
    JobDescription: yup.string()
    .min(10, 'Too Short!')
       .max(500, 'Too Long!')
       .required("This field is required."),
    ContactEmail: yup
      .string()
      .email()
      .required("This field is required."),
      NoOfVacanci:yup.number().min(1).required('this field is required'),

      platname: yup.string()
      .min(2, 'Too Short!')
         .max(70, 'Too Long!')
         .required("This field is required."),

         platdescription: yup.string()
         .min(20, 'Too Short!')
            .max(250, 'Too Long!')
            .required("This field is required."),

            orgName: yup.string()
            .min(2, 'Too Short!')
               .max(70, 'Too Long!')
               .required("This field is required."),
            
               orgDescription: yup.string()
               .min(20, 'Too Short!')
                  .max(70, 'Too Long!')
                  .required("This field is required."),

                  location: yup.string()
               .min(5, 'Too Short!')
                  .max(70, 'Too Long!')
                  .required("This field is required.")  ,
phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
// startingDate:yup.string().test(
//   "dob",
//   "current date",
//   value => {
//     return moment().diff(moment(value),'days') == 1;
//   }
// )
});


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  root: {
      flexGrow: 1,
      minWidth: 275,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
  }
}));

 const RegistrationForm= () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  
  const { vertical, horizontal} = state;
  const [open, setOpen] = React.useState(false);



const Close = () => {
  window.location="/HrPage"
}

const Jobcreate=(e)=>{
const jobjson=
{
  email:e.ContactEmail,
  datePublished:e.StartingDate,
  description:e.JobDescription,
  endingDate:e.StartingDate,
  jobPlatform: {
    platformName:e.platname,
    platformDescription:e.platdescription,
  },
  jobPosition: {
    description: e.JobDescription,
    jobCategory: e.JobTitle,
    name: e.JobTitle
  },
  location:e.location,
  name:e.JobTitle,
  organization: {
    orgDescription:e.orgDescription,
      orgName:e.orgName
  },
  phoneno:e.phoneNumber,
  startingDate:e.StartingDate,
  vacancy:e.NoOfVacanci,
}

// console.log(jobjson)
JobService.createjob(jobjson)
handleClickSnackbar();
console.log("success");
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
  return (
    <>
    <div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}
       open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
     NEW JOB REQUIREMENT UPDATED SUCCESSFULLY
        </Alert>
      </Snackbar>
    </div>
        <MenuBar/>
        <Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>Basic Job Details</Typography>
        <Formik
          initialValues={{
            JobTitle:"",
            JobDescription:"",
            ContactEmail:"",
            NoOfVacanci:"",
            platname:"",
            platdescription:"",
            orgName:"",
            orgDescription:"",
            StartingDate:"",
            location:'',
            salary:'',
            phoneNumber:''
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(values)
            Jobcreate(values);
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
                <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
              <Grid container spacing={2}>   
                <Grid item xs={12} sm={6}>
                <TextField
                    error={errors.JobTitle && touched.JobTitle}
                    autoComplete="JobTitle"
                    name="JobTitle"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="JobTitle"
                    label="JOB TITLE"
                    autoFocus
                    helperText={
                      errors.JobTitle && touched.JobTitle
                        ? errors.JobTitle
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.JobDescription && touched.JobDescription}
                    autoComplete="JobDescription"
                    name="JobDescription"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="JobDescription"
                    label="JOB DESCRIPTION"
                    autoFocus
                    helperText={
                      errors.firstJobDescription && touched.JobDescription
                        ? errors.JobDescription
                        : null
                    }
                  />
        </Grid>
             <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
          <TextField
                    error={errors.salary && touched.salary}
                    autoComplete="salary"
                    name="salary"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="salary"
                    label="SALARY"
                    autoFocus
                    helperText={
                      errors.salary && touched.salary
                        ? errors.salary
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.location && touched.location}
                    autoComplete="location"
                    name="location"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="location"
                    label="LOCATION"
                    autoFocus
                    helperText={
                      errors.location && touched.location
                        ? errors.location
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.NoOfVacanci && touched.NoOfVacanci}
                    autoComplete="NoOfVacanci"
                    name="NoOfVacanci"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="NoOfVacanci"
                    label="NO OF VACANCIES"
                    autoFocus
                    helperText={
                      errors.NoOfVacanci && touched.NoOfVacanci
                        ? errors.NoOfVacanci
                        : null
                    }
                  />
        </Grid>
      </Grid>
              
                </Grid>
                </CardContent>
                </Card>
                <Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>
                  Organization Details</Typography>
                  <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
              <Grid container spacing={2}>   
                <Grid item xs={12} sm={6}>
                <TextField
                    error={errors.orgName && touched.orgName}
                    autoComplete="orgName"
                    name="orgName"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="orgName"
                    label="ORGANIZATION NAME"
                    autoFocus
                    helperText={
                      errors.orgName && touched.orgName
                        ? errors.orgName
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.orgDescription && touched.orgDescription}
                    autoComplete="orgDescription"
                    name="orgDescription"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="orgDescription"
                    label="ORGANIZATION DESCRIPTION"
                    autoFocus
                    helperText={
                      errors.orgDescription && touched.orgDescription
                        ? errors.orgDescription
                        : null
                    }
                  />
        </Grid>
             <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
      
          <TextField
                    error={errors.StartingDate && touched.StartingDate}
                    autoComplete="StartingDate"
                    name="StartingDate"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="StartingDate"
                    label="STARTING DATE"
                    autoFocus
                    type="date"
                    autoComplete="startingDate"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      errors.StartingDate && touched.StartingDate
                        ? errors.StartingDate
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.platname && touched.platname}
                    autoComplete="platname"
                    name="platname"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="platname"
                    label="PLATFORM NAME"
                    autoFocus
                    helperText={
                      errors.platname && touched.platname
                        ? errors.platname
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.platdescription && touched.platdescription}
                    autoComplete="platdescription"
                    name="platdescription"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="platdescription"
                    label="PLATFORM DESCRIPTION"
                    autoFocus
                    helperText={
                      errors.platdescription && touched.platdescription
                        ? errors.platdescription
                        : null
                    }
                  />
        </Grid>
      </Grid>
              
                </Grid>
                </CardContent>
                </Card>
              {/* ---- */}
              <Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>
                  Contact Details</Typography>
                  <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
              <Grid container spacing={2}>   
                <Grid item xs={12} sm={6}>
                <TextField
                    error={errors.ContactEmail && touched.ContactEmail}
                    autoComplete="ContactEmail"
                    name="ContactEmail"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="ContactEmail"
                    label="CONTACT EMAIL"
                    autoFocus
                    helperText={
                      errors.ContactEmail && touched.ContactEmail
                        ? errors.ContactEmail
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.phoneNumber && touched.phoneNumber}
                    autoComplete="phoneNumber"
                    name="phoneNumber"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="phoneNumber"
                    label="PHONE NUMBER"
                    autoFocus
                    helperText={
                      errors.phoneNumber && touched.phoneNumber
                        ? errors.phoneNumber
                        : null
                    }
                  />
        </Grid>
             {/* {/* <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
          <TextField
                    error={errors.salary && touched.salary}
                    autoComplete="salary"
                    name="salary"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="salary"
                    label="salary"
                    autoFocus
                    helperText={
                      errors.salary && touched.salary
                        ? errors.salary
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.location && touched.location}
                    autoComplete="location"
                    name="location"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="location"
                    label="location"
                    autoFocus
                    helperText={
                      errors.location && touched.location
                        ? errors.location
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.NoOfVacanci && touched.NoOfVacanci}
                    autoComplete="NoOfVacanci"
                    name="NoOfVacanci"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="NoOfVacanci"
                    label="NoOfVacanci"
                    autoFocus
                    helperText={
                      errors.NoOfVacanci && touched.NoOfVacanci
                        ? errors.NoOfVacanci
                        : null
                    }
                  />
        </Grid>
      </Grid>
               */}
                </Grid> 
                </CardContent>
                </Card>
                {/* ------- */}
        
              <Button
                type="submit"
                style={{width:'100px'}}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>&nbsp;&nbsp;&nbsp;
              <Button color="secondary"
          
              variant="contained"
              color="primary"
               onClick={Close}>CANCEL</Button>

            </Form>
            
          )}
        </Formik>


    </>
  );
};


export default RegistrationForm;