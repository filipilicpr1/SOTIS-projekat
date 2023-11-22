from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from decouple import config

app = Flask(__name__)

db = SQLAlchemy()
ma = Marshmallow()

CORS(app)

app.config["JWT_SECRET_KEY"] = config('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = config('CONNECTION_STRING')

db.init_app(app)
ma.init_app(app)