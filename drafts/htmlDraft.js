/*

Home.js
=====

import React from 'react'
import '../App.css'
import {useState, useEffect} from 'react'
//import {Link} from 'react-router-dom'

let sample_jokes = [
{'success': true, 
 'body': [{'_id': '60dd3603c701d87a2906fb7f', 'setup': 'Last time I was in jail I felt like a crop field in 1860', 
'punchline': 'Cause I was being plowed by black guys all day long', 
'type': 'crop', 'likes': [], 'author': {'name': 'unknown', 'id': ""}, 
'approved': true, 'date': 1618108661, 'NSFW': false, 
'shareableLink': 'https://dadjokes.io/joke/60dd3603c701d87a2906fb7f'}]
}
]

function Home() {
  let [error, setError] = useState(null)
  let [joke, setJoke] = useState({})  //{id: "", ...}
  let [seePunchline, setSeeP] = useState(false)  //rem guess

  function getJoke() {
    setSeeP(false)

    useEffect(() => {
      fetch("/dadJoke")  //
      .then(res => {
        if (!res.ok) throw Error('Could not fetch data')
        return res.json(); 
      })
      .then(data => {
        console.log("Data rec: " + data)  //inner joke obj
        jokeD = {id: "", type: "", setup: "", punchline: ""}
        jokeD.id = data.id;       jokeD.type = data.type
        jokeD.setup = data.setup; jokeD.punchline = data.punchline

        console.log("Joke obj: " + jokeD)
        setJoke(jokeD)
        setError(null)
      })
      .catch(err => {
        setError(err.message);
      })
    })
  }

  return (
  <div className="row justify-content-center">
  <div className="col-auto content">  
    <img src="../data/beard2.png" height: 70px alt="">  //attribute if host
    {error && <p> {error} </p>}
    <button type="button" className="btn btn-dark" onClick={getJoke}> Tell me a dad joke </button> <br />  
    {joke && <div>
      <p> {joke.setup} </p> <br /><br>
      <button type="button" className="btn btn-dark" onClick={()=> setSeeP(true)}> Show punchline </button> <br />
    </div>
    }
    {seePunchline && <div>
    <p> {joke.punchline} </p>
    <div class="rating">
      <p clas"subtitle"> Rating </p> 
      <input type="radio" name="rating" value="5" id="5"><label for="5">☆</label> <input type="radio" name="rating" value="4" id="4"><label for="4">☆</label> <input type="radio" name="rating" value="3" id="3"><label for="3">☆</label> <input type="radio" name="rating" value="2" id="2"><label for="2">☆</label> <input type="radio" name="rating" value="1" id="1"><label for="1">☆</label>
    </div>

    </div>
    }
  </div>
  </div>
  );
}

export default Home;
















*/