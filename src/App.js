import React, { useState, useEffect } from "react";

import "./App.css";
import Map from "./component/Map/Map";
import { url } from "./api/utilities";
import fetchData from "./api/fetchData";
import Chart from "./component/Chart/Chart";
import TableCo from "./component/Table/Table";

const handleClick = (e, countryCode) => {
  console.log(countryCode);
};

function App() {
  const [location, setLocation] = useState();
  const [count, setCount] = useState(0);
  let mapData = {};
  let chartData = {};
  let tableData = [];

  useEffect(() => {
    const resultFetch = fetchData(url).then(res => setLocation(res));
  }, [count]);

  mapData = location && location.mapData ? location.mapData : undefined;
  chartData = location && location.chartData ? location.chartData : undefined;
  tableData = location && location.tableData ? location.tableData : undefined;

  if (location) {
    return (
      <div>
        <Map handleClick={handleClick} mapData={mapData} />
        <Chart chartData={chartData} />
        <TableCo tableData={tableData} />
      </div>
    );
  } else {
    return <div>loading ... </div>;
  }
}

export default App;
