from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/get-csv", methods=["POST"])
def processCsv():
    if request.method == "POST":
        # Check if file is part of the request
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        f = request.files['file']
        
        # Check if a file is selected
        if f.filename == '':
            return jsonify({"error": "No file selected"}), 400

        try:
            # Process the file as a CSV
            df = pd.read_csv(f)
            print(df.columns)
            return jsonify({"message": "File uploaded successfully", "columns": list(df.columns)}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
