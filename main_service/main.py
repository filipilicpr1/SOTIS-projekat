from flask import Flask
from flask_cors import CORS
from controllers import course_controller

app = Flask(__name__)
CORS(app)
app.register_blueprint(course_controller.bp)

if __name__ == "__main__":
    app.run(port=5001)