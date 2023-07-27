import React, {useState} from 'react'
import { AppBar, Avatar, Tooltip, Button, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import Search from './Search';
import { Link, useNavigate, NavLink, BrowserRouter } from "react-router-dom"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useTheme, useMediaQuery, Grid, Fade, } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SpaIcon from '@mui/icons-material/Spa';
import { red } from '@mui/material/colors';
import logo from './../Logos/Happy.png'

// import { Link, useNavigate, NavLink } from "react-router-dom"

// const pages = ['Explore', 'Safety', 'Shop'];
// const settings = ['Profile', 'Logout'];

function NavBar({updateAdventurer, adventurer, search, handleSearch}) {

  const navigate = useNavigate()
  const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('md'))

    const [value, setValue] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl)





    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

  function handleLogOut () {
    fetch('/api/logout', {
      method: 'POST',
  }).then((response) => {
          if (response.ok) {
          updateAdventurer(null);
          navigate('/home');
      }
});
}

/****NAV CONST*******************************************************************/
const home = <NavLink to = "/home"> Explore </NavLink>
const safety = <NavLink to = "/safety"> Safety </NavLink>
/* const new_rev = <NavLink to = "/trail_reviews"> New Review </NavLink> */
/* const profile = <NavLink exact to = "/adventurers"> Adventure Profile </NavLink> */
const take_hike = <NavLink to = "/trails"> Recommended Hikes </NavLink>
// const login = <NavLink className="button" to= "/login"> Log In </NavLink>
// const signup = <NavLink className="button" to= "/signup"> Sign Up </NavLink>

const hiked_trails = <NavLink to = "/hiked_trails"> Your Hiked Trails </NavLink>
const see_hiked_trails = adventurer ? ({hiked_trails}) : ("")

const logout = <NavLink to = "/home" onClick={handleLogOut}> Log out </NavLink>
const in_or_out =  adventurer ?
            (                    
              <Grid item sx={1}>
              <Button component={Link} to='/signup' size="small" color="secondary" variant = "contained">{logout}</Button>
              </Grid>
            ) : (
              <>
             <Grid item sx={1}  >
                <Button component={Link} to='/login' size="small" color="secondary" variant = "contained"> Login </Button>
              </Grid>
              <Grid item sx={1} >
                <Button component={Link} to='/signup' size="small" color="secondary" variant = "contained"> Signup </Button>
              </Grid>
              </>
             )


/****NAV CONST*******************************************************************/



// sx={{marginTop: "auto", marginLeft: "auto"}}


  return (
    <>
    <AppBar>
      <Toolbar className="App-header">
            <Grid container sx={{ placeItems: 'center'}} spacing={2}>
              <img className ="logo-margin-top" src={logo} height={80}/>
              <Grid item xs={1.5}>
                <Search search={search} handleSearch={handleSearch}/>
              </Grid>

              <Grid item xs={6.5} color="secondary" >
                <Tabs  indicatorColor="secondary" textColor="secondary" value={value} onChange={(e, val)=>setValue(val)}>
                    {/*<Tab label= {profile}/> */}
                    <Tab label= {home}/>
                    <Tab label= {safety}/>
                    <Tab label= {take_hike}/>
                </Tabs>
                {see_hiked_trails}
                
              </Grid>
              {in_or_out}
            </Grid>
      </Toolbar>
    </AppBar>
   </>

  );
}
export default NavBar