import React, { useState ,useEffect,useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
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
let Schema = yup.object().shape({
  ProjectName: yup.string()
  .min(2, 'Too Short!')
     .max(70, 'Too Long!'),
  ProjectDescription: yup.string()
  .min(20, 'Too Short!')
     .max(200, 'Too Long!'),
     WebSiteLink: yup.string()
     .min(5, 'Too Short!')
        .max(200, 'Too Long!'),
        Document: yup.string()
        .min(20, 'Too Short!')
           .max(200, 'Too Long!')
           .required("Documetn inforamtion is required."),
           experience: yup.number()
           .min(0, 'Too Short!')
              .max(5, 'Too Long!')
              .required("experience is required."),
})
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
    const [file, setFile] = useState(null);



  const UPLOAD_ENDPOINT =
    "https://recruitermanagementsystem.herokuapp.com/file/uploadFile";

  const handleSubmit = async e => {
    e.preventDefault();
    let res = await uploadFile(file);
  };

  const uploadFile = async file => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(UPLOAD_ENDPOINT, formData).then(res=>{
    });
    handleClickSnackbar();
  };

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
  const handleOnChange = e => {
    setFile(e.target.files[0]);
  };

  const [fields, setFields] = useState([{ value: null }]);
  const [checked, setChecked] = React.useState(true);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);

    setFields(values);
  }


  const[userdocument,setDocument]=useState(()=>{
    let storge=JSON.parse(localStorage.getItem('document'));
    return storge?storge:[];
  });
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
<div style={{marginTop:"20px"}}>
<form onSubmit={handleSubmit}>
      <Typography>UPLOAD RESUME(optional)</Typography>
      <Button
  variant="contained"
  component="label"
>
  Upload File
  <input type="file" onChange={handleOnChange} />
</Button>
     
      <Button color="secondary"
              variant="contained"
              color="primary" type="submit">Upload File</Button>
    </form>
              
            </div>
            <Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>ADD FIELDS</Typography>
            <Button
                type="submit"
                variant="contained"
                color="primary" type="button" onClick={() => handleAdd()}>
        +
      </Button>
            {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
        <Formik
          initialValues={{
         ProjectName:'',
         ProjectDescription:'',
         WebSiteLink:'',
         Document:'',
         LastUpdate:new Date(),
         experience:''
          }}
          validationSchema={Schema}
          onSubmit={values => {
            localStorage.setItem('document',JSON.stringify({...values}));
              setsnackcolor("success");
              setResponse("DOCUMENT SAVED SUCCESFULLY");
              handleClickSnackbar();  
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
                <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
              <Grid container spacing={2}>  
              <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.experience && touched.experience}
                    autoComplete="experience"
                    name="experience"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdocument.experience}
                    onChange={handleChange}
                    id="experience"
                    label="EXPERIENCE"
                    autoFocus
                    helperText={
                      errors.experience && touched.experience
                        ? errors.experience
                        : null
                    }
                  />
        </Grid>
 
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.ProjectName && touched.ProjectName}
                    autoComplete="ProjectName"
                    name="ProjectName"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdocument.ProjectName}
                    onChange={handleChange}
                    id="ProjectName"
                    label="PROJECT NAME"
                    autoFocus
                    helperText={
                      errors.ProjectName && touched.ProjectName
                        ? errors.ProjectName
                        : null
                    }
                  />
        </Grid>
             <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
          <TextField
                    error={errors.ProjectDescription && touched.ProjectDescription}
                    autoComplete="ProjectDescription"
                    name="ProjectDescription"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdocument.ProjectDescription}
                    onChange={handleChange}
                    id="ProjectDescription"
                    label="PROJECT DESCRIPTION"
                    autoFocus
                    helperText={
                      errors.ProjectDescription && touched.ProjectDescription
                        ? errors.ProjectDescription
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.WebSiteLink && touched.WebSiteLink}
                    autoComplete="WebSiteLink"
                    name="WebSiteLink"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdocument.WebSiteLink}
                    onChange={handleChange}
                    id="WebSiteLink"
                    label="URL"
                    autoFocus
                    helperText={
                      errors.WebSiteLink && touched.WebSiteLink
                        ? errors.WebSiteLink
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.Document && touched.Document}
                    autoComplete="Document"
                    name="Document"
                    variant="outlined"
                    fullWidth
                    defaultValue={userdocument.Document}
                    onChange={handleChange}
                    id="Document"
                    label="DOCUMENT INFORMATION"
                    autoFocus
                    helperText={
                      errors.Document && touched.Document
                        ? errors.Document
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
      
        <Button
                type="submit"
            
                variant="contained"
                color="primary" type="button" onClick={() => handleRemove(idx)}>
              X
            </Button>
          </div>
        );
      })}

</>
    )
}
export default UserDeatilsForm;