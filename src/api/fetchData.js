async function fetchData(url) {
  const res = await fetch(url); //here we just connect to server
  const resJson = await res.json(); // read body response in asynch way
  console.log("from server", resJson);
  const mapData = {};
  const chartData = {};
  const tableData = [];
  let topRate = [];

  resJson.locations.forEach((item) => {
    fillMapData(mapData, item);
    fillChartData(chartData, item);
    fillTableData(tableData, item);
  });
  fillTopRateData(tableData, topRate);
  return { mapData, chartData, tableData, topRate };
}

function fillTopRateData(tableData, topRate) {
  let sortedLocations = tableData.sort(function (a, b) {
    return b.confirmed - a.confirmed;
  });

  topRate.push(
    sortedLocations[0],
    sortedLocations[1],
    sortedLocations[2],
    sortedLocations[3],
  );
}

function fillMapData(mapData, item) {
  if (mapData[item.country_code]) {
    mapData[item.country_code] += item.latest.confirmed;
  } else {
    mapData[item.country_code] = item.latest.confirmed;
  }
}

function fillChartData(chartData, item) {
  if (chartData[item.country_code]) {
    mergeTimeLines(
      chartData[item.country_code],
      item.timelines.confirmed.timeline
    );
  } else {
    chartData[item.country_code] = item.timelines.confirmed.timeline;
  }
}

function mergeTimeLines(firstTimeLine, secondTimeLine) {
  const keys = Object.keys(firstTimeLine);

  for (let i = 0; i < keys.length; i++) {
    firstTimeLine[keys[i]] += secondTimeLine[keys[i]];
  }
}
function mergeTableData(firstTableDataItem, secondTableDataItem) {
  // { contry="ann", death=123, confirmed=123 }
  firstTableDataItem.deaths += secondTableDataItem.deaths;
  firstTableDataItem.confirmed += secondTableDataItem.confirmed;
}

function fillTableData(tableData, item) {
  const result = search(tableData, item);
  if (result != -1) {
    mergeTableData(tableData[result], {
      country: item.country,
      confirmed: item.latest.confirmed,
      deaths: item.latest.deaths,
      timelines: item.timelines.confirmed.timeline,
    });
  } else {
    push(tableData, item);
  }
}

function push(tableData, item) {
  tableData.push({
    country: item.country,
    confirmed: item.latest.confirmed,
    deaths: item.latest.deaths,
    timelines: item.timelines.confirmed.timeline,
  });
}

function search(tableData, item) {
  for (let i = 0; i < tableData.length; i++) {
    if (tableData[i].country == item.country) {
      return i;
    }
  }
  return -1;
}

export default fetchData;
