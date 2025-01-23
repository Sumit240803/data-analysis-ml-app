from flask import Flask

from flask_cors import CORS
from routes import cleaning
app = Flask(__name__)
app.register_blueprint(cleaning ,url_prefix ="/clean")
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)