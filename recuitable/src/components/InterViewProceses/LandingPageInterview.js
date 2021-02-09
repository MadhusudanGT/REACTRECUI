import React from "react";
import Menu from "../MenuBar/Menu";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SecondRound from "./SecondInterviewProcess";
import FinalRound from "./FinalRound";
import Questions from "./Questions";
import TimeCounter from "./TimeCount";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
  return ['step1', 'step2', 'step3'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Questions/>;
    case 1:
      return <SecondRound/>;
    case 2:
      return <FinalRound/>;
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
  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
    if(completedSteps() === totalSteps() - 1){
      let time=localStorage.getItem('minutes')+':'+localStorage.getItem('seconds');
      let score=localStorage.getItem('score');
      let details=localStorage.getItem('step2');
          const ansjson={
            "answerDetials":details,
            "applicationTest": localStorage.getItem('seconds'),
            "atm": {
              "applicationId": localStorage.getItem('seconds'),
              "appltest": {
                "code": localStorage.getItem('seconds'),
                "duration": localStorage.getItem('seconds'),
                "maxscore": localStorage.getItem('score')
              },
              "endTime": localStorage.getItem('seconds'),
              "startTime": localStorage.getItem('seconds'),
              "testid": localStorage.getItem('seconds')
            },
            "pass": true,
            "recruiterid": localStorage.getItem('seconds'),
            "totalGrades": localStorage.getItem('seconds')
          }
          console.log(ansjson)
          handleAnswer(ansjson)
          // UserTestService.addUser(ansjson).then((res)=>{
          //   console.log(res.data);
          // })
          console.log("success"+ansjson)
          localStorage.clear();
          handleClickSnackbar();
          history.push('/LandingPage');
        }

  };

  const URL = 'http://localhost:8080/Answers/saveanswers';
  const handleAnswer=(data)=>{
    return axios.post(URL,data);
  }

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
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
      <Menu/>
      <div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}
       open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
      USER LOGIN SUCCESSFULLY
        </Alert>
      </Snackbar>
    </div>
<TimeCounter/>
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = <Typography variant="caption"></Typography>;
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
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
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


