
import React from 'react';
import '../App.css';

function Navbar() {
  return (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark more-nav">
    <h3 className="navbar-brand" id="nav-title"> TsychoDan </h3>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-end align-center refs" id="navbarNavAltMarkup"> 
      <div className="navbar-nav">
      <a className="nav-item nav-link" href="/home"> Home </a>
      <a className="nav-item nav-link" href="/users"> Users </a>
      </div>
    </div>
  </nav>
  );
}

export default Navbar