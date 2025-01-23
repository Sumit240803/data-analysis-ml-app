from flask import Blueprint, jsonify, request,current_app
import pandas as pd
import os
cleaning_blueprint= Blueprint("cleaning",__name__)
import requests
from utils import getToken
@cleaning_blueprint.route("/upload-csv",methods=["POST"])
def upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    token = getToken()
    if(token==None):
        return jsonify({"error": "Authorization token is missing or invalid"}), 401
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        upload_folder = current_app.config.get("UPLOAD_FOLDER","uploads")
        os.makedirs(upload_folder,exist_ok=True)

        file_path = os.path.join(upload_folder, file.filename)
        file.save(file_path)
        response = requests.post("http://127.0.0.1:3000/api/user/save-file",json={
            "filesname" : file.filename
        },headers={
            "Authorization" : f"Bearer {token}"
        })
        return jsonify({"message": "File uploaded and saved successfully", "file_path": file_path}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@cleaning_blueprint.route("/get-csv", methods=["POST"])
def processCsv():
    if request.method == "POST":
        
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        f = request.files['file']

       
        if f.filename == '':
            return jsonify({"error": "No file selected"}), 400

      
        if not f.filename.endswith('.csv'):
            return jsonify({"error": "Only CSV files are allowed"}), 400

        try:
         
            df = pd.read_csv(f)
            head_val = df.head(10).to_dict(orient='records')  
            return jsonify({
                "message": "File uploaded successfully",
                "columns": list(df.columns),
                "head": head_val
            }), 200
        except pd.errors.EmptyDataError:
            return jsonify({"error": "The uploaded file is empty"}), 400
        except pd.errors.ParserError:
            return jsonify({"error": "Error parsing the CSV file"}), 400
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500