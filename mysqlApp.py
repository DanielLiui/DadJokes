'''
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

#Database setup
db_host = os.getenv("DB_HOST")  # Hostinger database host
db_user = os.getenv("DB_USER")  # Hostinger database username
db_password = os.getenv("DB_PASSWORD")  # Hostinger database password
db_name = os.getenv("DB_NAME")  # Hostinger database name


def get_mysql_connection():
  return mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name
  )


#FUNCTIONS
def getAPIDadJoke():
  url = "https://dad-jokes.p.rapidapi.com/random/joke"

  headers = {
    "X-RapidAPI-Key": DADJOKE_API_KEY,
    "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com"
  }

  resp = requests.get(url, headers=headers).json()
  print(str(resp))
  resp = resp['body'][0]
  print("Data rec from API:"); print(resp)
  dadJoke = {'setup': resp['setup'], 'punchline': resp['punchline']}
  return dadJoke

  
def fetch_dad_jokes():
  connection = get_mysql_connection()
  cursor = connection.cursor(dictionary=True)
  cursor.execute("SELECT setup, punchline FROM dad_jokes")  # Replace 'dad_jokes' with your table name
  jokes = cursor.fetchall()
  cursor.close()
  connection.close()
  return jokes


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
  try:
    jokes = fetch_dad_jokes()
    print(str(jokes))
    return jsonify({'customDadJokes': jokes})

  except Exception as e:
    return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
  try:
    app.run(port=8000, debug=True)

  finally:
    dbClient.close()
'''
