import React, { useEffect, useState } from 'react'
import HikedTailCard from './HikedTrailCard'



function HikedTrailsList({adventurer}) {
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
      {[...hikedTrails].map(trail => <HikedTailCard key={trail.id} trail={trail} hikedTrails={hikedTrails} />)}
    </div>
  )
}

export default HikedTrailsList