# Happy_Trails

## User Stories:
- Users can search for trails to hike based on location and user preferences.
- User can rate trails they have hiked.
- User can view previous trails and ratings.
- View information about each trail

## Tech Stack:
[![My Skills](https://skillicons.dev/icons?i=js,py,flask,react,vite,materialui)](https://skillicons.dev)

## Wireframe
![Screenshot 2023-07-26 at 12 42 21 PM](https://github.com/vcali02/Happy_Trails/assets/128323898/c5c4467b-86cf-4640-b9f5-f4f9137afbf3)

## Schema
<img src=https://github.com/vcali02/Happy_Trails/assets/128323898/a72f4373-620b-4fae-ad72-ca1f54dd9af3 width="600">

## API Routes
| API Route              | Method | Body         | Response                         |
|------------------------|--------|--------------|----------------------------------|
| /api/authorize_session | GET    |              | {adventurer schema}              |
| /api/login             | GET    |              | {adventurer schema}              |
| /api/signup            | POST   | form or json | {adventurer schema}              |
| /api/trails            | GET    |              | [{trails schema}, {}, ...]       |
| /api/hiked_trails      | GET    |              | [{hiked_trails schema}, {}, ...] |
| /api/hiked_trails      | POST   | form or json | {hiked_trails schema}            |


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

## Instructions
1. Open two terminals
```
#for backend
$ cd server
$ pipenv install
$ pipenv shell
```

```
# for frontend
$ cd client
$ npm install
$ npm run dev
```




