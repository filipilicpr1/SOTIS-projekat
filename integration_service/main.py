from flask import Flask
from controller.documents_controller import documents_bp

app = Flask(__name__)

app.register_blueprint(documents_bp)

if __name__ == "__main__":
    app.run(port=5002)