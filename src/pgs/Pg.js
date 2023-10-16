

import React from 'react'
import '../App.css'
import {useState, useEffect} from 'react'
//import { Link } from 'react-router-dom'
import Table from '../components/Components'

function Pg() {
  return (
  <div className="row justify-content-center content">
  <div className="col-auto">
    <h3> Title </h3>
    <Table />
    
  </div>
  </div>
  );
}

export default Pg;