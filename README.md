# Dad jokes website
https://dadjokes-vsci.onrender.com/

The website displays dad jokes from an API and a custom MongoDB database (alternates).

# Toolkit
1. React
2. Flask backend
3. Dad Jokes API: https://rapidapi.com/KegenGuyll/api/dad-jokes/details/ 
4. MongoDB database of other dad jokes

# How to run in an IDE
1. Setup

Select virtual environment in your IDE or select

Windows terminal:
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
> .venv\Scripts\activate

Mac terminal:
> source .venv/bin/activate

Install packages:
pip install -r requirements.txt

Run backend server:
1. Subscribe to dad jokes API & put API key in a .env file like so:

DADJOKE_API_KEY="..."

app.py will import that key

2. In MongoDB Atlas create a cluster, a collection, and add custom dad jokes with the format

{setup: "...", punchline: ""}

Get the database key and put that in the .env too, like

DB_PASSWORD="..."

This step might take a while

> python app.py

Run React and website will open:
> npm start




