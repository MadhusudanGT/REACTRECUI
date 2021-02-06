import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

  return (
    <div>
      <Button type="button" onClick={handleOpen}  variant="contained"
              color="primary">
        SCHEULED
      </Button>
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
            MeetingTime:''
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            console.log(values);

          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
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
                    name="MeetingDate"
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
    </div>
  );
}
