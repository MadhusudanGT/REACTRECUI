import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import { Formik, Form} from "formik";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const addressRegex = /^[a-zA-Z0-9][a-zA-Z0-9 .,-]*$/;

let Schema = yup.object().shape({
  firstName: yup.string()
  .min(2, 'Too Short!')
     .max(70, 'Too Long!')
     .required("This field is required."),
  lastName: yup.string()
  .min(1, 'Too Short!')
     .max(20, 'Too Long!')
     .required("This field is required."),
  email: yup
    .string()
    .email()
    .required("This field is required."),
      phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      summary: yup.string()
      .min(10, 'Too Short!')
         .max(250, 'Too Long!')
         .required("Please tell about yourself"),

         street1: yup.string()
         .min(2, "Must be at least ${min} characters.")
         .max(60, "Must be no more than ${max} characters.")
         .matches(
           addressRegex,
           "May only contain hyphens, periods, commas or alphanumeric characters."
         )
         .required("Required."),
       street2: yup.string()
         .nullable()
         .max(60, "Must be no more than ${max} characters.")
         .matches(addressRegex, {
           excludeEmptyString: true,
           message:
             "May only contain hyphens, periods, commas or alphanumeric characters."
         }),
       city: yup.string()
         .max(20, "Must be no more than ${max} characters.")
         .matches(
           addressRegex,
           "May only contain hyphens, periods, commas or alphanumeric characters."
         )
         .required("Required."),
       state: yup.string().required("Required."),
       zipCode: yup.number()
         .min(501, "Invalid zip code.")
         .max(999501, "Invalid zip code.")
         .required("Required.")  

});

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        minWidth: 275,
      },
    },
  }));

const  UserDeatilsForm=()=>{
    const classes = useStyles();


    const [checked, setChecked] = React.useState(true);

    const handleChangeCheck = (event) => {
      setChecked(event.target.checked);
    };



    const[userdeatils,setuserdeatils]=useState(()=>{
      let storge=JSON.parse(localStorage.getItem('userdetails'));
  
      return storge?storge:[];
    });

    
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [response,setResponse]=React.useState([]);
  const [snackcolor,setsnackcolor]=React.useState('');
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

    return(
<>
<div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}
       open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackcolor}>
     {response}
        </Alert>
      </Snackbar>
    </div>
<Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>Basic Details</Typography>
        <Formik
          initialValues={{
          firstName:userdeatils.firstName,
          lastName:'',
          email:'',
          phoneNumber:'',
          summary:'',
          dataofappl:new Date(),
          street1:'',
          street2:'',
          city:'',
          state:'',
          zipCode:''
          }}
          validationSchema={Schema}
          onSubmit={values => {
            console.log(values)
        
            setuserdeatils({...values});
            localStorage.setItem('emailvalue',values.email)
            localStorage.setItem('userdetails',JSON.stringify({...values}))
            setsnackcolor("success");
              setResponse("USER DETAILS SAVED SUCCESFULLY");
              handleClickSnackbar(); 
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
                <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
              <Grid container spacing={2}>   
                <Grid item xs={12} sm={6}>
                <TextField
                    error={errors.firstName && touched.firstName}
                    autoComplete="firstName"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.firstName}
                    onChange={handleChange}
                    id="firstName"
                    label="FIRST NAME"
                    autoFocus
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.lastName && touched.lastName}
                    autoComplete="lastName"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.lastName}
                    onChange={handleChange}
                    id="lastName"
                    label="LAST NAME"
                    autoFocus
                    helperText={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : null
                    }
                  />
        </Grid>
             <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
          <TextField
                    error={errors.email && touched.email}
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.email}
                    onChange={handleChange}
                    id="email"
                    label="EMAIL ID"
                    autoFocus
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.phoneNumber && touched.phoneNumber}
                    autoComplete="phoneNumber"
                    name="phoneNumber"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.phoneNumber}
                    onChange={handleChange}
                    id="phoneNumber"
                    label="PHONE NO"
                    autoFocus
                    helperText={
                      errors.phoneNumber && touched.phoneNumber
                        ? errors.phoneNumber
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.summary && touched.summary}
                    autoComplete="summary"
                    name="summary"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.summary}
                    onChange={handleChange}
                    id="summary"
                    label="SUMMARY"
                    autoFocus
                    helperText={
                      errors.summary && touched.summary
                        ? errors.summary
                        : null
                    }
                  />
        </Grid>
      </Grid>
              
                </Grid>
                </CardContent>
                </Card>
                <Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>
                  Address Details</Typography>
                  <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
              <Grid container spacing={2}>   
                <Grid item xs={12} sm={6}>
                <TextField
                    error={errors.street1 && touched.street1}
                    autoComplete="street1"
                    name="street1"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.street1}
                    onChange={handleChange}
                    id="street1"
                    label="ADDRESS LINE1"
                    autoFocus
                    helperText={
                      errors.street1 && touched.street1
                        ? errors.street1
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.street2 && touched.street2}
                    autoComplete="street2"
                    name="street2"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.street2}
                    onChange={handleChange}
                    id="street2"
                    label="ADDRESS LINE2"
                    autoFocus
                    helperText={
                      errors.street2 && touched.street2
                        ? errors.street2
                        : null
                    }
                  />
        </Grid>
             <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
      
          <TextField
                    error={errors.city && touched.city}
                    autoComplete="city"
                    name="city"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.city}
                    onChange={handleChange}
                    id="city"
                    label="CITY"
                    autoFocus
                    helperText={
                      errors.city && touched.city
                        ? errors.city
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.state && touched.state}
                    autoComplete="state"
                    name="state"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdeatils.state}
                    onChange={handleChange}
                    id="state"
                    label="STATE"
                    autoFocus
                    helperText={
                      errors.state && touched.state
                        ? errors.state
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.zipCode && touched.zipCode}
                    autoComplete="zipCode"
                    name="zipCode"
                    variant="outlined"
                    defaultValue={userdeatils.zipCode}
                    onChange={handleChange}
                    id="zipCode"
                    label="Pin Code"
                    autoFocus
                    helperText={
                      errors.zipCode && touched.zipCode
                        ? errors.zipCode
                        : null
                    }
                  />
        </Grid>
      </Grid>
              
                </Grid>
                </CardContent>
                </Card>
                {/* ------- */}
        
        
                <Button
                type="submit"
            
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
             

            </Form>
            
          )}
        </Formik>


</>
    )
}
export default UserDeatilsForm;