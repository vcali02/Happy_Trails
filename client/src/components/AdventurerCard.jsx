import React from 'react'
import { Link } from "react-router-dom"
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material'

function AdventurerCard({adventurer}) {
  return (
    // <ul>
    //   <img src = {adventurer.image} alt = {"adventurer"}/>
    //   <h4> Adventurer Name {adventurer.name}</h4>
    //   <p>Adventurer Bio {adventurer.bio}</p>
    //   <li> Trails Hiked by this Adventurer {adventurer.hiked_trails}</li>
    //     <Link to={`/adventurers/${adventurer.id}`}>
		// 			<h2>{adventurer.name}</h2>
		// 		</Link>
    // </ul>

    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={adventurer.image}
        alt={adventurer.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
        {adventurer.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {adventurer.bio}
        </Typography>
        <Typography variant='h'>
        Trails Hiked by this Adventurer {adventurer.hiked_trails}
        </Typography>
        <Link to={`/adventurers/${adventurer.id}`}></Link>
      </CardContent>
    </CardActionArea>
    
    </Card>

  )
}

export default AdventurerCard