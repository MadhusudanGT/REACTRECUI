import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProfileProgress from "../ApplicantProfile/ProfileProgress";
import { Grid, Paper, Avatar, Typography, Link } from "@material-ui/core";
import ApplicationService from "../../Service/ApplicationService";
import RegService from "../../Service/RegService";
import MenuBar from "../MenuBar/Menu";
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Button from "@material-ui/core/Button";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
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
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
const paperStyle = {
  borderRadius: "28px",
  padding: 25,
  height: 60,
  margin: "10px auto",
  backgroundColor: "#f6f6f6",
};
const paper1Style = {
  borderRadius: "20px",
  padding: 35,
  color: "green",
  width: "140px",
  height: "20px",
  marginTop: "-100px",
};
const style1 = {
  padding: 35,
  color: "green",
  width: "140px",
  height: "20px",
  marginTop: "-108px",
  marginRight: "40px",
};
const style2 = {
  padding: 30,
  color: "green",
  width: "140px",
  height: "20px",
  marginTop: "-55px",
  marginRight: "550px",
};
const style3 = {
  padding: 30,
  color: "green",
  height: "20px",
  marginTop: "-50px",
  marginLeft: "150px",
  marginRight: "50px",
};
const avatarStyle = { backgroundColor: "#AF0069" };
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

  const [file, setFile] = useState(null);

  const handleOnChange = e => {
    // console.log(e.target.files[0]);
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
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
  getDetails();
  },[]);

const [data ,setData]=useState([]);
const[reg,setReg]=useState([]);
  const getDetails=async()=>{
    await ApplicationService.FindByEmail(localStorage.getItem('emailvalue')).then(appdata=>{
     setData(appdata.data);
    })
    await RegService.findByEmail(localStorage.getItem('emailvalue')).then(regdata=>{
      setReg(regdata.data);
    })
  }
// console.log(data);
// console.log(reg);
  return (
    <div className={classes.root}>
      <MenuBar />
      <Grid>
        <Paper style={paperStyle} fullWidth>
          <Grid>
          <Avatar className={classes.purple}
          style={{width:'100px',height:'80px'}}
          >GT</Avatar>
          </Grid>
          <Grid align="center">
            {/* {/ <Grid align="center"> /} */}
            <Grid>
              <Typography style={style1}>MADHUSUDAN</Typography>
            </Grid>
            <Grid>
              <Grid
                align="left"
                style={{ marginLeft: "460px", marginTop: "-20px" }}
              >
                <Typography>1 YEAR</Typography>
                <Typography>BENGALURU</Typography>
              </Grid>
              <Grid
                align="right"
                style={{ marginRight: "500px", marginTop: "-45px" }}
              >
                <Typography>madhusudangt97@gmail.com</Typography>
                <Typography>9986223399</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid align="right">
            <Grid align="right">
              <Paper style={paper1Style}>
                <Typography align="center">NOTIFICATION OR STATUS</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <ProfileProgress />
      <Accordion
        style={{ backgroundColor: "#DEE1DD" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Attach Resume</Typography>
          <Typography className={classes.secondaryHeading}>
        UPLOAD YOUR RESUME HERE
                 </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
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
           
 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
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
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{ backgroundColor: "#DEE1DD" }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
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
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>IT Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{ backgroundColor: "#DEE1DD" }}
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className={classes.heading}>Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography className={classes.heading}>Certifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        style={{ backgroundColor: "#DEE1DD" }}
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography className={classes.heading}>Carreer Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
