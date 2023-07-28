import React from 'react'
import {Card, Grid, CardContent, CardActions, IconButton, CardMedia, Typography, Button } from '@mui/material'

function HikedTrailCard( { trail } ) {
 console.log(trail)
  return (
  
    <>
    <Card>
      <CardContent>
      <img src={trail.trail_image}  width={100}/>
        <Typography>{trail.trail_name}</Typography>
        <Typography>{trail.date}</Typography>
        <Button>Edit</Button>
      </CardContent>
    </Card>
    </>
  )
}

export default HikedTrailCard