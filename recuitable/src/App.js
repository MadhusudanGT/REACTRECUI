import { Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch} from "react-router-dom";
import UserSettings from "./DashBoard/SettingsUserPage/UserSettings";
import UserDeatailsForm from "./components/UserLandingPage/UserDetailsForm";
import UserInterviewForm from "./components/UserLandingPage/UserInterviewForm";
import InterviewProcess from "./components/InterViewProceses/LandingPageInterview";
import Login from "./components/LoginPage/Login";
import ForgetPassword from "./components/LoginPage/ForgetPassword";
import LandingPage from "./components/ApplicantLandingPage/LandingPage";
import Registration from "./components/LoginPage/Registration";
import JobDetailsPage from "./components/JobModel/JobDetailsPage";
import LandingPageAuth from "./components/ApplicantLandingPage/LandingPageForUnauth";
import ApplicantProfile from "./components/ApplicantProfile/ApplicantProfile";

function App() {
  return (
    <div className="App">
<Router>
        <div className="App">
          <Switch>
            <React.Fragment>
              <Route path="/" exact component={UserSettings} />
              <Route path="/DetailsForm" component={UserDeatailsForm}/>
              <Route path="/InterviewProcess" component={UserInterviewForm}/>
              <Route path="/interview" component={InterviewProcess}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/ForgetPassword" exact component={ForgetPassword}/>
              <Route path="/LandingPage" exact component={LandingPage}/>
              <Route path="/registration" exact component={Registration}/>
              <Route path="/LandingPageAuth" exact component={LandingPageAuth}/>
              <Route path="/JobDetailsPage" exact component={JobDetailsPage}/>
              <Route path="/ApplicantProfile" exact component={ApplicantProfile}/>
              </React.Fragment>
          </Switch>
        </div>
      </Router>
    </div>
      
  );
}

export default App;
