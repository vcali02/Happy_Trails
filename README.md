# Happy_Trails

## User Stories:
- Users can search for trails to hike based on location and user preferences.
- User can rate trails they have hiked.
- User can view previous trails and ratings.
- View information about each trail

Tech Stack:
[![My Skills](https://skillicons.dev/icons?i=js,py,flask,react,vite,materialui)](https://skillicons.dev)

## Wireframe
![Screenshot 2023-07-26 at 12 42 21 PM](https://github.com/vcali02/Happy_Trails/assets/128323898/c5c4467b-86cf-4640-b9f5-f4f9137afbf3)

## Schema
<img src=https://github.com/vcali02/Happy_Trails/assets/128323898/a72f4373-620b-4fae-ad72-ca1f54dd9af3 width="600">

## API Routes
| API Route                | Method | Body                                                                                   | Response                                                                                                                                                          |
|--------------------------|--------|----------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|

| /adventurers/<int:id>    | GET    |                                                                                        | { "id": 1, "name": "Val", "email": "val@awesome.com", "username": "valCal", "password": "******"  }                                                               |
| /adventurers/<int:id>    | PATCH  | { "attr":"data"}                                                                       | { "id": 1, "name": "Val", "email": "val@awesome.com", "username": "UpdatedvalCal", "password": "******"  }                                                        |
| /adventurers/<int:id>    | DELETE |                                                                                        | {}                                                                                                                                                                |
| /trails                  | GET    |                                                                                        | {     "id" : 2,     "name" : "trail name",     "difficulty" : 5,     "distance" : 2,     "altitude" : 5280,     "description" : "trail description" }, {..}, {..} |
| /trails/<int:id>         | GET    |                                                                                        | {     "id" : 2,     "name" : "trail name",     "difficulty" : 5,     "distance" : 2,     "altitude" : 5280,     "description" : "trail description" }             |
| /hiked_trails            | GET    |                                                                                        | {     "id" : 2,     "date" : 06-23-2023,     "adventurer_id" : 1,     "trail_id" : 2 }, {..}, {..},...                                                            |
| /hiked_trails/<int:id>   | GET    |                                                                                        | {     "id" : 2,     "date" : 06-23-2023,     "adventurer_id" : 1,     "trail_id" : 2 }                                                                            |
| /hiked_trails/<int:id>   | DELETE |                                                                                        | {}                                                                                                                                                                |
| /trail_reviews           | GET    |                                                                                        | {     "id" : 1,     "review" : "review here",     "adventurer_id" : 2 }, {..}, {..}, ..                                                                           |
| /trail_reviews           | POST   | {     "review" : "review here",     "adventurer_id" : 2, "rating":4  }                 | {     "review" : "review here",     "adventurer_id" : 2, "rating":4  }                                                                                            |
| /trail_reviews/<int:id>  | GET    |                                                                                        | {     "id" : 1,     "review" : "review here",     "adventurer_id" : 2 }                                                                                           |
| /trail_reviews/<int:id>  | PATCH  | { "attr" : "data",     "adventurer_id" : 3 }                                           | { "attr" : "data",     "adventurer_id" : 3 }                                                                                                                      |
| /trail_reviews/<int:id>  | DELETE |                                                                                        | {}                                                                                                                                                                |
|/login | POST | {"name":"Val", "password": "******"} |  |
|/authorize_session | GET | | |


## Client-side Routes
| Client Route   | Component     |
|----------------|---------------|
| /welcome       | Welcome.jsx   |
| /home          | TrailList.jsx  |
| /trail/id      | TrailCard.jsx  |
| /add_review/id | addReview.jsx  |
| /hiked_trails  | HikeTrails.jsx|
| /safety        | Safety.jsx     |
| /login         | loginForm.jsx  |
| /profile       | Profile.jsx    |


