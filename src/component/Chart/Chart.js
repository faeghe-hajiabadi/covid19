import React, { useState, useEffect } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import "./chart.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import GraphTooltip from './GraphTooltip'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function convertChartDataToGeneralChartData(chartData) {
  var generalChartData = [];

  const countryCodeList = Object.keys(chartData);
  const confirmedValuesList = Object.values(chartData);

  let firstConfirmedValues = confirmedValuesList[0];
  if (!firstConfirmedValues) {
    return generalChartData;
  }
  let dateList = Object.keys(firstConfirmedValues);

  for (let dayIndex = 0; dayIndex < dateList.length; dayIndex++) {
    let totalConfirmedValue = 0;
    for (
      let countryCodeIndex = 0;
      countryCodeIndex < countryCodeList.length;
      countryCodeIndex++
    ) {
      totalConfirmedValue +=
        chartData[countryCodeList[countryCodeIndex]][dateList[dayIndex]];
    }
    let subString = dateList[dayIndex].substr(5, 5); // Parse Date to [month-year]

    generalChartData.push({
      x: subString,
      y: totalConfirmedValue,
    });
  }

  return generalChartData;
}
function convertChartDataToSingleCountryData(countryCode, chartData) {
  let singleChartData = [];

  if (!countryCode || !chartData) {
    return singleChartData;
  }

  const dates = Object.keys(chartData[countryCode]);
  for (let i = 0; i < dates.length; i++) {
    let countryConfirmedValue = chartData[countryCode][dates[i]];
    const SubData = {
      x: dates[i].substr(5, 5),
      y: countryConfirmedValue,
    };
    singleChartData.push(SubData);
  }
  return singleChartData;
}
const INIT_STATE = {
  generalChartData: [],
  singleCountryChartData: [],
  selectedCountry: null,
};

export default function Chart(props) {
  const classes = useStyles();
  const [data, setdata] = useState(INIT_STATE);

  useEffect(() => {
    if (!props) {
      return;
    }
    setdata({
      ...INIT_STATE,
      generalChartData: convertChartDataToGeneralChartData(props.chartData),
      singleCountryChartData: [],
    });
  }, []);

  const handleChange = (newValue) => {
    setdata({
      ...data,
      selectedCountry: newValue,
      singleCountryChartData: convertChartDataToSingleCountryData(
        newValue,
        props.chartData
      ),
    });
  };
  const setdataToGeneral = () => {
    setdata({
      ...INIT_STATE,
      generalChartData: convertChartDataToGeneralChartData(props.chartData),
      singleCountryChartData: [],
    });
  };

  return (
    <div className="test">
      <div className="filterButtons-container">
        <div className="filterButton-title">
          <div>Confirmed Cases Per Day Chart</div>
        </div>

        <div className='autocomplete'>
          <Autocomplete
            id="combo-box-demo"
            options={Object.keys(props.chartData)}
            style={{ width: 300 }}
            onChange={(event, value) => handleChange(value)}
            renderInput={(params) => (
              <TextField {...params} label="All" variant="outlined" />
            )}
          />
        </div>
      </div>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={<VictoryContainer responsive={true} />}
        animate={{ duration: 2000 }}
        width={400}
        height={250}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={() => ''}
            labelComponent={<VictoryTooltip flyoutComponent={<GraphTooltip/>}/>}
            // labels={({ datum }) => ` ${datum.x}
            //  ${datum.y}`}
            // labelComponent={
            //   <VictoryTooltip
            //     flyoutStyle={{
            //       stroke: "none",
            //       fill: "#6C75CA",
            //     }}
            //     style={{ fontSize: 8 ,fontFamily:'Source Sans Pro', fill: "white", backgroundColor: "#A1AAFF" }}
            //     cornerRadius={2}
            //     dy={0}
            //     size="8"
            //     flyoutHeight={30}
            //     flyoutWidth={120}
            //     pointerWidth={10}
            //     centerOffset={{ x: 15 }}
            //   />
            // }
          />
        }
      >
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "#F0F3F8" },
            axisLabel: { fontSize: 5 },
            ticks: { stroke: "#C0C5D6", size: 3 },
            tickLabels: { fontSize: 5, stroke: "989EBB" },
            grid: { stroke: "#DFE0E9" },
          }}
          standalone={false}
        />
        {/* X Axis */}
        <VictoryAxis
          fixLabelOverlap={true}
          label=""
          style={{
            axis: { stroke: "#C0C5D6" },
            axisLabel: { fontSize: 8, padding: 30 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 6 , paddingTop:10, angle: 120 },
          }}
          axisLabelComponent={<VictoryLabel />}
        />
        <VictoryLine
          interpolation="natural"
          data={
            data.selectedCountry
              ? data.singleCountryChartData
              : data.generalChartData
          }
          style={{
            data: { stroke: "#6571C9", strokeWidth: 1, strokeLinecap: "round" },
            parent: { border: "1px solid #ccc" },
          }}
        />
      </VictoryChart>
    </div>
  );
}
