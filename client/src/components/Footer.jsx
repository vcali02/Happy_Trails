import React, { useContext } from 'react';
import {Box, Paper, Typography} from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaGithub,
    FaHome,
    FaEnvelope,
    FaPhone,
    FaPrint,
  } from "react-icons/fa";

function Footer() {
  return (
    <Box >
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}
      justifyContent="center"
      alignItems="center" 
      >
    <Typography></Typography>
      <BottomNavigation
        showLabels
      > 
        <BottomNavigationAction label="Contact Us" component={Link} to='/home' />
        <BottomNavigationAction label="About" component={Link} to='/home' />
      </BottomNavigation>
    
    
     

      </Paper>
      
    </Box>
  );
}

export default Footer