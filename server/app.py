#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify, make_response, abort, session
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt

app = Flask(__name__)

# bcrypt = Bcrypt(app) ## not sure what this is - it was from the lecture 

# Local imports
#from config import app, db, api
# Instantiate app, set attributes
from models import db, Adventurer, HikedTrail, Trail, TrailReview, Location

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b'\xb8j\x8c\\\xea\xfdZr$\xf7\xa7\xec\xdc\x90\xcdd'
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

@app.route('/')
def index():
    return '<h1>Happy Trails</h1>'


###############################
##THIS NEEDS TO BE TESTED######
###############################

######SECURITY - ADD BLEACH OR ESCAPE TO ROUTES THAT INVOLVE CHANGES TO THE DB

# # Views go here!
#-------SIGNUP-------------#
class Signup(Resource):
     def post(self):
         data = request.get_json()
         new_adventurer = Adventurer(
             name = data.get('name'),
             username = data.get('username'),
             email = data.get('email'),
             bio = data.get('bio'),
             image = data.get('image'))
         new_adventurer.password_hash = data.get('password')
         db.session.add(new_adventurer)
         db.session.commit()
         session['adventurer_id'] = new_adventurer.id
         return make_response(new_adventurer.to_dict(), 201)

api.add_resource(Signup, '/signup') 
        
 #-----LOGIN-------------#
class Login(Resource):
     def post(self):
        data = request.get_json()
        adventurer = Adventurer.query.filter_by(username=data.get('username')).first()

        password = request.get_json()['password']

        if adventurer.authenticate(password):
            session['adventurer_id'] = adventurer.id
            return adventurer.to_dict(), 200
        
        return {'Invalid Credentials'}, 401
            
api.add_resource(Login, '/login')             

# #-----LOGOUT------------#
class Logout(Resource):
     def get(self):
         session['adventurer_id'] = None
         return make_response({"204":"No Content"},204)
        

api.add_resource(Logout, '/logout')       
 #------AUTHORIZE SESSION----------#

class AuthorizeSession(Resource):
    def get(self):
         try:
             adventurer = Adventurer.query.filter_by(
              id = session.get('adventurer_id')).first()
             return make_response(adventurer.to_dict(), 200)
         except:
             return make_response({}, 401)
        

               
   
  

api.add_resource(AuthorizeSession, '/authorize_session')
     


#---ADVENTURERS-----------------------------#
#GET /adventurers
#get users
class Adventurers(Resource):
    def get(self):
    
            #1. query
            adventurers = Adventurer.query.all()
            #2. dict
            adventurers_dict = [a.to_dict(only = ("bio", "image", "name", "username", "email")) for a in adventurers]
            #3. res
            res = make_response(
                adventurers_dict,
                200
            )
            return res
          

api.add_resource(Adventurers, '/adventurers')
#POST /adventurers
#make a new user
 #   def post(self):

        #1. data
 #       data = request.get_json()
  #      try:
            #2. instance
   #         new_adventurer = Adventurer(
    #            name = data.get("name"),
     #           username = data.get("username"),
      #          email = data.get("email"),
       #         password = data.get("password"),
        #        bio = data.get("bio"),
         #       image = data.get("image"),
          #  )
            #3. add/commit
           # db.session.add(new_adventurer)
            #db.session.commit()
            #4. dict
            #new_adventurer_dict = new_adventurer.to_dict()
            #5. res
            #res = make_response(
             #   new_adventurer_dict,
              #  201
           # )
            #return res
        #except:
         #   return {"400": "Adventurer Creation Unsuccessful"}, 400

#api


#GET /adventurers/<int:id>
#get one user
class OneAdventurer(Resource):
    def get(self, id):
        adventurer = Adventurer.query.filter_by(id=id).first()
        if not adventurer:
            return {"404": "Adventurer Not Found"}, 404
        
        res = make_response(
            adventurer.to_dict(only=('id', 'name', 'username', 'bio', 'image')),
            200
        )
        return res
 

        
#PATCH /adventurers/<int:id>
#edit/update one user
    def patch(self, id):
        adventurer = Adventurer.query.filter_by(id=id).first()
        data = request.get_json()
        if not adventurer:
            return {"404": "Adventurer Not Found"}, 404
        
        else:
            try:    
                for attr in data:
                    setattr(adventurer, attr, data.get(attr))
                db.session.add(adventurer)
                db.session.commit()
                return make_response(
                    adventurer.to_dict(), 
                    200
                        )
            except:
                return make_response({"400": "Adventurer Update Unsuccessful."}, 400)
        
       



######ERROR FIXED - WAS NOT DELETING####
####IntegrityError: (sqlite3.IntegrityError) NOT NULL constraint failed:
		# hiked_trails.adventurer_id
		# [SQL: UPDATE hiked_trails SET adventurer_id=? WHERE hiked_trails.id = ?]
		# [parameters: [(None, 9), (None, 11), (None, 12), (None, 14), (None, 16), (None, 19)]]

#DELETE /adventurers/<int:id>
#delete a user
    def delete(self, id):

        adventurer = Adventurer.query.filter_by(id=id).first()
        if not adventurer:
            return {"404": "Adventurer Not Found"}, 404
        db.session.delete(adventurer)
        db.session.commit()
        return {}, 204
        
api.add_resource(OneAdventurer, "/adventurers/<int:id>")


# #---ADVENTURERS-----------------------------#



#---TRAILS-----------------------------#
class Trails(Resource):
    def get(self):
        trails = Trail.query.all()
        trails_dict = [trail.to_dict(only = ("id","name", "image", "altitude", "description", "difficulty", "distance", "location", "trail_reviews")) for trail in trails]
        return make_response(trails_dict, 200)
    def post(self): #----add to READMe----#
        data = request.get_json()
        try:
            new_trail = Trail(
                name = data.get('name'),
                image = data.get('image'),
                difficulty = data.get('difficulty'),
                location_id = data.get('location_id'),
                distance = data.get('distance'),
                altitude = data.get('altitude'),
                description = data.get('description'),
                trail_reviews_id = data.get('trail_reviews_id')
            )
            db.session.add(new_trail)
            db.session.commit()
        except:
            return make_response({"ERROR"}, 422)
        
        return make_response(new_trail.to_dict(), 201)    
   
    
api.add_resource(Trails, '/trails')  

class OneTrail(Resource):
    def get(self, id):
        one_trail = Trail.query.filter_by(id = id).first()
        if not one_trail:
            return make_response({"404": "Trail Not Found"}, 404)
        
        return make_response(one_trail.to_dict(only = ("id","name", "image","altitude", "description", "difficulty", "distance", "location", "trail_reviews", "image")), 200)

api.add_resource(OneTrail, '/trails/<int:id>')    
# #---TRAILS-----------------------------#



#---HIKED TRAILS-----------------------------#
#GET /hiked_trails
#get list of trails that have been hiked

class HikedTrails(Resource):
    def get(self):
        try:
            hiked_trails = HikedTrail.query.all()
            hiked_trails_dict = [h.to_dict(only = ("date", "trail")) for h in hiked_trails]
            res = make_response(
                hiked_trails_dict,
                200
            )
            return res
        except:
            return {"404": "Hiked Trails Not Found"}, 404

api.add_resource(HikedTrails, "/hiked_trails")

#GET /hiked_trails/<int:id>
#get individual trail that has been hiked
class OneHikedTrail(Resource):
    def get(self, id):
        hiked_trail = HikedTrail.query.filter_by(id=id).first()
        if not hiked_trail:
            return {"404": "Hiked Trail Not Found"}, 404
        hiked_trail_dict = hiked_trail.to_dict(only = ("adventurer_id", "trail_id", "trail", "date"))
        res = make_response(
            hiked_trail_dict,
            200
        )
        return res

# PATCH /hiked_trails/<int:id>
    # toggle hike status of a trail (favorites)
    def patch(self, id):
        data = request.get_json()
        hiked = data.get('hiked', None)

        if hiked is None:
            return {"400": "Bad Request"}, 400

        hiked_trail = HikedTrail.query.filter_by(id=id).first()
        if not hiked_trail:
            return {"404": "Hiked Trail Not Found"}, 404

        hiked_trail.hiked = hiked
        db.session.commit()

        return make_response(hiked_trail.to_dict(), 200)

#DELETE /hiked_trails/<int:id>
#delete trails user has hiked
    def delete(self, id):
        hiked_trail = HikedTrail.query.filter_by(id=id).first()
        if not hiked_trail:
            return {"404": "Hiked Trails Not Found"}, 404
        db.session.delete(hiked_trail)
        db.session.commit()
        return make_response(
            {},
            204
        )


api.add_resource(OneHikedTrail, "/hiked_trails/<int:id>")


# #---HIKED TRAILS-----------------------------#


#---TRAIL REVIEWS-----------------------------#

#get /trail_reviews
class TrailReviews(Resource):
    def get(self):
        # trail_review = TrailReview.query.all()
        trail_reviews_dict = [t.to_dict(only = ("review", "adventurer_id", "trail_id")) for t in TrailReview.query.all()]
        return make_response(trail_reviews_dict, 200)
    #POST 
    def post(self):
        #this gives us whatever is sent to the backend
        #data is an object
        #how can we go through the data obj to get the adventurer username key
        #THIS IS WHAT I SEND IN THE FE POST
        data = request.get_json()
        #this gives us the row of the adventurer
        #filter_by(column_name = data[what you grab from the front end])
        adventurer_row = Adventurer.query.filter_by(username == data["adventurer_username"]).first()
        #give us what is stored in the id column
        adventurer_id = adventurer_row.id

        trail_row = Trail.query.filter_by(name = data['trail_name']).first()
        trail_id = trail_row.id



        trail_name = Trail.query.filter_by(name == name).first()
        #1. query adventurer filter_by()
        #2. trail

        #left of = must match table attributes
        try:
            new_trail_review = TrailReview(
                review = data.get('review'),
                adventurer_id= adventurer_id,
                trail_id= trail_id
            )
            db.session.add(new_trail_review)
            db.session.commit()
            return make_response(new_trail_review.to_dict(only = ("review", "adventurer_id", "trail_id")), 201)
        except ValueError:
            return ({'error': '400: Validation error'}, 400)

api.add_resource(TrailReviews, '/trail_reviews')


#GET /trail_reviews/int:id
class OneTrailReview(Resource):
    def get(self, id):
        one_review = TrailReview.query.filter_by(id=id).first()
        if not one_review:
            return ({'error': '404: review not found'})
        return make_response(one_review.to_dict(
            only=(
                'review',
                'adventurer_id',
                'trail_id'
            )
        ), 200
        )
#PATCH /trail_reviews/int:id
    def patch(self,id):
        review = TrailReview.query.filter_by(id=id).first()
        if not review:
            return ({'error': '404: review not found'}, 404)
        try:
            data=request.get_json()
            for attr in data:
                setattr(review, attr, data.get(attr))
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(only=('review',)),202)
        except:
            return {'error': '400'}

# DELETE /trail_reviews/int:id
    def delete(self, id):
        review = TrailReview.query.filter(TrailReview.id ==id).first()
        if not review:
            return ({'error': '404: review not found'}, 404)
        db.session.delete(review)
        db.session.commit()
        return {}, 204


api.add_resource(OneTrailReview, '/trail_reviews/<int:id>')



# #---TRAIL REVIEWS-----------------------------#



#---LOCATION-----------------------------#
class Locations(Resource):
    def get(self):
        locations = Location.query.all()
        locations_dict = [location.to_dict(only = ("location_type", "name")) for location in locations]
        return make_response(locations_dict, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_location = Location(
                name = data.get('name'),
                location_type = data.get('location_type')
                
            )
            db.session.add(new_location)
            db.session.commit()
        except:
            return make_response({"ERROR"}, 422)

        return make_response(new_location.to_dict(only = ("id", "location_type", "name")), 201) 
api.add_resource(Locations, '/locations')



class OneLocation(Resource):
    
    def get(self, id):
        one_location = Location.query.filter_by(id = id).first()
        if not one_location:
            return make_response({"404: Trail Not Found"}, 404)
        return make_response(one_location.to_dict(only = ("location_type", "name", "trails_list")), 200)
    
api.add_resource(OneLocation, '/locations/<int:id>')    
     
    
#---LOCATION-----------------------------#



###########ADVANCED DELIVERABLES############


#---FRIENDS-----------------------------#
#---FRIENDS-----------------------------#

if __name__ == '__main__':
    app.run(port=5555, debug=True)