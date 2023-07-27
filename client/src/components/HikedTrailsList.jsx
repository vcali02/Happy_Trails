import React, { useEffect, useState } from 'react'
import HikedTailCard from './HikedTrailCard'
import { useParams } from 'react-router-dom'



function HikedTrailsList({adventurer}) {
  console.log(adventurer)
const [hikedTrails, setHikedTrails] = useState([])

  useEffect(() => {
    getHikedTrails()
  }, [])

  function getHikedTrails(){
    fetch(`/api/hiked_trails/${adventurer.id}`)
    .then(res => res.json())
    .then(hikedTrails => setHikedTrails(hikedTrails))
  }
  console.log(hikedTrails)



  return (
    <div>
      {[...hikedTrails].map(trail => <HikedTailCard key={trail.id} trail={trail}/>)}
    </div>
  )
}

export default HikedTrailsList