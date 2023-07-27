import React from 'react'
import { Button, Container, CardActionArea, CardActions, Box, Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import HikingIcon from '@mui/icons-material/Hiking';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { Link } from 'react-router-dom'



//add ternary for button to display depending on if hiked or not

function TrailCard({ trail, adventurer, updateHikedTrails}) {

    const { id, name, distance, difficulty, description, image } = trail;
    
    const review_number = trail.trail_reviews.length
    const url = `/hiked_trails`
    const url2 = '/signup'

    function handleHikes(e, id, adventurer){
      fetch(`/api/hiked_trails`, {
        method: 'POST',
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify({
          trail_id: id,
          adventurer_id: adventurer.id
        }),
      })
      
      .then(res => res.json())
      .then(newTrail => updateHikedTrails(newTrail))
    }

    return (
      <Container className= "card-margin-top">
      <Card sx={{ minWidth: 345, minHeight: 425 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {difficulty}
          </Typography>
          <Box>
          <Typography variant='caption'>
            {distance}
          </Typography>
          </Box>
          
          <Typography variant='body1'>{description}</Typography>
          <Box marginTop={2}>
          <Typography variant='body2'>Reviews: {review_number}</Typography>
          </Box>
      
        </CardContent>
      </CardActionArea>
      <Divider/>
      <CardActions>
{/* add ternary where if user is null, route to login page */}
      {adventurer ? 
      <Button component={Link} to={url} onClick={(e) => handleHikes(e, id)}size="medium" color="primary" alt="Mark as hiked">
      <HikingIcon/> I hiked it!
    </Button>
    :
    <Button component={Link} to={url2} size="medium" color="primary" alt="Mark as hiked">
          <HikingIcon/> I hiked it!
        </Button>
    }
        
      </CardActions>
    </Card>
    </Container>
  );
}

export default TrailCard;