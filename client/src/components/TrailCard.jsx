import React from 'react'
import { Button, Container, CardActionArea, CardActions, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import HikingIcon from '@mui/icons-material/Hiking';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { Link } from 'react-router-dom'



//add ternary for button to display depending on if hiked or not

function TrailCard({ trail, adventurer}) {
    // const url = `/hiked_trails/${adventurer.id}`

    const { id, name, distance, difficulty, description, image } = trail;
    
    const review_number = trail.trail_reviews.length

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
      <CardActions>
{/* add ternary where if user is null, route to login page */}
        {/* <Button component={Link} to={url} size="medium" color="primary" alt="Mark as hiked">
          <HikingIcon/> I hiked it!
        </Button> */}
      </CardActions>
    </Card>
    </Container>
  );
}

export default TrailCard;