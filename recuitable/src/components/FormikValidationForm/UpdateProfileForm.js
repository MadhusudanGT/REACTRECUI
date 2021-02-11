import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as moment from 'moment'
import { Formik, Form } from "formik";
import * as yup from "yup";
import DataService from "../../Service/service";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let SignupSchema = yup.object().shape({
  firstName: yup.string()
  .min(2, 'Too Short!')
     .max(70, 'Too Long!')
     .required("This field is required."),
  lastName: yup.string()
  .min(2, 'Too Short!')
     .max(70, 'Too Long!')
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
        "error message",
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

 const UpdateProfileForm= ({data}) => {
  const classes = useStyles();
  let history = useHistory();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal} = state;

  const Close = () => {
    window.location="/UserManagement";
  }

  const [open, setOpen] = React.useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

  const updateUser=(id,data)=>{
    console.log(id+"/////"+JSON.stringify(data))
    DataService.update(id,JSON.stringify(data));
    handleClick();
    Close();
  }
  return (
    <>
    <div className={classes.root}>
     <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="success">
         user information updated successfully!
       </Alert>
     </Snackbar>
   </div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          UPDATE USER
        </Typography>
        <Formik
          initialValues={{
            id:data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email:data.email,
            adhar: data.adhar,
            dob:data.dob,
            status:data.status,
        createdAt:data.createdAt,
        updatedAt:data.updatedAt
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(values);
            updateUser(values.id,values)
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.firstName && touched.firstName}
                    autoComplete="fname"
                    defaultValue={data.firstName}
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
                    defaultValue={data.lastName}
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
                    defaultValue={data.email}
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
                    defaultValue={data.dob}
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
                    defaultValue={data.adhar}
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
                Update
              </Button>
              <Button color="secondary"  fullWidth
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


export default UpdateProfileForm;