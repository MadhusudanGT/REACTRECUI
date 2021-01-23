import React from 'react';
import './Login.css';
import {Grid,Paper,Avatar,TextField,Button,Typography,Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
const Login=()=>{
const paperStyle={padding:20,height:'53vh',width:280,margin:"55px auto"}
const avatarStyle={backgroundColor:"#AF0069"}
const btnStyle={margin:"15px 0px"}
const initialValues={
username:'',
password:'',
remember:false
}
const validationSchema=Yup.object().shape({
username:Yup.string().email('Please enter valid email').required('Required'),
password:Yup.string().required('Required')
})
const onSubmit=(values,props)=>{
console.log(values)
setTimeout(()=>{props.resetForm()
props.setSubmitting(false)},
2000)
console.log(props)
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
<Field as={TextField} label='Username' name="username" placeholder='Enter Username' helperText={<ErrorMessage name="username"/>} fullWidth required/>
<Field as={TextField} style={{marginTop:"10px"}} name="password" label='Password' helperText={<ErrorMessage name="password"/>} placeholder='Enter Password' type="password" fullWidth required/>
<Typography style={{marginTop:"10px"}}><Link href="#"> Forget password ?</Link></Typography>
{/* <FormControlLabel
control={
<Checkbox
name="checkedB"
color="primary"
style={{marginLeft:"90px"}}/>
}
label="Remember me"
/> */}
<Button type="submit" color="primary" variant="contained"
disabled={props.isSubmitting} style={btnStyle} fullWidth>{props.isSubmitting?"Loading":"Login"}</Button>

</Form>

)
}
</Formik>

<Typography>Do you have an account?<Link to={"/Registration"}> Sign Up</Link></Typography>
</Paper>

</Grid>
)
}
export default Login;