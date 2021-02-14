import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function DetailedAccordion() {
  const classes = useStyles();

  const [file, setFile] = useState(null);

  const handleOnChange = e => {
    setFile(e.target.files[0]);
  };
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
   console.log('DOCUMENT FORM')
    });
    setsnackcolor("success");
              setResponse("RESUME SAVED SUCCESFULLY");
  };

const handleClose=()=>{
    console.log("close")
}
const handleSave=()=>{
    console.log("save");
}

const chip=[
    {skill:'JAVA'},
{skill:'ANGULAR'},
{skill:'REACT'}
]

const handleDelete = (e) => {
    console.info('You clicked the delete icon.'+e.skill);
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
  return (
      <>
      <div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}
       open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackcolor}>
     {response}
        </Alert>
      </Snackbar>
    </div>
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>RESUME</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>UPLOAD YOUR UPDATED RESUME</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Typography>
          <div style={{marginTop:"20px"}}>
<form onSubmit={handleSubmit}>
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
           
 
          </Typography>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
           CREATE YOUR RESUME HERE
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                CLICK HERE
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small" onClick={handleClose}>Cancel</Button>
          <Button size="small" color="primary" onClick={handleSave}>
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
 {/* ------------ */}
 <Accordion defaultExpanded style={{marginTop:'20px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Resume Headline</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
          A highly motivated and results-oriented individual seeking a position and self-learning, looking for a full-stack developer position
          </div>
        
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    {/* ----------- */}
    <Accordion defaultExpanded style={{marginTop:'20px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>SKILLS</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Key Skills ABOUT TECHNOLGYIES</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
              {chip.map((data)=>(
                  <Chip label={data.skill} onDelete={handleDelete} color="primary" variant="outlined" />
              ))}
            
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Learn more
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
    {/* -------- */}
    <Accordion defaultExpanded style={{marginTop:'20px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>PROJECT</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>PROJECT INFORMATION</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <p>PROJECT NAME </p>
            <p>project description</p>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
       {/* -------- */}
    <Accordion defaultExpanded style={{marginTop:'20px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Profile Summary</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>PROJECT INFORMATION</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <p>Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind 
                of a career you are looking for. Write a meaningful summary of more than 50 characters.</p>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
        {/* -------- */}
    <Accordion defaultExpanded style={{marginTop:'20px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Personal Details</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
          <div style={{float:'left'}}>
                  <p>NAME</p>
                  <p>DATA OF BIRTH</p>
                  <p>GENDER</p>
                  <p>ADDRESS</p>
                  <p>STATE</p>
                  <p>COUNTRY</p>
                  
                  </div>
              <div style={{float:'right'}}>
                  <p>MADHU</p>
                  <p>04-08-1997</p>
                  <p>MALE</p>
                  <p>HASSAN CITY ,573201</p>
                  <p>KARNATAKA</p>
                  <p>INDIA</p>
              </div>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </AccordionActions>
      </Accordion>
  </>
  );
}
