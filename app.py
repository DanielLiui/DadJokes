from flask import Flask, render_template, url_for, request, jsonify
import requests
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
import random
import pprint

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

dbPassword = os.getenv("DB_PASSWORD")
dbClient = MongoClient(f'mongodb+srv://danielliu545:{dbPassword}@cluster0.n2e59.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
dadJokesDB = dbClient["DadJokes"]
dadJokesColl = dadJokesDB["CustomDadJokes"]  #collection
customDadJokes = list(dadJokesColl.find())

#remove obj id field
newCustomDadJokes = []  

for joke in customDadJokes:
  joke = {'setup': joke['setup'], 'punchline': joke['punchline']}
  newCustomDadJokes.append(joke)

customDadJokes = newCustomDadJokes


#FUNCTIONS
def getAPIDadJoke():
  url = "https://dad-jokes.p.rapidapi.com/random/joke"

  headers = {
    "X-RapidAPI-Key": "e3938739a7msh9e96af120838cd6p124f95jsncd04a2b21318",
    "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com"
  }

  resp = requests.get(url, headers=headers).json()
  resp = resp['body'][0]
  print("Data rec from API:"); print(resp)
  dadJoke = {'setup': resp['setup'], 'punchline': resp['punchline']}
  return dadJoke


#ROUTES
@app.route("/test", methods=["POST"])
def test():
  data = request.get_json()  #dict
  print("Rec " + str(data))

  resp = {"message": "Thanks"}
  return jsonify(resp)


@app.route("/dadjoke", methods=["GET"])
def getDadJoke():
  return jsonify(getAPIDadJoke())  


@app.route("/customdadjokes", methods=["GET"])
def getCustomDadJokes():
  return jsonify({'customDadJokes': customDadJokes})  


if __name__ == "__main__":
  try:
    app.run(port=8000, debug=True)

  finally:
    dbClient.close()


