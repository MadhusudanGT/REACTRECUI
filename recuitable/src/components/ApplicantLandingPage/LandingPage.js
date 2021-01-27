import React from "react";
import './LandingPage.css';
import DesktopViewImg from "../Images/Careers-Banner.png";
import MobileViewImg from "../Images/carrer2.jpg";
import adduser from "../Images/adduser.png";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import LandingPageCard from "./LandingPageCard"
import Footer from "../../components/Footer/Footer";
import LandingPageMenu from "../../components/MenuBar/MenuBarLandingPage";
const category = [
    {
      value: 'IT',
    },
    {
      value: 'MANAGEMENT',
    },
  ];

  const data = [
    {
      city: 'BENGALURU',
      country:'INDIA',
      position:'FRONT END DEVELOPER',
      jobcategory:"TECHNICAL SPECIALIST",
      level:'Entry Level'
    },
    {
        city: 'Shivamogga',
        country:'INDIA',
        position:'DATA-BASE SPECIALIST',
        jobcategory:"TECHNICAL SPECIALIST",
        level:'Entry Level'
      },
      {
        city: 'Tumakuru',
        country:'INDIA',
        position:'APPLICATION DEVELOPER',
        jobcategory:"TECHNICAL SPECIALIST",
        level:'Entry Level'
      },
      {
        city: 'HASSAN',
        country:'INDIA',
        position:'BACK-END DEVELOPER',
        jobcategory:"TECHNICAL SPECIALIST",
        level:'Entry Level'
      },
  ];

const useStyles = makeStyles((theme) => ({
    root1:{
        flexGrow: 1,
    },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const LandingPage=()=>{
    const classes = useStyles();
    const imageUrl = window.innerWidth >= 650 ? DesktopViewImg : MobileViewImg;
    const [Category, setCategory] = React.useState('');
      const handleChange = (event) => {
        setCategory(event.target.value);
      };
    return (
        <>
        <LandingPageMenu/>
        <div style={{backgroundColor:'lightgray'}}>
        <div className="LandingPageImg" style={{backgroundImage: `url(${imageUrl})` }}>
            <div className="LandingPageImg-content">
                {/* <a style={{fontSize:'40px',color:'#867979'}}>ENTRY LEVEL</a>
                <a style={{fontSize:'40px',color:'#867979'}}>JOB OPPORTUNITIES</a> */}
                <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Search" variant="outlined"/>
                <Button variant="contained" color="primary" style={{width:'140px',height:'55px'}}>
  Sarech
</Button>
</form>
</div>        
        </div>
        <div className='rows' style={{marginTop:"20px",backgroundColor:'black',color:'white'}}>
     <div className='row' >
         <h1>Join our  </h1><h1>Organization!!</h1></div>
     <div className='row' style={{marginLeft:"20px"}}>
    <h2>Tell us more about yourself and we'll keep you up-to-date regarding upcoming</h2>
    <h4>events and career opportunities that match your interests.</h4>
    <Button variant="contained" color="primary" style={{width:'180px'}}>JOIN NOW</Button>
     </div>
     <div className='row' style={{margin:"20px"}}>
     <img src={adduser} alt="Girl in a jacket" style={{height:'100px'}}/>
     </div>
 
       </div>
       <Typography variant="h4" style={{textAlign:'start',margin:'20px'}}>
       Job opportunities
      </Typography>
      <div style={{margin:'20px'}}>
      <TextField id="outlined-basic" label="Search" variant="outlined"/>
      <Button variant="contained" color="primary" style={{width:'180px',height:'55px',marginLeft:'20px'}}>
          Search</Button>
 
      </div>
      <div style={{margin:'20px'}}>
      <TextField
          id="standard-select-currency"
          select
          label="Job Category"
          value={Category}
          onChange={handleChange}
          helperText="Please select Job Category"
          style={{marginLeft:'20px'}}
        >
          {category.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>


        <TextField
          id="standard-select-currency"
          select
          label="position name"
          value={Category}
          onChange={handleChange}
          helperText="Please select Job Category"
          style={{marginLeft:'20px'}}
        >
          {category.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
     

        <TextField
          id="standard-select-currency"
          select
          label="Experience level"
          value={Category}
          onChange={handleChange}
          helperText="Please select Experience level"
           style={{marginLeft:'20px'}}
        >
          {category.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>


<div className={classes.root1}>
      <Grid container spacing={3}>

    {data.map((elem)=>(
        <Grid item xs>
<LandingPageCard  jobdetails={elem}/>
</Grid>
    ))}     
        
      </Grid>
      </div>
      <Footer/>
      </div>
        </>

    );

}

export default LandingPage;