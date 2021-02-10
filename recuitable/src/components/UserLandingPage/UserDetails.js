import React, { useEffect, useState } from "react";
import Menu from "../MenuBar/Menu";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserDeatilsForm from "./UserDeatilsForm";
import DocumentForm from "./DocumentForm";
import EducationSkillsForm from "./EducationSkillsForm";
import ApplicationService from "../../Service/ApplicationService";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['User Deatils', 'Education Deatils and Skills', 'Document Deatils'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <UserDeatilsForm/>;
    case 1:
      return <EducationSkillsForm/>;
    case 2:
      return <DocumentForm/>;
    default:
      return 'Unknown step';
  }
}

export default function HorizontalNonLinearAlternativeLabelStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
   
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  let history = useHistory();
  const[education,setEducation]=useState([]);
  const[userdeatils,setuserdeatils]=useState([]);
  const[userdocument,setDocument]=useState([]);

 
const calllocalstorge=()=>{
  setEducation(JSON.parse(localStorage.getItem('education')));
    setuserdeatils(JSON.parse(localStorage.getItem('userdetails')));
    setDocument(JSON.parse(localStorage.getItem('document')));
}
   

  const handleComplete = (async) => {
    // setEducation(JSON.parse(localStorage.getItem('education')));
    // setuserdeatils(JSON.parse(localStorage.getItem('userdetails')));
    // setDocument(JSON.parse(localStorage.getItem('document')));
calllocalstorge();
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
      calllocalstorge();
    }
    if(completedSteps() === totalSteps() - 1){
      calllocalstorge();
      console.log(education+"..........."+userdeatils+".........."+userdocument)
      if(education==null||userdeatils==null||userdocument==null){
        calllocalstorge();
        setEducation(JSON.parse(localStorage.getItem('education')));
    setuserdeatils(JSON.parse(localStorage.getItem('userdetails')));
    setDocument(JSON.parse(localStorage.getItem('document')));
      }
      else{
        const  appljson={
          applicantId:1 ,
          applicantmodel: {
            email:userdeatils.email,
            firstName:userdeatils.firstName,
            lastName:userdeatils.lastName,
            phoneNo:userdeatils.phoneNumber,
            summary:userdeatils.summary
          },
          applicationdocumodel: [
            {
              applicationId: 1,
              documentmodel: {
                document:userdocument.Document,
                lastUpdate:userdocument.LastUpdate,
                name:userdocument.ProjectName,
                url:userdocument.WebSiteLink 
              },
              documnetId: 0,
            
            }
          ],
          appliedDate:userdocument.LastUpdate,
          education:education.schoolName,
          experience:userdocument.experience,
          id: 1,
          otherInfo:education.schoolName,
          jobId: 1,
          status: "Waiting"
        }
 
    ApplicationService.addUser(appljson);
    console.log("success"+appljson) 
        localStorage.clear();
        handleReset();
      }
         }
 
   };

   
  const handleReset = () => {
    history.push("/LandingPage");
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
      <>
      <Menu/>
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = <Typography variant="caption">*</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div style={{backgroundColor:"LightGray"}}>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              YOUR DETAILS ARE COLLECTED THANKS FOR YOUR INFORMATION
            </Typography>
            <Button onClick={handleReset}>GO TO YOUR PROFILE</Button>
          </div>
        ) : (
          <div style={{marginTop:"20px"}}>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {isStepOptional(activeStep) && !completed.has(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
