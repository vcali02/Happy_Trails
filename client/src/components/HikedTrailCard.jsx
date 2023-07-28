import React from 'react'
import {CardActionArea, Card, Grid, CardContent, Container, CardActions, IconButton, CardMedia, Typography, Button } from '@mui/material'

function HikedTrailCard( { trail } ) {
 console.log(trail.id)

 function deleteHikedTrail(){
  fetch(`api/hiked_trails/${trail.id}`, {
    method: 'DELETE'
  })
}


  return (
  
    <Container className= "card-margin-top">
    <Card sx={{ minWidth: 345, maxHeight: 425 }}>
      <CardActionArea>
      <CardMedia
          component="img"
          height="140"
          image={trail.trail_image}
          alt={trail.trail_name}
        />
      <CardContent>
      {/* <img src={trail.trail_image}  width={100}/> */}
        <Typography>{trail.trail_name}</Typography>
        <Typography>{trail.date}</Typography>
        <Button>Edit</Button>
        <Button onClick={(e) => deleteHikedTrail(e)}>Remove</Button>
      </CardContent>
      </CardActionArea>
    </Card>
    </Container>
  )
}

export default HikedTrailCard