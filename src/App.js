import React, { useState, useEffect } from "react";

import "./App.css";
import Map from "./component/Map/Map";
import { url } from "./api/utilities";
import fetchData from "./api/fetchData";
import Chart from "./component/Chart/Chart";
import TableCo from "./component/Table/Table";
import Related from "./component/Related/Related";

import TopRate from "./component/TopRate/TopRate";
import UncontrolledLottie from "./component/UncontrolledLottie";
import ReactPageScroller from "react-page-scroller";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { useWindowSize } from "./component/hooks/useWindowSize";

const handleClick = (e, countryCode) => {};

function App() {
  const [location, setLocation] = useState();
  const [count, setCount] = useState(0);
  const size = useWindowSize();
  const [currentPage, setCurrentPage] = useState(0);

  let mapData = {};
  let chartData = {};
  let tableData = [];
  let topRate = [];

  const handlePageChange = (number) => {
    setCurrentPage(number); // set currentPage number, to reset it from the previous selected.
  };

  useEffect(() => {
    const resultFetch = fetchData(url).then((res) => setLocation(res));
  }, [count]);

  mapData = location && location.mapData ? location.mapData : undefined;
  chartData = location && location.chartData ? location.chartData : undefined;
  tableData = location && location.tableData ? location.tableData : undefined;
  topRate = location && location.topRate ? location.topRate : undefined;

  if (location) {
    if (isMobile) {
      return (
        <div>
          <div className="topRateAndMap">
            <TopRate topRate={topRate} size={size} />
            <Map handleClick={handleClick} mapData={mapData} size={size} />
          </div>

          <div className="chartAndTableParent" style={{ height: size.height }}>
            <Chart chartData={chartData} topRate={topRate} />
            <TableCo tableData={tableData} />
          </div>
          <div className="relatedApp">
            <Related />
          </div>
        </div>
      );
    }
    return (
      <div className="app-container">
        <ReactPageScroller
          pageOnChange={handlePageChange}
          customPageNumber={currentPage}
        >
          <div className="topRateAndMap">
            <TopRate topRate={topRate} size={size} />
            <Map handleClick={handleClick} mapData={mapData} size={size} />
          </div>

          <div className="chartAndTableParent" style={{ height: size.height }}>
            <Chart chartData={chartData} topRate={topRate} />
            <TableCo tableData={tableData} />
          </div>
          <div className="relatedApp">
            <Related />
          </div>
        </ReactPageScroller>
      </div>
    );
  } else {
    return <UncontrolledLottie size={size} />;
  }
}

export default App;
