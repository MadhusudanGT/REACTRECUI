
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TodayIcon from '@material-ui/icons/Today';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import HandleApplication from "./HandleApplications";
import HandleDashboard from "./HandleDashboard";
import HandleNotification from "./HandleNotification";
import HandleRejected from "./HandleRejected";
import HandleSchedule from "./HandleSchedule";
import HandleSelected from "./HandleSelected";
import HandleTodaySch from "./HandleTodaySch";

const drawerWidth = 240;

function getStepContent(step) {
    switch (step) {
      case 0:
        return <HandleApplication/>;
      case 1:
        return <HandleDashboard/>;
      case 2:
        return  <HandleNotification/>;
        case 3:
          return <HandleRejected/>;
          case 4:
              return <HandleSelected/>;
              case 5:
                  return <HandleSchedule/>;
                  case 6:
                         return <HandleTodaySch/>;
      default:
        return 'Unknown step';
    }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [activeStep, setActiveStep] = React.useState(1);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            TECHNICAL TEAM PAGE
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['DashBoard', 'Applications'].map((text, index) => (
            <ListItem button key={text} >
              <ListItemIcon>{index % 2 === 0 ? <HomeIcon color='primary' onClick={()=>setActiveStep(1)}/> : <FileCopyIcon color='primary' onClick={()=>setActiveStep(0)}/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
                 {[ 'Selected Resume', 'Rejected Resume'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <CheckIcon color='primary' onClick={()=>setActiveStep(4)}/> : <CancelIcon color='primary' onClick={()=>setActiveStep(3)}/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Schedulied Mettings', 'Todays Schedules'].map((text, index) => (
            <ListItem button key={text} >
              <ListItemIcon>{index % 2 === 0 ? <ScheduleIcon color='primary' onClick={()=>setActiveStep(5)}/> : <TodayIcon color='primary' onClick={()=>setActiveStep(6)}/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
            {['Notifications'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <NotificationsActiveIcon color='primary' onClick={()=>setActiveStep(2)}/> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
{/*        
      <HandleApplication/>
      <HandleDashboard/>
      <HandleNotification/>
      <HandleRejected/>
      <HandleSelected/>
      <HandleSchedule/>
      <HandleTodaySch/>
       */}
               <Typography>{getStepContent(activeStep)}</Typography>
      </main>
    </div>
  );
}
