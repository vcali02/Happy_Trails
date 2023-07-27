from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from flask_login import UserMixin

db = SQLAlchemy() 
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

# Models go here!
class Adventurer(db.Model, SerializerMixin, UserMixin):
    __tablename__ = "adventurers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    bio = db.Column(db.String)
    image = db.Column(db.String)

    def __repr__(self):
       return f'name:{self.name} username:{self.username}, bio:{self.bio}, image:{self.image}' 
    #####validate password#### 
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)    

    #RELATIONSHIP
    #the Adventurer has many hiked_trails
    #the adventuruer has many reviews 
    trail_reviews = db.relationship('TrailReview', back_populates='adventurer', cascade="all, delete-orphan")
    hiked_trails = db.relationship('HikedTrail', back_populates='adventurer', cascade="all, delete-orphan")

    #ASSOCIATION PROXY
    # the Adventurer has many trails through hiked_trails
    trails_list = association_proxy('hiked_trails', 'trail')

    # #SERIALIZE RULES
    serialize_rules = (
         "-trail_reviews.adventurer",
         "-hiked_trails.adventurer"
     )
    
    # def serialize_hiked_trails(self):
    #     return [trail.serialize() for trail in self.hiked_trails]


    #VALIDATIONS
    @validates("name")
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Must include a name.")
        if len(name) < 1:
            raise ValueError("Name must be at least 1 character.")
        return name
    
    @validates("username")
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Must include a username.")
        if len(username) < 5:
            raise ValueError("Username must be at least 5 characters.")
        return username

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('failed simple email validation')
        return address





class HikedTrail(db.Model, SerializerMixin):
    __tablename__ = "hiked_trails"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    adventurer_id = db.Column(db.Integer, db.ForeignKey('adventurers.id'))
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.id'))
    
    #RELATIONSHIPS
    #hikedTrail has one adventurer and one trail
    adventurer = db.relationship('Adventurer', back_populates='hiked_trails')
    trail = db.relationship('Trail', back_populates='hiked_trails')

    @property
    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "adventurer_id": self.adventurer_id,
            "trail_name": self.trail.name
        }
        
    # # SERIALIZER
    # serialize_rules = (
    #     "-adventurer.hiked_trails",
    #     "-trail.hiked_trails"
    #     )
    
    #VALIDATIONS
    @validates("date")
    def validate_date(self, key, date):
        pass
    # #checks if it is in proper date time format
    # def valid_date(date):
    #     try:
    #         datetime.datetime.strptime(date, "%Y-%m-%d")
    #         return True
    #     except ValueError:
    #         return False
    # def valid_string(name):
    #     if len(name) >= 1:
    #         return True
    #     else:
    #         return False



class Trail(db.Model, SerializerMixin):
    __tablename__ = "trails"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    difficulty = db.Column(db.String)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    distance = db.Column(db.String)
    altitude = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)

    #RELATIONSHIPS
    # A Trail has many hikes (hiked_trails)
    # a trail has a location 
    # a Trail has many Reviews through Trail_Reviews 
    hiked_trails = db.relationship('HikedTrail', back_populates='trail')
    location = db.relationship('Location', back_populates='trails_list')
    trail_reviews = db.relationship('TrailReview', back_populates='trail')   

    #SERIALIZE RULES
    serialize_rules =(
        "-hiked_trails",
        "-trail_reviews.trail",
        "-location.trails_list",
        "-trail_reviews.adventurer",
        "-trail_reviews.adventurer_id",
        "-trail_reviews.trail_id",
        "-location.locations.id",
        "-location_id",
        "-location.id",
        "-trail_reviews.trail_id",
        "-trail_reviews.id",
    )
   
    #VALIDATION
    #do we need to validate?


class TrailReview(db.Model, SerializerMixin):
    __tablename__ = "trail_reviews"

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String)
    adventurer_id = db.Column(db.Integer, db.ForeignKey('adventurers.id'), nullable=False)
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.id'), nullable=False)

    #RELATIONSHIPS
        # Each review has one Trail and one Adventurer 
    adventurer = db.relationship('Adventurer', back_populates='trail_reviews')
    trail = db.relationship('Trail', back_populates='trail_reviews')

    #SERIALIZER
    serialize_rules = (
        "-adventurer.trail_reviews",
        "-trail.trail_reviews"
    )


    #VALIDATIONS
    @validates("review")
    def validate_review(self, key, review):
        if not review:
            raise ValueError("Must include a review.")
        if len(review) < 5:
            raise ValueError("Review must be at least 5 characters.")
        return review




class Location(db.Model, SerializerMixin):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location_type = db.Column(db.String)
    
    #RELATIONSHIPS
    #Each Location has many Trails (trails_list)
    trails_list = db.relationship('Trail', back_populates='location')

    #SERIALIZER
    serialize_rules = (
        "-trails_list.location",
        # "-trails_list.trail_reviews",
        # "-trails_list.hiked_trails"
    )


    #VALIDATIONS
    #do we need validations?