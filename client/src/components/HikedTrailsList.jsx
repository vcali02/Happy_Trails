import React, { useEffect, useState } from 'react'
import HikedTailCard from './HikedTrailCard'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'



function HikedTrailsList({hikedTrails}) {


//  if (!adventurer){
//   return (
//     <div>Loading..</div>
//   )
//  }
console.log(hikedTrails)
 const mapped_trail = [...hikedTrails].map(el => {
    return <HikedTailCard key={el.id} trail={el}/>
 })
 console.log(mapped_trail)
 
//  {hikedTrails.map((trail) => <HikedTailCard key={trail.id} trail={trail}/>)}

  return (
      <>
      {/* {hikedTrails.length === 0 ? (
      <Typography variant = 'h4'>You haven't added any hikes yet! </Typography>
      ):(  */}
        <div>
          {mapped_trail}
        </div>
       
      </>
        
      
  )
}

export default HikedTrailsList