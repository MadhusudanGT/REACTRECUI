
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PaymentTwoToneIcon from '@material-ui/icons/PaymentTwoTone';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
import StoreTwoToneIcon from '@material-ui/icons/StoreTwoTone';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop:'20px'
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ backgroundColor: "#cb997e" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}style={{textAlign:'center'}}>
          {/* <StoreTwoToneIcon/>  */}
          Information for...<th/>
          <br/>
        <span>Developers</span><tr/>
        <span>Business Partners</span><tr/>
        <span>Supporting People</span><tr/>
        </Grid>

        <Grid item xs={12} sm={4}>
       Connect with us<th/>
        <br/>
        <span> Support</span><tr/>
        <span>Branches</span><tr/>
        <span>About Odigo Tech</span><tr/>
        
        </Grid>

        <Grid item xs={12} sm={4}>
        {/* <PermContactCalendarIcon/>   */}
        CONTACT INFORMATION<th/>
        <br/>
        {/* <EmailRoundedIcon/>
        <PhoneAndroidRoundedIcon/> 
        <StorefrontRoundedIcon/> */}
        <span> madhusudangt97@gmail.com</span><tr/>
        <span>  919986223399</span><tr/>
        <span> 9981******88</span><tr/>
        </Grid>
        <Grid item xs={12}>------------------------------------------------------------------------------</Grid>
        <Grid item xs={12}>@Copy Right Madhu GT 2020</Grid>
      </Grid>

    </div>  
  );
};

export default Footer;
