import React, { useState, useEffect } from 'react'
import NavBar from "./NavBar";
import TrailList from "./TrailList";
import Safety from "./Safety"
import SignupForm from './SignupForm';
import AddReview from "./AddReview"
import HikedTrailsList from "./HikedTrailsList"
import {Routes, Route } from 'react-router-dom'
import { Box, Grid, Container } from '@mui/material';
import AdventurerContainer from "./AdventurerContainer";
import LoginForm from './LoginForm';

function App() {
  const [adventurers, setAdventurers] = useState([]);
  const [trails, setTrails] = useState([]); // Initialize to empty array
  const [search, setSearch] = useState('')
  const [adventurer, setAdventurer] = useState(null)
  console.log(adventurer)

  useEffect(() => {
    getTrails();
    getAdventurer();
  }, []);

  function getTrails() {
    fetch('/api/trails')
      .then(res => res.json())
      .then(data => setTrails(data))
      .catch((error) => console.error('Error:', error));
  }
//GETS ALL ADVENTURERS FOR FUTURE FRIEND FEATURE
  // function getAdventurers() {
  //   fetch('/api/adventurers')
  //     .then(res => res.json())
  //     .then(data => setAdventurers(data))
  //     .catch((error) => console.error('Error:', error));
  // }

  //get user's information - pass down to profile and to hiked_trails

  function getAdventurer() {
    fetch('/api/authorize_session')
      .then(response => {
      if (response.ok) {
        response.json().then((adventurer) => setAdventurer(adventurer))}
       
      else  {setAdventurer(null)} 
      })
  }

  //adds new adventurer to current adventurers on signup
   function updateAdventurer(adventurer) {
        setAdventurers([...adventurers, adventurer])
   } 


  const handleSearch = (newStr) => {
    setSearch(newStr)
  }

 const filteredTrails = [...trails].filter(trail =>
    trail.name.toLowerCase().includes(search.toLowerCase()))

  
  return (
    <div>
        <NavBar updateAdventurer={updateAdventurer} adventurer={adventurer} search={search} handleSearch={handleSearch}/>
        <Grid>
        <Routes>
          <Route path="/home" element={<TrailList trails={filteredTrails}/>}/>
          <Route path="/safety" element={<Safety />} />
          <Route path="/signup" element={<SignupForm updateAdventurer={updateAdventurer}/>} /> 
          <Route path="/trail_reviews" element={<AddReview />} />
          {/* <Route path="/adventurers" element={<AdventurerContainer adventurers={adventurers}/>} /> */}
          <Route path="/trails" element={<TrailList trails={trails}/>} />
          <Route path="/hiked_trails" element={<HikedTrailsList adventurer={adventurer}/>} />
          <Route path="/login" element={<LoginForm updateAdventurer={updateAdventurer} />} />
        </Routes>
        </Grid>
    </div>
  )}

export default App;