import React, { useEffect, useState } from 'react'
import HikedTailCard from './HikedTrailCard'
import { useParams } from 'react-router-dom'
import { Typography, Container, Grid } from '@mui/material'



function HikedTrailsList({hikedTrails}) {


//  if (!adventurer){
//   return (
//     <div>Loading..</div>
//   )
//  }
console.log(hikedTrails)
 const mapped_trail = [...hikedTrails].map(el => (
  <Grid item xs={3}>
     <HikedTailCard key={el.id} trail={el}/>
    </Grid>
 ))
 console.log(mapped_trail)
 
//  {hikedTrails.map((trail) => <HikedTailCard key={trail.id} trail={trail}/>)}

  return (
      <>
      {/* {hikedTrails.length === 0 ? (
      <Typography variant = 'h4'>You haven't added any hikes yet! </Typography>
      ):(  */}
        <Grid container>
          {mapped_trail}
        </Grid>
       
      </>
        
      
  )
}

export default HikedTrailsList