import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({jobdetails}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography variant="body2" gutterBottom align='left' style={{margin:'10px'}}>{jobdetails.country} | {jobdetails.city}</Typography>
      <Typography variant="h5" gutterBottom align='left' style={{margin:'10px',color:'tan'}}>{jobdetails.position}</Typography> 
      <Typography variant='subtitle1' gutterBottom align='left' style={{marginTop:'20px'}}>{jobdetails.jobcategory}</Typography>
      <Typography variant="caption" display="block" gutterBottom align='left' style={{marginTop:'30px'}}>{jobdetails.level}</Typography>
     
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color='primary'>
          <ArrowForwardIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
