import React, { useState ,useEffect,useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import axios from "axios";
import Card from '@material-ui/core/Card';
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import EducationDetails from "./EducationSkillsForm";
import UserDeatils from "./UserDeatilsForm";
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
const [Document ,setDocument]=useState([]);


  const UPLOAD_ENDPOINT =
    "http://localhost:8080/file/uploadFile";

  const handleSubmit = async e => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(file);
 
  };

  const uploadFile = async file => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(UPLOAD_ENDPOINT, formData).then(res=>{
      console.log(res);
    });
  };

  const handleOnChange = e => {
    console.log(e.target.files[0]);
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

  const [education,seteducation]=useReducer(EducationDetails,[],()=>{
    const educationdata=localStorage.getItem('education');
    console.log(educationdata);
    return educationdata?JSON.parse(educationdata):[];
   
  })
  useEffect(()=>{
    const educationdata=JSON.parse(localStorage.getItem('education'));
    console.log(educationdata)
  },[])
    return(
<>
<div style={{marginTop:"20px"}}>
<form onSubmit={handleSubmit}>
      <Typography>UPLOAD RESUME</Typography>
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
         LastUpdate:Date.now()
          }}
          validationSchema={Schema}
          onSubmit={values => {
            console.log(values)
       
            localStorage.setItem('document',JSON.stringify(values))
            
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
                <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
              <Grid container spacing={2}>   
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.ProjectName && touched.ProjectName}
                    autoComplete="ProjectName"
                    name="ProjectName"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="ProjectName"
                    label="ProjectName"
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
                    onChange={handleChange}
                    id="ProjectDescription"
                    label="ProjectDescription"
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
                    onChange={handleChange}
                    id="Document"
                    label="Document INFORAMTION"
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
        
              {/* <Button
                type="submit"
            
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button> */}
             Verfiy the form and click this <Checkbox
       type="submit"
       className={classes.submit}
       checked={checked}
        onChange={handleChangeCheck}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
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