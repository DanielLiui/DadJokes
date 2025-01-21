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
CORS(app)

dbPassword = os.getenv("DB_PASSWORD")
dbClient = MongoClient(f'mongodb+srv://danielliu545:{dbPassword}@cluster0.n2e59.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
dadJokesDB = dbClient["DadJokes"]
dadJokesColl = dadJokesDB["CustomDadJokes"]  #collection
customDadJokes = list(dadJokesColl.find())
  
'''
for joke in customDadJokes:
  #pprint.pprint(joke)
  print(joke)
'''


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


def getCustomDadJoke():
  random_i = random.randint(0, len(customDadJokes)-1)
  dadJoke = customDadJokes.pop(random_i)
  dadJoke['_id'] = str(dadJoke['_id'])
  return dadJoke


#print(getAPIDadJoke())


#ROUTES
@app.route("/test", methods=["POST"])
def test():
  data = request.get_json()  #dict
  print("Rec " + str(data))

  resp = {"message": "Thanks"}
  return jsonify(resp)


jokeType = 0  #0 = next joke to get is from database, 1 = next joke to get is from API

@app.route("/dadjoke", methods=["GET"])
def get_dadjoke():
  global jokeType
  dadJoke = None

  if jokeType == 0 and len(customDadJokes) > 0:
    dadJoke = getCustomDadJoke()
    jokeType = 1

  else:
    dadJoke = getAPIDadJoke()
    jokeType = 0

  return jsonify(dadJoke)  


if __name__ == "__main__":
  try:
    app.run(port=8000, debug=True)

  finally:
    dbClient.close()
