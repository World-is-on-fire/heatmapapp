import React from 'react';

const CityContainer = () => {
  return (
    //eventually replace the degrees, years with variables that we get from a loop
    <div className="city">
      <div className="name">NYC</div>
      <div className="temp">Current Average: 78 degrees</div>
      <div className="temp">Average for 1990 is 65 degrees</div>
      <div className="note">The average temperature has changed by 13 degrees</div>
    </div>
    //add drop downs/interaction here to select the city/year comparisinon
  );
};

export default CityContainer;
