import React from 'react'
import TrailCard from './TrailCard'
import { Box, Paper, styled } from '@mui/material'
import Grid from '@mui/material/Grid';
// import { GridList } from '@material-ui/core';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function TrailList({trails}) {
  // const trailCards = trails.map((trail) => (
  //   <TrailCard
  //   key={trail.id}
  //   trail={trail}/>)); 
  console.log(trails)
  
    const gridCards = trails.map((trail) => (
      <Grid item xs={2} sm={4} md={4} key={trail.id} trail={trail}>
        <TrailCard key={trail.id} trail={trail}/>
        {/* <Item><TrailCard key={trail.id} trail={trail}/></Item> */}
      </Grid>
 
      )); 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item>
        {gridCards}
        {/* {trails.from(trails(6)).map((trail) => (
          <Grid item xs={2} sm={4} md={4} key={trail.id} trail={trail}>
            <Item> <TrailCard /></Item>
          </Grid>
        ))} */}
        </Grid>
      </Grid>
    </Box>
  );
}
export default TrailList;