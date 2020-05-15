import React, { useState, useEffect } from "react";

import "./App.css";
import Map from "./component/Map/Map";
import { url } from "./api/utilities";
import fetchData from "./api/fetchData";
import Chart from "./component/Chart/Chart";
import TableCo from "./component/Table/Table";
import Related from "./component/Related/Related";
import CircularProgress from "@material-ui/core/CircularProgress";
import TopRate from "./component/TopRate/TopRate";
import UncontrolledLottie from "./component/UncontrolledLottie";

import { useWindowSize } from "./component/hooks/useWindowSize";

const handleClick = (e, countryCode) => {};

function App() {
  const [location, setLocation] = useState();
  const [count, setCount] = useState(0);
  const size = useWindowSize();

  let mapData = {};
  let chartData = {};
  let tableData = [];
  let topRate = [];

  useEffect(() => {
    const resultFetch = fetchData(url).then((res) => setLocation(res));
  }, [count]);

  mapData = location && location.mapData ? location.mapData : undefined;
  chartData = location && location.chartData ? location.chartData : undefined;
  tableData = location && location.tableData ? location.tableData : undefined;
  topRate = location && location.topRate ? location.topRate : undefined;

  if (location) {
    return (
  
      <div className="app-container">
        <TopRate topRate={topRate} size={size} />
        <Map handleClick={handleClick} mapData={mapData} size={size} />
        <div className="app-endPart"></div>
        <div className="chartAndTableParent" style={{ height: size.height }}>
          <Chart chartData={chartData} topRate={topRate} />
          <TableCo tableData={tableData} />
        </div>

        <div className="app-endPart"></div>
        <Related />
        <div className="app-endPart"></div>
      </div>
    );
  } else {
    return (
   
        <UncontrolledLottie size={size} />
    
    );
  }
}

export default App;
