import {React,useEffect} from 'react';
import './Login.css';
import {Grid,Paper,Avatar,TextField,Button,Typography,Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Registration from "../../components/Registration/Registration";
import RegService from "../../Services/RegService";
import { useHistory } from "react-router-dom";
import Table2 from "../../components/Table/Table2";
import UserDeatilsForm from "../../components/UserLandingPage/UserDetailsForm";
import UserInterviewForm from "../../components/UserLandingPage/UserInterviewForm";
import ApplicantProfile from "../../components/ApplicantProfile/ApplicantProfile";
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
const Login=()=>{
let history = useHistory();
// const emailRegex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$s/;
const paperStyle={padding:20,width:280,margin:"55px auto"}
const avatarStyle={backgroundColor:"#AF0069"}
const btnStyle={margin:"15px 0px"}
const initialValues={
email:'',
password:'',
remember:false
}
const validationSchema=Yup.object().shape({
email:Yup.string().email('Please enter valid email').required('Required'),
password:Yup.string().required('Required')
})

const onSubmit=(values,props)=>{
console.log(values)
let regjson=JSON.stringify({
email: values.email,
password: values.password
})
// console.log("values",values.email);
// const log= RegService.fetchUsers(regjson);
// console.log("login",log);

// RegService.search(regjson)
// .then(response => {
// console.log("json dataa",response.data);
// });
//
// useEffect(() => {
// // fetch();
// validate();
// },[]);

async function fetch()
{
let response = await RegService.fetchUsers (regjson);
console.log("hellooo",response.email);
return response;
}

fetch().then(response => {
console.log("response",response);
console.log("how r u",response.email);
});

if(fetch()){
history.push("/ApplicantProfile");
}
if(values.email=='swagata@gmail.com' && values.password=='swagata@2020'){
history.push("/Registration");
}
if(values.email=='madhu@gmail.com' && values.password=='madhu@2020'){
history.push("/UserDetailsForm");
}
if(values.email=='lohitha@gmail.com' && values.password=='lohitha@2020'){
history.push("/UserInterviewForm");
}
console.log("login sucessfully done");
setTimeout(()=>{props.resetForm()
props.setSubmitting(false)},
2000)
console.log(props)
}

const handleSignUp=()=>{
history.push("/Registration");
}
return(
<Grid>
<Paper elevation={10} style={paperStyle}>
<Grid align="center">
<Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
<h2>Login Here</h2>
</Grid>
<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
{(props)=>(
<Form>
<Field as={TextField} label='Email' name="email" placeholder='Enter Username' helperText={<ErrorMessage name="username"/>} fullWidth required/>
<Field as={TextField} style={{marginTop:"10px"}} name="password" label='Password' helperText={<ErrorMessage name="password"/>} placeholder='Enter Password' type="password" fullWidth required/>
<Typography style={{marginTop:"10px"}}><Link href="#"> Forget password ?</Link></Typography>
<Button type="submit" color="primary" variant="contained"
disabled={props.isSubmitting} style={btnStyle} fullWidth>{props.isSubmitting?"Loading":"Login"}</Button>

</Form>

)
}
</Formik>

<Typography>Do you have an account?<Link onClick={handleSignUp}> Sign Up</Link></Typography>
</Paper>

</Grid>
)
}
export default Login;