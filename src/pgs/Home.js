

import React from 'react'
import '../App.css'
import {useState} from 'react'
//import {Link} from 'react-router-dom'
import beardImg from '../images/beard2.png'


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
  let [joke, setJoke] = useState({})  
  let [guess, setGuess] = useState("")
  let [seePunchline, setSeeP] = useState(false)

  function getJoke() {
    setGuess(""); setSeeP(false)
    // let jokeD = {id: sample_jokes[0].body.id, type: sample_jokes[0].body.type, 
    // setup: sample_jokes[0].body.setup, punchline: sample_jokes[0].body.punchline}

    // console.log("Data rec: " + jokeD)
    // setJoke(jokeD)

    fetch("http://127.0.0.1:8000/dadjoke")  //or http://127.0.0.1:8000/dadjoke
    .then(res => {
      if (!res.ok) throw Error('Could not fetch data')
      return res.json(); 
    })
    .then(data => {
      console.log("Data rec: " + JSON.stringify(data))
      let fullJokeD = (data.body)[0]
      let jokeD = {setup: "", punchline: ""}
      jokeD.setup = fullJokeD.setup; jokeD.punchline = fullJokeD.punchline

      console.log("Joke obj: " + JSON.stringify(jokeD))
      setJoke(jokeD)
      setError(null)
    })
    .catch(err => {
      setError(err.message);
    })
  }
  
  return (
  <div className="row justify-content-center">
  <div className="col-auto content">  
    <br /> <img src={beardImg} height="70px" alt="" /> <br /><br />
    {error && <p> {error} </p>}
    <button type="button" className="btn btn-dark" onClick={getJoke}> Tell me a dad joke </button> <br />  
    {joke && <div>
      <br /> <p className="joke-text"> {joke.setup} </p> <br />
      <button type="button" className="btn btn-dark" onClick={()=> setSeeP(true)}> Show punchline </button> <br />
    </div>
    }
    {seePunchline && <div>
    <br /> <p className="joke-text"> {joke.punchline} </p> 
    <div className="rating">
      <input type="radio" name="rating" value="5" id="5" /><label for="5"> ☆ </label> <input type="radio" name="rating" value="4" id="4"/><label for="4"> ☆ </label> <input type="radio" name="rating" value="3" id="3" /><label for="3"> ☆ </label> <input type="radio" name="rating" value="2" id="2" /><label for="2"> ☆ </label> <input type="radio" name="rating" value="1" id="1" /><label for="1"> ☆ </label>
    </div> 
    <label> I don't get it <input type="checkbox" className="checkbox" /> </label>

    </div>}
  </div>
  </div>
  );
}

export default Home;
