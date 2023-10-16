
import React from 'react';
import '../App.css';
import {useState} from 'react'


function Table() {
  let users = [{"id": 1, "name": "Dan"}, {"id": 2, "name": "Sam"}]

  return (
    <table id="resultTable">
      <thead>
      <tr>
        <th className="cell1"> ID </th>
        <th className="cell2"> User </th>
      </tr>
      </thead>

      <tbody>
      {users.map((u)=> (
        <tr key={u.id}>
          <td className="cell1"> <input type="checkBox" className="checkB" />  {u.id} </td>
          <td className="cell2"> {u.name} </td>
        </tr>
      )) }
      </tbody>
    </table>
  )
}

function Comp2() {
  return (
    <div className="body-div">
      
    </div>
  );
}

export default Table

