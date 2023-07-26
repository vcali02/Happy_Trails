import React from 'react'
import {Card, Grid, CardContent, CardActions, IconButton, CardMedia, Typography } from '@mui/material'

function HikedTrailCard( {trail} ) {
  const {trail_name, date} = trail
  return (
    <>
    <Card>
      <CardContent>
        <Typography>{trail_name}</Typography>
        <Typography>{date}</Typography>
      </CardContent>
    </Card>
    </>
  )
}

export default HikedTrailCard