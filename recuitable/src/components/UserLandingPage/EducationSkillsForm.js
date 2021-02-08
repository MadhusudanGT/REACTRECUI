import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Card from '@material-ui/core/Card';
import { Formik, Form, Field, ErrorMessage  } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
let Schema = yup.object().shape({
  schoolName: yup.string()
  .min(4, 'Too Short!')
     .max(70, 'Too Long!')
     .required("This field is required."),
  schoolBoard: yup.string()
  .min(5, 'Too Short!')
     .max(70, 'Too Long!')
     .required("This field is required."),
     completedYear: yup.number()
     .min(2000, 'Too Short!')
     .max(2020, 'Too Long!')
        .required("This field is required."),    
        percentage:yup.number()
        .min(55, 'Too Short!')
        .max(100, 'Too Long!')
        .required("This field is required."),
        place:yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required("This field is required."),

        collageName: yup.string()
  .min(4, 'Too Short!')
     .max(70, 'Too Long!')
     .required("This field is required."),
  collageBoard: yup.string()
  .min(5, 'Too Short!')
     .max(70, 'Too Long!')
     .required("This field is required."),
     completedYear1: yup.number()
     .min(2000, 'Too Short!')
        .max(2020, 'Too Long!')
        .required("This field is required."),    
        percentage1:yup.number()
        .min(55, 'Too Short!')
        .max(100, 'Too Long!')
        .required("This field is required."),
        place1:yup.string().
        min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required("This field is required."),

        
        collageName1: yup.string()
  .min(4, 'Too Short!')
     .max(70, 'Too Long!')
     .required("This field is required."),
  collageBoard1: yup.string()
  .min(5, 'Too Short!')
     .max(70, 'Too Long!')
     .required("This field is required."),
     completedYear2: yup.number()
     .min(2000, 'Too Short!')
        .max(2020, 'Too Long!')
        .required("This field is required."),    
        percentage2:yup.number()
        .min(55, 'Too Short!')
        .max(100, 'Too Long!')
        .required("This field is required."),
        place2:yup.string().
        min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required("This field is required."),
       
        

});

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        minWidth: 275,
      },
    },
  }));

const  UserDeatilsForm=({educdata})=>{
    const classes = useStyles();
   
const [educationDeatails,seteducationDeatails]=useState([]);
    const [checked, setChecked] = React.useState(true);

    const handleChangeCheck = (event) => {
      setChecked(event.target.checked);
    };
   
    const[education,setEducation]=useState(()=>{
      let storge=JSON.parse(localStorage.getItem('education'));
      return storge?storge:[];
    });
    return(
      <>
<Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>SECONDARY EDUCATION DEATILS (10th)</Typography>
        <Formik
          initialValues={{
          schoolName:'',
          schoolBoard:'',
          completedYear:'',
          percentage:'',
          place:'',

          collageName:'',
          collageBoard:'',
          completedYear1:'',
          percentage1:'',
          place1:'',

          collageName1:'',
          collageBoard1:'',
          completedYear2:'',
          percentage2:'',
          place2:''
          }}
          validationSchema={Schema}
          onSubmit={values => {
            console.log(values)
            localStorage.setItem('education',JSON.stringify({...values}))
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
                <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
              <Grid container spacing={2}>   
                <Grid item xs={12} sm={6}>
                <TextField
                    error={errors.schoolName && touched.schoolName}
                    autoComplete="schoolName"
                    name="schoolName"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.schoolName}
                    onChange={handleChange}
                    id="schoolName"
                    label="schoolName"
                    autoFocus
                    helperText={
                      errors.schoolName && touched.schoolName
                        ? errors.schoolName
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.schoolBoard && touched.schoolBoard}
                    autoComplete="schoolBoard"
                    name="schoolBoard"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.schoolBoard}
                    onChange={handleChange}
                    id="schoolBoard"
                    label="schoolBoard"
                    autoFocus
                    helperText={
                      errors.schoolBoard && touched.schoolBoard
                        ? errors.schoolBoard
                        : null
                    }
                  />
        </Grid>
             <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
          <TextField
                    error={errors.completedYear && touched.completedYear}
                    autoComplete="completedYear"
                    name="completedYear"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.completedYear}
                    onChange={handleChange}
                    id="completedYear"
                    label="completedYear"
                    autoFocus
                    helperText={
                      errors.completedYear && touched.completedYear
                        ? errors.completedYear
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.percentage && touched.percentage}
                    autoComplete="percentage"
                    name="percentage"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.percentage}
                    onChange={handleChange}
                    id="percentage"
                    label="percentage(%)"
                    autoFocus
                    helperText={
                      errors.percentage && touched.percentage
                        ? errors.percentage
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.place && touched.place}
                    autoComplete="place"
                    name="place"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.place}
                    onChange={handleChange}
                    id="place"
                    label="place"
                    autoFocus
                    helperText={
                      errors.place && touched.place
                        ? errors.place
                        : null
                    }
                  />
        </Grid>
      </Grid>
              
                </Grid>
                </CardContent>
                </Card>
                <Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>
                HIGHER SECONDARY EDUCATION DEATILS (12th)</Typography>
                  <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
                <Grid container spacing={2}>   
                <Grid item xs={12} sm={6}>
                <TextField
                    error={errors.collageName && touched.collageName}
                    autoComplete="collageName"
                    name="collageName"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.collageName}
                    onChange={handleChange}
                    id="collageName"
                    label="collageName"
                    autoFocus
                    helperText={
                      errors.collageName && touched.collageName
                        ? errors.collageName
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.collageBoard && touched.collageBoard}
                    autoComplete="collageBoard"
                    name="collageBoard"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.collageBoard}
                    onChange={handleChange}
                    id="collageBoard"
                    label="collageBoard"
                    autoFocus
                    helperText={
                      errors.collageBoard && touched.collageBoard
                        ? errors.collageBoard
                        : null
                    }
                  />
        </Grid>
             <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
          <TextField
                    error={errors.completedYear1 && touched.completedYear1}
                    autoComplete="completedYear1"
                    name="completedYear1"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.completedYear1}
                    onChange={handleChange}
                    id="completedYear1"
                    label="completedYear"
                    autoFocus
                    helperText={
                      errors.completedYear1 && touched.completedYear1
                        ? errors.completedYear1
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.percentage1 && touched.percentage1}
                    autoComplete="percentage1"
                    name="percentage1"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.percentage1}
                    onChange={handleChange}
                    id="percentage1"
                    label="percentage(%)"
                    autoFocus
                    helperText={
                      errors.percentage1 && touched.percentage1
                        ? errors.percentage1
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.place1 && touched.place1}
                    autoComplete="place1"
                    name="place1"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.place1}
                    onChange={handleChange}
                    id="place1"
                    label="place"
                    autoFocus
                    helperText={
                      errors.place1 && touched.place1
                        ? errors.place1
                        : null
                    }
                  />
        </Grid>
      </Grid>
      </Grid>
                </CardContent>
                </Card>
                {/* ------- */}
                <Typography align='left' style={{margin:'20px',fontSize:'20px',color:'black'}}>
                GRADUCATION DEATILS</Typography>
                  <Card className={classes.root} style={{margin:'20px'}}>
                <CardContent>
                <Grid container spacing={2}>   
                <Grid item xs={12} sm={6}>
                <TextField
                    error={errors.collageName1 && touched.collageName1}
                    autoComplete="collageName1"
                    name="collageName1"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.collageName1}
                    onChange={handleChange}
                    id="collageName1"
                    label="collageName"
                    autoFocus
                    helperText={
                      errors.collageName1 && touched.collageName1
                        ? errors.collageName1
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
                    error={errors.collageBoard1 && touched.collageBoard1}
                    autoComplete="collageBoard1"
                    name="collageBoard1"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.collageBoard1}
                    onChange={handleChange}
                    id="collageBoard1"
                    label="collageBoard"
                    autoFocus
                    helperText={
                      errors.collageBoard1 && touched.collageBoard1
                        ? errors.collageBoard1
                        : null
                    }
                  />
        </Grid>
             <Grid container spacing={3} style={{marginTop:'20px'}}>
        <Grid item xs={12} sm={4}>
          <TextField
                    error={errors.completedYear2 && touched.completedYear2}
                    autoComplete="completedYear2"
                    name="completedYear2"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.completedYear2}
                    onChange={handleChange}
                    id="completedYear2"
                    label="completedYear"
                    autoFocus
                    helperText={
                      errors.completedYear2 && touched.completedYear2
                        ? errors.completedYear2
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.percentage2 && touched.percentage2}
                    autoComplete="percentage2"
                    name="percentage2"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.percentage2}
                    onChange={handleChange}
                    id="percentage2"
                    label="percentage(%)"
                    autoFocus
                    helperText={
                      errors.percentage2 && touched.percentage2
                        ? errors.percentage2
                        : null
                    }
                  />
        </Grid>
        <Grid item xs={12} sm={4}>
        <TextField
                    error={errors.place2 && touched.place2}
                    autoComplete="place2"
                    name="place2"
                    variant="outlined"
                    fullWidth
                    defaultValue={education.place2}
                    onChange={handleChange}
                    id="place2"
                    label="place"
                    autoFocus
                    helperText={
                      errors.place2 && touched.place2
                        ? errors.place2
                        : null
                    }
                  />
        </Grid>
      </Grid>
      </Grid>
                              </CardContent>
                </Card>
                
    
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