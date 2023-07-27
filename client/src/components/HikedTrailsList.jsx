import React, { useEffect, useState } from 'react'
import HikedTailCard from './HikedTrailCard'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'



function HikedTrailsList({adventurer, updateHikedTrails, hikedTrails}) {
  console.log(adventurer)

  

  useEffect(() => {
    getHikedTrails()
  }, [])

  function getHikedTrails(){
    fetch(`/api/hiked_trails/${adventurer.id}`)
    .then(res => res.json())
    .then(hikedTrails => updateHikedTrails(hikedTrails))
  }
  console.log(hikedTrails)

 if (!adventurer){
  return (
    <div>Loading..</div>
  )
 }
 
 

  return (
      <>
      {/* {hikedTrails.length === 0 ? (
      <Typography variant = 'h4'>You haven't added any hikes yet! </Typography>
      ):(  */}
        <div>
          {hikedTrails.map((trail) => <HikedTailCard key={trail.id} trail={trail}/>)}
        </div>
       
      </>
        
      
  )
}

export default HikedTrailsList