import React, { useState, useEffect } from "react";

import "./App.css";
import Map from './component/Map/Map';
import { url } from "./api/utilities";
import fetchData from "./api/fetchData";


const mapData = {};
const handleClick = (e, countryCode) => {
  console.log(countryCode);
};

function App() {
  const [location, setLocation] = useState();
  const [hasErrors, setErrors] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const resultFetch = fetchData(url).then(res => setLocation(res));
  }, [count]);

  {
    location &&
      location.locations &&
      location.locations.forEach(item => {
        mapData[item.country_code] = item.latest.confirmed;
      });
  }

  return (
    <div>
      <Map handleClick={handleClick} mapData={mapData} />
    </div>
  );
}

export default App;
