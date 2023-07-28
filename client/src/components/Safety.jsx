// Import the React library
import React from 'react';
import logo2 from './../Logos/Happy2.png'
import { List, ListItem, Typography } from '@mui/material';

// Define the Safety functional component
const Safety = () => {


    // Render the terms of service, user agreement, and a button for contacting emergency services
    return (
        <div>
            {/* <img src={logo2}/> */}

            <Typography variant='h3'>Safety Tips:</Typography>
            <List>
                <ListItem>
                    <Typography>
                    <Typography sx={{fontWeight: 'bold'}}>Outdoor Plan:</Typography>
                    Cell connectivity in many state park units is limited or non-existent. Tell a responsible person back at camp or at home where you are going and when you plan on returning. Ask that person to notify local law enforcement if you do not return on time.
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography>
                        <Typography sx={{fontWeight: 'bold'}}>Hike with a friend or family member. </Typography>
                        The companionship in the great outdoors is fun and you can encourage one another to meet your fitness goals.
                    </Typography>
                 
                </ListItem>
                <ListItem>
                Don’t walk off-trail. Do not walk off-trail or enter closed areas. Cutting across switchbacks erodes the hillside and eventually destroys the trail. Plus, walking off-trail increases your chance of suffering an injury or getting lost.
                </ListItem>
                <ListItem>
                Be courteous and observe trail etiquette. Communicate with others and step aside to yield, if possible, when others approach you on a trail. Alert those in front if you wish to pass.
                </ListItem>
                <ListItem>
                Take plenty of drinking water.  Leave stream, river and lake water for the park wildlife. Although it looks clean and refreshing, mountain stream water can make you ill. Drink and carry plenty of water (a minimum of 1 quart every two hours).
                </ListItem>
                <ListItem>
                Shoes: Wear sturdy, comfortable shoes to help prevent injury.
                </ListItem>
                <ListItem>
                Never feed or touch wildlife. Do not approach or attempt to move sick or injured wildlife. Please report any encounters with aggressive, sick or injured animals to a park ranger.
Wildlife lives in all parks, even near urban areas. Although rare, black bears, mountain lions and rattlesnakes may be seen. If you encounter wildlife on the trail, keep your distance, back away slowly and do not run. Report your sightings to a Park Ranger.
                </ListItem>
                <ListItem>
                Snakes: Always know where you are stepping. For example, if you must traverse a log that has fallen across the trail, rather than just stepping over the log, first step up onto the log then step down once you know the coast is clear. Be cautious when climbing rocks or picking up firewood. If you see a snake, maintain a distance of at least 6 feet. Most bites occur when people get too close or try to touch them.
                </ListItem>
                <ListItem>
                Ticks: Populations are expected to rise again this season. Take the following precautions to avoid them:
                Walk in the middle of trails.
                Use insect repellent.
                Tuck your pants into your socks.
                After taking off gear, check for hitchhiking ticks
                Always do a “tick-check” with the help of a friend.
                </ListItem>
                <ListItem>
                Poison Oak: It is a common plant throughout much of California. Learn to identify its shiny, three-leaf pattern, and avoid touching it. If you touch poison oak, wash immediately with water and mild soap. Pat dry with a clean towel.
                </ListItem>
            </List>

            <Typography variant='h2'>Gear Recommendations from the HappyTrails team:</Typography>


            

        </div>
    );
};

// Export the Safety component as the default export from this module
export default Safety;

