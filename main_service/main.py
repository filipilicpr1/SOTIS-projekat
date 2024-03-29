from controllers import course_controller, users_controller, pdf_controller, chat_controller
from config import app
from initialize import initialize_app

app.register_blueprint(course_controller.bp)
app.register_blueprint(users_controller.bp)
app.register_blueprint(pdf_controller.bp)
app.register_blueprint(chat_controller.bp)

initialize_app()

if __name__ == "__main__":
    app.run(port=5001)