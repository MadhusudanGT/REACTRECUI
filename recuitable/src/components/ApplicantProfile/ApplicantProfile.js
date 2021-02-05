import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfileProgress from '../ApplicantProfile/ProfileProgress';
import {Grid,Paper,Avatar,TextField,Button,Typography,Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuBar from "../MenuBar/Menu"
const useStyles = makeStyles((theme) => ({
root: {
width: '100%',
},
heading: {
fontSize: theme.typography.pxToRem(15),
flexBasis: '33.33%',
flexShrink: 0,
// backgroundColor: 'rgba(0.1, 0.6, 0.1, .04)'
},
secondaryHeading: {
fontSize: theme.typography.pxToRem(15),
color: theme.palette.text.secondary,
},
menuButton: {
marginRight: theme.spacing(2),
},
title: {
flexGrow: 1,
}
}));
const paperStyle={borderRadius:"28px",padding:25,height:60,margin:"10px auto",backgroundColor:"#f6f6f6"}
const paper1Style={borderRadius:"20px",padding:35,color:"green",width:"140px",height:"20px",marginTop:"-100px"}
const style1={padding:35,color:"green",width:"140px",height:"20px",marginTop:"-108px",marginRight:"40px"}
const style2={padding:30,color:"green",width:"140px",height:"20px",marginTop:"-55px",marginRight:"550px"}
const style3={padding:30,color:"green",height:"20px",marginTop:"-50px",marginLeft:"150px",marginRight:"50px"}
const avatarStyle={backgroundColor:"#AF0069"}
export default function ControlledAccordions(props) {
const classes = useStyles();
const [expanded, setExpanded] = React.useState(false);

const handleChange = (panel) => (event, isExpanded) => {
setExpanded(isExpanded ? panel : false);
};
const [auth, setAuth] = React.useState(true);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleChange1 = (event) => {
setAuth(event.target.checked);
};

const handleMenu = (event) => {
setAnchorEl(event.currentTarget);
};

const handleClose = () => {
setAnchorEl(null);
};
return (
<div className={classes.root}>
<MenuBar/>
<Grid>
<Paper style={paperStyle} fullWidth>
<Grid>
<Avatar align="left" alt="Profile" style={{width:150,height:70}} src="/static/images/avatar/1.jpg" />
</Grid>
<Grid align="center">
{/* {/ <Grid align="center"> /} */}
<Grid>
<Typography style={style1}>User Name</Typography>
</Grid>
<Grid>
<Grid align="left" style={{marginLeft:"460px",marginTop:"-20px"}}>
<Typography>Experience</Typography>
<Typography >Location</Typography>
</Grid>
<Grid align="right" style={{marginRight:"500px",marginTop:"-45px"}}>
<Typography>Email Id</Typography>
<Typography>Phone NO</Typography>
</Grid>
</Grid>

</Grid>
<Grid align="right">
<Grid align="right">
<Paper style={paper1Style}>
<Typography align="center">paper1</Typography>
</Paper>
</Grid>
</Grid>
{/* <Grid align="right">
<Typography><PhoneIcon/>98674535</Typography>
</Grid> */}
</Paper>
</Grid>
<ProfileProgress/>
<Accordion style={{backgroundColor:"#DEE1DD"}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
<AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="panel1bh-content"
id="panel1bh-header"
>
<Typography className={classes.heading}>Attach Resume</Typography>
<Typography className={classes.secondaryHeading}>I am an accordion</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>
Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
maximus est, id dignissim quam.
</Typography>
</AccordionDetails>
</Accordion>
<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
<AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="panel2bh-content"
id="panel2bh-header"
>
<Typography className={classes.heading}>Key Skills</Typography>
<Typography className={classes.secondaryHeading}>
You are currently not an owner
</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>
Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
diam eros in elit. Pellentesque convallis laoreet laoreet.
</Typography>
</AccordionDetails>
</Accordion>
<Accordion style={{backgroundColor:"#DEE1DD"}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
<AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="panel3bh-content"
id="panel3bh-header"
>
<Typography className={classes.heading}>Education</Typography>
<Typography className={classes.secondaryHeading}>
Filtering has been entirely disabled for whole web server
</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>
Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
vitae egestas augue. Duis vel est augue.
</Typography>
</AccordionDetails>
</Accordion>
<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
<AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="panel4bh-content"
id="panel4bh-header"
>
<Typography className={classes.heading}>IT Skills</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>
Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
vitae egestas augue. Duis vel est augue.
</Typography>
</AccordionDetails>
</Accordion>
<Accordion style={{backgroundColor:"#DEE1DD"}} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
<AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="panel5bh-content"
id="panel5bh-header"
>
<Typography className={classes.heading}>Projects</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>
Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
vitae egestas augue. Duis vel est augue.
</Typography>
</AccordionDetails>
</Accordion>
<Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
<AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="panel6bh-content"
id="panel6bh-header"
>
<Typography className={classes.heading}>Certifications</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>
Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
vitae egestas augue. Duis vel est augue.
</Typography>
</AccordionDetails>
</Accordion>
<Accordion style={{backgroundColor:"#DEE1DD"}} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
<AccordionSummary
expandIcon={<ExpandMoreIcon />}
aria-controls="panel7bh-content"
id="panel7bh-header"
>
<Typography className={classes.heading}>Carreer Profile</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>
Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
vitae egestas augue. Duis vel est augue.
</Typography>
</AccordionDetails>
</Accordion>
</div>
);
}