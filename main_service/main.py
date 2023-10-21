from flask import Flask
from flask_cors import CORS
from controllers import new_course_controller

app = Flask(__name__)
CORS(app)
app.register_blueprint(new_course_controller.bp)

if __name__ == "__main__":
    app.run(port=5001)