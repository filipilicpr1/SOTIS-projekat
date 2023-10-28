def initialize_app(app,db):
    with app.app_context():
        db.create_all()

