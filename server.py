from flask import Flask, request
import json
from werkzeug.datastructures import ImmutableMultiDict

app = Flask(__name__)

@app.route("/")
def index():
    return "success"

@app.route("/watchData", methods=['GET', 'POST']) 
def watchData():
    print(request.get_json())
    print(request.files)
    print(request.form.to_dict())
    print(json.loads(request.form.to_dict()))
    data = dict(request.form)
    for key in data.keys():
        print(type(key))

    # js = json.loads(data)
    # print(js)
    return "processed"

@app.route("/imageData")
def imageData(data):
    img = data
    return "processed"

app.run(host='0.0.0.0')