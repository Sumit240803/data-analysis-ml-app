from flask import request
def getToken() : 
    header = request.headers.get("Authorization")
    if header : 
        parts = header.split(" ")
        if(len(parts)==2 and parts[0]=="Bearer"):
            return parts[1]
        else:
            return None
    else:
        return None