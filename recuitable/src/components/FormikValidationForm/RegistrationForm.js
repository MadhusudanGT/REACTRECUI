import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as moment from 'moment';
import { Formik, Form } from "formik";
import * as yup from "yup";
import DataService from "../../Service/service";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let SignupSchema = yup.object().shape({
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
  adhar: yup
    .string()
    .min(12, "Adhar Number is too short.")
    .max(12, "Adhar Number is too long.")
    .required("This field is required."),
    dob:yup.string().test(
        "dob",
        "Age must be above 18",
        value => {
          return moment().diff(moment(value),'years') >= 18;
        }
      )
      

});

const useStyles = makeStyles(theme => ({
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
const[response,setresponse]=useState('');
const[snackcolor,setscackcolor]=useState('');
const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const Close = () => {
  window.location="/"
}

const  createUser= async (data)=>{
  console.log(data);
let response=await DataService.create(data);

console.log("response of create"+JSON.stringify(response.data))
setresponse(response.data)
setOpen(false);
handleClick(true)

if(response){
  setState({ opens: true,  vertical: 'top', horizontal: 'right' });
  handleClick({ vertical: 'top', horizontal: 'right' })
if(response.data==="The Email is already Present, Failed to Create new User"){
  response="";
setscackcolor("error")
}
else{
  setscackcolor("success")
  response="";
}

}
handleClick();
}

  return (
    <>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
   
   key={vertical + horizontal}
   anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity={snackcolor}
       
        >
         {response}
        </Alert>
      </Snackbar>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          CREATE USER
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            adhar: "",
            dob:'',
            status:'Active',
            createdAt:Date.now(),
            updatedAt:Date.now()
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(values);
createUser(values)
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.firstName && touched.firstName}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="firstName"
                    label="First Name"
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
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    helperText={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.dob && touched.dob}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="dob"
                    label="DOB"
                    name="dob"
                    type="date"
                    autoComplete="dob"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={
                      errors.dob && touched.dob ? errors.dob : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.adhar && touched.adhar}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="adhar"
                    label="adhar"
                    type="textField"
                    id="adhar"
                    autoComplete="current-password"
                    helperText={
                      errors.adhar && touched.adhar
                        ? errors.adhar
                        : null
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
              <Button color="secondary"
              fullWidth
              variant="contained"
              color="primary"
               onClick={Close}>CANCEL</Button>

            </Form>
          )}
        </Formik>
      </div>
    </Container>
    </>
  );
};


export default RegistrationForm;