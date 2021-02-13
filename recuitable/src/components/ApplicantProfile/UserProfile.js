import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Button from "@material-ui/core/Button";
import LinearProgress from '@material-ui/core/LinearProgress';
import Accordian from './accordian';
import Footer from  "../Footer/Footer";
import ApplicantService from "../../Service/ApplicationService";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
    progr()
    }, 500);

    const progr=()=>{
        setProgress((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = 2;
            return Math.min(oldProgress + diff, 100);
          });
    }

    return () => {
        clearInterval(timer);
      };
    }, []);

    const[profile,setProfile]=useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    useEffect(()=>{
      if (!timeLeft) return;

      if(timeLeft===0){
         console.log("TIME LEFT IS 0");
         setTimeLeft(null)
      }
      const intervalId = setInterval(() => {

        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      })
      let storge=localStorage.getItem('emailvalue');
      ApplicantService.FindByEmail(storge).then(ser=>{
        setProfile(ser.data.applicantmodel);
            })
           
  return (
    <>
    <div className={classes.root} >
      <Grid container spacing={3}>
        <Grid item xs={12} style={{margin:'20px',backgroundColor:"DodgerBlue"}}>
          <Grid container spacing={3}>
        <Grid item xs={2}>
        <Avatar className={classes.purple} style={{marginTop:'25px',width:'100px',height:'80px'}}>
         <div >{profile.lastName}</div>
            </Avatar><Button><PhotoCameraOutlinedIcon/></Button> 
        </Grid>
        <Grid item xs={6}>
        <div style={{color:'white'}}>
        <Typography variant="h6" gutterBottom>
        {profile.firstName}&nbsp;&nbsp;{profile.lastName}&nbsp;&nbsp;<BorderColorOutlinedIcon/>
        </Typography>
        </div>
        <div style={{color:'white'}}>
        <Typography variant="h6" gutterBottom>
        Full Stack Developer at Odigo Tech Solutions
        </Typography>
            </div>
            <div>
            <div style={{float:'right',color:'white'}} >
                <div >
                <Typography variant="body2" gutterBottom>
               <LocationOnOutlinedIcon/>&nbsp;&nbsp; HASSAN,BENGALURU
                </Typography>

                </div>
                <div >
                <Typography variant="body2" gutterBottom>
                <PhoneInTalkOutlinedIcon/>&nbsp;&nbsp;{profile.phoneNo}
                </Typography>
                   
                </div>
            </div>
            <div style={{float:'left',color:'white'}}>
                <div>
                <Typography variant="body2" gutterBottom>
              <BusinessCenterOutlinedIcon/>&nbsp;&nbsp;  FRESHER
                </Typography>

                </div>
                <div>
                <Typography variant="body2" gutterBottom>
            <EmailOutlinedIcon/>&nbsp;&nbsp; {profile.email}
                </Typography>
                </div> 
                </div> 
      </div>
      <div className={classes.root} style={{width:'500px'}}>
      <LinearProgress variant="determinate" value={progress} />{progress}%
    </div>              
           
        </Grid>
        
        <Grid item xs>
        <Grid item xs style={{backgroundColor:'#4c30e8',height:'150px',color:'white'}}>
        <div>
        <Typography variant="h5" gutterBottom>
        Pending Actions(S).
        </Typography>
        </div>
        <div style={{margin:'20px'}}>
        <Typography variant="body2" gutterBottom>
        Please complete your pending actions to make 
</Typography>
your profile attractive to recruiters.
        </div>
        <Button><ArrowForwardOutlinedIcon/></Button>
        </Grid>
        </Grid>
      </Grid>
        </Grid>
        
      </Grid>
    </div>
    <div style={{margin:'20px'}}>
    <Accordian/>
    </div>
    <Footer/>
    </>
  );
}
