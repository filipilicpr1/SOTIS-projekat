from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from decouple import config

db = SQLAlchemy()
ma = Marshmallow()

DATABASE_URI = config('DATABASE_URI')

