import { Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch} from "react-router-dom";
import UserSettings from "./DashBoard/SettingsUserPage/UserSettings";
import UserDeatailsForm from "./components/UserLandingPage/UserDetailsForm";
import UserInterviewForm from "./components/UserLandingPage/UserInterviewForm";
import RegistrationForm from "./components/FormikValidationForm/RegistrationForm";
import UpdateProfileForm from "./components/FormikValidationForm/UpdateProfileForm";
import InterviewProcess from "./components/InterViewProceses/LandingPageInterview";
import Login from "./components/LoginPage/Login";
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
              <Route path="/create" component={RegistrationForm}/>
              <Route path="/update" component={UpdateProfileForm}/>
              <Route path="/interview" component={InterviewProcess}/>
              <Route path="/login" exact component={Login}/>
              </React.Fragment>
          </Switch>
        </div>
      </Router>
    </div>
      
  );
}

export default App;
