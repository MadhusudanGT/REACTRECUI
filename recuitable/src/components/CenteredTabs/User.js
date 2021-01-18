import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ActiveUser from "./ActiveUsers";
import InActiveUser from "./inActiveUser";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MenuBar from "../MenuBar/Menu";
import UserSettings from "../../DashBoard/SettingsUserPage/UserSettings";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function User() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // function handleClick() {
  //   history.push("/User");
  //   console.info('You clicked a breadcrumb.');
  // }

  // function handleClick1(event){
  //   history.push('/Menu')
  // }

  return (
    <div className={classes.root} style={{backgroundColor:'LightGray'}}>
      <AppBar position="static" color="default">
      <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/Menu">
        Menu
      </Link>
      <Link color="inherit" href="/">
        Users
      </Link>
    </Breadcrumbs>
        <Tabs
          value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        >
          <Tab label="MANAGE ACTIVE USER" {...a11yProps(0)} />
          <Tab label="INACTIVE USER" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ActiveUser/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InActiveUser/>
      </TabPanel>
      <Router>
    <Switch>
        <Route exact path="/Menu" component={MenuBar} />
    </Switch>
</Router>
    </div>
   
  );
}
