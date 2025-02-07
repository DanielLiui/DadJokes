

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


async function getCustomDadJokes() {
  //fetch("https://dadjokes-api2.onrender.com/dadjoke")  
  fetch("http://127.0.0.1:8000/customdadjokes").then(res => {
    if (!res.ok) throw Error('Could not fetch data')
    return res.json(); 
  })
  .then(data => {
    let jokes = data['customDadJokes']
    //console.log("Data rec: " + JSON.stringify(joke))
    return jokes
  })
  .catch(err => {
    console.log(err.message)
    return null
  })
}


async function getAPIDadJoke() {
  //fetch("https://dadjokes-api2.onrender.com/dadjoke")  
  fetch("http://127.0.0.1:8000/dadjoke").then(res => {
    if (!res.ok) throw Error('Could not fetch data')
    return res.json(); 
  })
  .then(data => {
    let joke = data
    //console.log("Data rec: " + JSON.stringify(joke))
    return joke
  })
  .catch(err => {
    console.log(err.message)
    return null
  })
}


async function getAPIDadJoke2() {
  try {
    const res = await fetch("http://127.0.0.1:8000/dadjoke")
    if (!res.ok) throw new Error('Could not fetch data')
    const data = await res.json()
    let joke = data
    console.log(JSON.stringify(joke))
    return joke
  } catch (err) {
    console.log(err.message)
    return null
  }
}


async function getCustomDadJokes2() {
  try {
    const res = await fetch("http://127.0.0.1:8000/customdadjokes")
    if (!res.ok) throw new Error('Could not fetch data')
    const data = await res.json()
    let jokes = data['customDadJokes']
    return jokes
  } catch (err) {
    console.log(err.message)
    return null
  }
}

/*
async function test() {
  //let dadJoke = await getAPIDadJoke2()
  let dadJokes = await getCustomDadJokes2()
  console.log(JSON.stringify(dadJokes))
}
*/


function Home() {
  let [error, setError] = useState(null)
  let [joke, setJoke] = useState({})  //joke is an object with properties {setup: "", punchline: ""}
  let [seePunchline, setSeePunchline] = useState(false)

  let customDadJokes = []
  let jokeType = 0

  //if (customDadJokes == []) customDadJokes = getCustomDadJokes() 

  async function showJoke() {
    setSeePunchline(false)
    const newJoke = await getAPIDadJoke()
    
    if (!newJoke || !newJoke.setup) {
      setError("Something went wrong while fetching the dad joke.")
      setJoke(null)
    } else {
      setError(null)
      setJoke(newJoke)
    }

    /*
    if (jokeType == 0 and customDadJokes) > 0:
      setJoke(getRandomJoke(customDadJokes))
      jokeType = 1

    else {
      setJoke(getAPIDadJoke())
      jokeType = 0
    }
    */
  }
  
  return (
  <div className="row justify-content-center">
  <div className="col-auto content">  
    <br /> <img src={beardImg} height="150px" alt="" /> <br /><br />
    {error && <p> {error} </p>}
    <button type="button" className="btn btn-dark btn-lg" onClick={showJoke}> Tell me a dad joke </button> <br />  
    
    {joke && <div>
      <br /> <p className="joke-text"> {joke.setup} </p> <br />
      <button type="button" className="btn btn-dark btn-lg" onClick={()=> setSeePunchline(true)}> Show punchline </button> <br />
    </div>
    }

    {seePunchline && <div>
    <br /> <p className="joke-text"> {joke.punchline} </p> 
    <div className="rating">
      <input type="radio" name="rating" value="5" id="5" /><label htmlFor="5"> ☆ </label> <input type="radio" name="rating" value="4" id="4"/><label htmlFor="4"> ☆ </label> <input type="radio" name="rating" value="3" id="3" /><label htmlFor="3"> ☆ </label> <input type="radio" name="rating" value="2" id="2" /><label htmlFor="2"> ☆ </label> <input type="radio" name="rating" value="1" id="1" /><label htmlFor="1"> ☆ </label>
    </div> 
    <label> I don't get it <input type="checkbox" className="checkbox" /> </label>

    </div>}
  </div>
  </div>
  );
}

export default Home;

