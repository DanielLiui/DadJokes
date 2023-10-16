
from flask import Flask, render_template, url_for, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#functs



#routes
@app.route("/test", methods=["POST"])
def test():
  data = request.get_json()  #dict
  print("Rec " + str(data))

  resp = {"message": "Thanks"}
  return jsonify(resp)


@app.route("/dadjoke", methods=["GET"])
def get_dadjoke():
  url = "https://dad-jokes.p.rapidapi.com/random/joke"

  headers = {
    "X-RapidAPI-Key": "e3938739a7msh9e96af120838cd6p124f95jsncd04a2b21318",
    "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com"
  }

  resp = requests.get(url, headers=headers)
  print("Data rec from API:"); print(resp.json())
  return jsonify(resp.json())  


if __name__ == "__main__":
  print("Visit: ")
  print("http://127.0.0.1:8000/dadjoke")
  app.run(port=8000, debug=True)
