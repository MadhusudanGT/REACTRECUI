import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
const HandleHrDashBoard=()=>{
    let history = useHistory();

    const handleRecuiter = () => {
        history.push("/TechnicalPage");
      };

      const handleUserManagement = () => {
        history.push("/UserManagement");
      };

      const handleJobCreation = () => {
        history.push("/JobDetailsPage");
      };
    return(
        <>
          <Button type="submit" variant="contained" color='primary'style={{margin:'20px'}}
            onClick={handleRecuiter}>
                CREATE RECUITER
              </Button>

              <Button type="submit" variant="contained" color='primary' style={{margin:'20px'}}
            onClick={handleUserManagement}>
                User Management
              </Button>

              <Button type="submit" variant="contained" color='primary' style={{margin:'20px'}}
            onClick={handleJobCreation}>
               JOB CREATION
              </Button>
        </>
    )
}

export default HandleHrDashBoard;