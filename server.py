from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)
api_key = "013ebb50b7a6ead82cd07ae120b5b96f"

@app.route('/')
@app.route('/home')
def index(data):
    
    return render_template("index.html")

@app.route('/about')
def about():
    return "<h1>Create by: Johnny Jimenez</h1><p>requests</p>"

@app.route('/api/weather', methods=["POST"])
def weather():
    # get data from JS request and store in variables
    lat = request.json['lat']
    lon = request.json['lon']
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=%s&lon=%s&appid=%s&units=metric" % ( lat, lon, api_key)

    response = requests.get(url)
    data = json.loads(response.text)
    index(data)
    return data

if __name__ == '__main__':
    app.run(debug=True)
