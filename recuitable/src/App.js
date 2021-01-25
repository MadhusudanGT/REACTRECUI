import { Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch} from "react-router-dom";
import UserSettings from "./DashBoard/SettingsUserPage/UserSettings";
import UserDeatailsForm from "./components/UserLandingPage/UserDetailsForm";
import UserInterviewForm from "./components/UserLandingPage/UserInterviewForm";
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
