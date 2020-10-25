import React, { Component } from 'react';
//const CityContainer = require('./MapContainer');
const App = () => {

  //all components required into this file can be rendered here in parent app
  return (<div>
  <div className="city">
      <div className="name">NYC</div>
      <div className="temp">Current Average: 78 degrees</div>
      <div className="temp">Average for 1990 is 65 degrees</div>
      <div className="note">The average temperature has changed by 13 degrees</div>
    </div>
  </div>)
}

export default App;