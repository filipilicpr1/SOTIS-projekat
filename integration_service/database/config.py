from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

DATABASE_URI = 'postgresql+psycopg2://postgres:password@localhost:5432/postgres'
