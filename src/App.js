import React, { useState, useEffect } from "react";

import "./App.css";
import Map from "./component/Map/Map";
import { url } from "./api/utilities";
import fetchData from "./api/fetchData";
import Chart from "./component/Chart/Chart";
import TableCo from "./component/Table/Table";

const mapData = {};
const chartData = {};
const handleClick = (e, countryCode) => {
  console.log(countryCode);
};

function App() {
  const [location, setLocation] = useState();
  const [timeLine, setTimeLine] = useState();
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
  {
    location &&
      location.locations &&
      location.locations.forEach(item => {
        chartData[item.country_code] = item.timelines.confirmed.timeline;
      });
  }
  console.log("from server", mapData);
  return (
    <div>
      <Map handleClick={handleClick} mapData={mapData} />
      <Chart chartData={chartData} />
      <TableCo tableData={location} />
    </div>
  );
}

export default App;
