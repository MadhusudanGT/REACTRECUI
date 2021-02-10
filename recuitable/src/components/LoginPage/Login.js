import React, { useEffect } from "react";
import "./Login.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { withStyles,makeStyles } from '@material-ui/core/styles';
import RegService from "../../Service/RegService";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));
const Login = () => {
  const classes = useStyles();
  let history = useHistory();
  const paperStyle = { padding: 20, width: 280, margin: "55px auto" };
  const avatarStyle = { backgroundColor: "#AF0069" };
  const btnStyle = { margin: "15px 0px" };
 
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    const regjson = {
      email: values.email,
      password: values.password,
    };
    console.log("regjson", regjson);
    RegService.findByEmail(values.email).then(res=>{
      setemail(res.data);
    });
    console.log(getemail.email+",...."+getemail.password)
    if(getemail.email===values.email||getemail.password===values.password){
      history.push("/DetailsForm");
     }
    if(values.email==='swagata@gmail.com' && values.password==='swagata@2020'){
      history.push("/UserManagement");
     }
     if(values.email==='madhu@gmail.com' && values.password==='madhu@2020'){
      history.push("/HrPage");
     }
     if(values.email==='lohitha@gmail.com' && values.password==='lohitha@2020'){
      history.push("/TechnicalTeam");
     }
    handleClickSnackbar();
    console.log("login sucessfully done");
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    console.log(props);
  };

  const handleSignin = () => {
    history.push("/registration");
  };

  const handleForgetPass = () => {
    history.push("/ForgetPassword");
  };
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [getemail,setemail]=React.useState([]);
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
    <div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}
       open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
      USER LOGIN SUCCESSFULLY
        </Alert>
      </Snackbar>
    </div>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login Here</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                placeholder="Enter Username"
                helperText={<ErrorMessage name="username" />}
                fullWidth
                required
              />
              <Field
                as={TextField}
                style={{ marginTop: "10px" }}
                name="password"
                label="Password"
                helperText={<ErrorMessage name="password" />}
                placeholder="Enter Password"
                type="password"
                fullWidth
                required
              />
              <Typography style={{ marginTop: "10px" }}>
              <Link onClick={handleForgetPass}> Forget password ?</Link>
              </Typography>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnStyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Login"}
              </Button>
            </Form>
          )}
        </Formik>

        <Typography>
          Do you have an account?<Link onClick={handleSignin}> Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
    </>
  );
};
export default Login;
