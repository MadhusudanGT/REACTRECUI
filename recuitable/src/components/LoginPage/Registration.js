import React from 'react';
import {Grid,Paper,Avatar,TextField,Button,Typography,Link} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import RegService from "../../Service/RegService";
import {FormHelperText} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
const Registration=()=>{
const paperStyle={padding:"40px 30px",width:450,margin:"20px auto"}
const btnStyle={margin:"20px 5px"}
// const [value, setValue] = React.useState('female');

// const handleChange = (event) => {
// setValue(event.target.value);
// };

const initialValues={
firstName:'',
lastName:'',
email:'',
phoneNumber:'',
currentLocation:'',
password:'',
termsAndCondition:false
}
const validationSchema=Yup.object().shape({
firstName:Yup.string().min(3,'Its too short').required('Required'),
lastName:Yup.string().min(3,'Its too short').required('Required'),
email:Yup.string().email('Please enter valid email').required('Required'),
phoneNumber:Yup.number().min(10,'Phone number length should be 10 digits').typeError('Enter valid phone number').required('Required'),
currentLocation:Yup.string().min(3,'Its too short').required('Required'),
password:Yup.string().min(8,'Pssword minimum length should be 8').required('Required'),
termsAndCondition:Yup.string().oneOf(['true'],'Please Accept terms and condition')
})
const onSubmit=(values,props)=>{
console.log(values)
const regjson={
address: values.currentLocation,
email: values.email,
firstName: values.firstName,
lastName: values.lastName,
password: values.password,
phoneNo: values.phoneNumber
}
RegService.addUser(regjson);
alert('Logged In successfully');
console.log("sucessfully done");
setTimeout(()=>{props.resetForm()
props.setSubmitting(false)},
2000)
console.log(props)
}

let history = useHistory();
const handleSignIn = () => {
  history.push("/login");
};

return(
<Grid>
<Paper elevation={10} style={paperStyle}>
<Grid align="center">
<Avatar style={{backgroundColor:"#1bbd7e"}}>
<AddCircleOutlineIcon/>
</Avatar>
<h2 style={{margin:"0"}}>Sign Up</h2>
<Typography variant="caption" gutterBottom>Please fill this form to create an account</Typography>
</Grid>
<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
{(props)=>(
<Form>
<Field as={TextField} label='FirstName' name='firstName' placeholder='Enter your Firstname' helperText={<ErrorMessage name="firstName"/>} fullWidth required/>
<Field as={TextField} label='LastName' name='lastName' placeholder='Enter your Lastname' helperText={<ErrorMessage name="lastName"/>} fullWidth required/>

{/* <RadioGroup aria-label="gender" name="gender1" style={{display:"initial"}}>
<FormControlLabel value="female" control={<Radio />} label="Female" />
<FormControlLabel value="male" control={<Radio />} label="Male" />
<FormControlLabel value="other" control={<Radio />} label="Other" />
</RadioGroup> */}

<Field as={TextField} name='email' label='Email' placeholder='Enter your email' helperText={<ErrorMessage name="email"/>} fullWidth required/>
<Field as={TextField} name='phoneNumber' label='Phone Number' placeholder='Enter your phone number' helperText={<ErrorMessage name="phoneNumber"/>} fullWidth required/>
<Field as={TextField} name='currentLocation' label='Address' placeholder='Enter your current location' helperText={<ErrorMessage name="currentLocation"/>} fullWidth required/>
<Field as={TextField} name='password' label='Password' type="password" placeholder='Enter your password' helperText={<ErrorMessage name="password"/>} fullWidth required/>
<FormControlLabel
control={<Field as={Checkbox} name="termsAndCondition" />}
label="I accept the terms and conditions" helperText={<ErrorMessage name="termsAndCondition"/>}
/>
<FormHelperText><ErrorMessage name="termsAndCondition"/></FormHelperText>
<Button type="submit" color="primary" variant="contained" disabled={props.isSubmitting} style={btnStyle}>{props.isSubmitting?"Loading":"Sign Up"}</Button>
<Typography>Already have an account?<Link onClick={handleSignIn}>Sign In</Link></Typography>
</Form>
)
}
</Formik>
</Paper>
</Grid>
)
}
export default Registration;