import React from 'react'
import {Card, Grid, CardContent, CardActions, IconButton, CardMedia, Typography } from '@mui/material'

function HikedTrailCard( {trail}) {
 
  return (
  
    <>
    <Card>
      <CardContent>
        <Typography>{trail.trail_name}</Typography>
        <Typography>{trail.date}</Typography>
      </CardContent>
    </Card>
    </>
  )
}

export default HikedTrailCard