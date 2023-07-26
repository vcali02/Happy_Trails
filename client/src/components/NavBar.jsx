import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { AppBar, Avatar, Tooltip, Button, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import Search from './Search';

// import { Link, useNavigate, NavLink } from "react-router-dom"

// const pages = ['Explore', 'Safety', 'Shop'];
// const settings = ['Profile', 'Logout'];

function NavBar({updateAdventurer, adventurer, search, handleSearch}) {

  const navigate = useNavigate()

  function handleLogOut () {
    fetch('/api/logout')
    .then((response) => {
          if (response.ok) {
          updateAdventurer(null);
          navigate('/home');
      }
});
}

  return (
    <div> Navigation
        <nav>
          <NavLink to = "/home"> Home </NavLink>
          <NavLink to = "/safety"> Safety </NavLink>
          {/* <NavLink to = "/trail_reviews"> New Review </NavLink> */}
          {/* <NavLink exact to = "/adventurers"> Adventure Profile </NavLink> */}
          <NavLink to = "/trails"> Take a Hike </NavLink>
         {adventurer ? (<NavLink to = "/hiked_trails"> Your Hiked Trails </NavLink>) : ("")} 
          {/* <NavLink to = "/signup"> Signup </NavLink> */}
          
          { adventurer ?
                      (<>                     
                      <button onClick={handleLogOut} className="button" >
                             Log Out
                      </button>
                      </>) : 
                      <button>
                        <NavLink className="button" to= "/login"> Log In </NavLink>
                      </button>
                      
          }
        </nav>
      <Search search={search} handleSearch={handleSearch}/>
    </div>


  );
}
export default NavBar