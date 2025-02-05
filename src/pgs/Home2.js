import React, { useState, useEffect } from 'react';
import '../App.css';
// import { Link } from 'react-router-dom';
import beardImg from '../images/beard2.png';

const port = "https://dadjokes-api2.onrender.com"
//const port = "http://127.0.0.1:8000"

async function getAPIDadJoke2() {
  try {
    const res = await fetch(port + "/dadjoke");
    if (!res.ok) throw new Error("Could not fetch data");
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

async function getCustomDadJokes2() {
  try {
    const res = await fetch(port + "/customdadjokes");
    if (!res.ok) throw new Error("Could not fetch data");
    const data = await res.json();
    return data.customDadJokes || [];  //{'setup': '', 'punchline': ''}
  } catch (err) {
    console.error(err.message);
    return [];
  }
}


function randomCustomDadJoke(dadJokes) {
  if (dadJokes.length == 0) return null

  let random_i = Math.floor(Math.random() * dadJokes.length)
  let joke = dadJokes[random_i]
  dadJokes.splice(random_i, 1)
  return joke
}


function Home() {
  const [error, setError] = useState(null);
  const [joke, setJoke] = useState(null);
  const [seePunchline, setSeePunchline] = useState(false);
  const [customDadJokes, setCustomDadJokes] = useState([]);
  const [jokeType, setJokeType] = useState(0);


  useEffect(() => {
    async function fetchJokes() {
      const jokes = await getCustomDadJokes2()
      setCustomDadJokes(jokes)
    }
    fetchJokes()
  }, [])


  async function showJoke() {
    setSeePunchline(false)
    let newJoke = await getAPIDadJoke2()
  
    if (jokeType === 0 && customDadJokes.length > 0) {
      newJoke = randomCustomDadJoke(customDadJokes)
      setJokeType(1)
    } else {
      newJoke = await getAPIDadJoke2()
      setJokeType(0)
    }

    if (!newJoke || !newJoke.setup) {
      setError("Something went wrong while fetching the dad joke.")
      setJoke(null)
    } else {
      setError(null)
      setJoke(newJoke)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-auto content">
        <br />
        <img src={beardImg} height="150px" alt="Beard Logo" />
        <br /><br />
        {error && <p className="error-text">{error}</p>}
        <button type="button" className="btn btn-dark btn-lg" onClick={showJoke}>
          Tell me a dad joke
        </button>
        <br />

        {joke && (
          <div>
            <br />
            <p className="joke-text">{joke.setup}</p>
            <br />
            <button type="button" className="btn btn-dark btn-lg" onClick={() => setSeePunchline(true)}>
              Show punchline
            </button>
            <br />
          </div>
        )}

        {seePunchline && joke && (
          <div>
            <br />
            <p className="joke-text">{joke.punchline}</p>
            <div className="rating">
              {[5, 4, 3, 2, 1].map((num) => (
                <React.Fragment key={num}>
                  <input type="radio" name="rating" value={num} id={num.toString()} />
                  <label htmlFor={num.toString()}>☆</label>
                </React.Fragment>
              ))}
            </div>
            <label>
              I don't get it <input type="checkbox" className="checkbox" />
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;
