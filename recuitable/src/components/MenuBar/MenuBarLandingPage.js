import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from "react-router-dom";
import UserProfile from "../ApplicantProfile/UserProfile";
import ApplicantService from "../../Service/ApplicationService";
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

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let history = useHistory();

    const handleProfile = () => {
    history.push("/profile");
  };

  const handleLogOut=()=>{
    history.push('/');
  }
useEffect(()=>{
service();
})
const[profile,setProfile]=useState([]);
const service=()=>{
  if(localStorage.getItem('emailid')&&localStorage.getItem('applicationemail')){
    ApplicantService.FindByEmail(localStorage.getItem('applicationemail')).then(res=>{
setProfile(res);
    })
  }else{
    ApplicantService.FindByEmail(localStorage.getItem('applicationemail')).then(ser=>{
      setProfile(ser);
          })
  }

}
  return (
    <>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} align='left'>
            ODIGO TECH
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>PROFILE</MenuItem>
                <MenuItem onClick={handleLogOut}>LOG OUT</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
    </>
  );
}
