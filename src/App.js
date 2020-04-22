import React, { useState, useEffect } from "react";

import "./App.css";
import Map from "./component/Map/Map";
import { url } from "./api/utilities";
import fetchData from "./api/fetchData";
import Chart from "./component/Chart/Chart";
import TableCo from "./component/Table/Table";
import Related from './component/Related/Related';
import Footer from "./component/Footer/Footer";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

const handleClick = (e, countryCode) => {};

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
      <div className="app-container">
        <Map handleClick={handleClick} mapData={mapData} />
        <Chart chartData={chartData} />
        <TableCo tableData={tableData} />
        <Related />
        <div className='app-endPart'></div>

      </div>
    );
  } else {
    return(
      <div className='loading-container'>
      <CircularProgress size={50} />

    </div> 
    );
    
  }
}

export default App;
