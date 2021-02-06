import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Menu() {
  const classes = useStyles();
  let history = useHistory();
  
const handleLogOut=()=>{
  history.push('/');
}
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AccountCircleIcon/>
          </IconButton>
          <Typography variant="h6">
           ODIGO TECH
          </Typography>
          <Typography variant="h6" className={classes.title}>
            WELCOME TO USER 
          </Typography>
          <Button color="inherit" onClick={handleLogOut}><LockIcon style={{color:'red'}}/>  LogOut</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
