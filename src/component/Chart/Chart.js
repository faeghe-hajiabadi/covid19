import React, { useState, useEffect } from "react";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import "./chart.scss";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
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
      y: totalConfirmedValue
    });
    // if(dayIndex < dateList.length)
  }
  chartHeight = generalChartData[dateList.length-1].y * .00015
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
      y: countryConfirmedValue
    };
    singleChartData.push(SubData);
  }

  return singleChartData;
}
const INIT_STATE = {
  generalChartData: [],
  singleCountryChartData: [],
  selectedCountry: null
};
let chartHeight = 300;


export default function Chart(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [data, setdata] = useState(INIT_STATE);

  useEffect(() => {
    console.log("props", props);
    if (!props) {
      return;
    }
    setdata({
      ...INIT_STATE,
      generalChartData: convertChartDataToGeneralChartData(props.chartData),
      singleCountryChartData: []
    });
  }, []);

  const handleChange = event => {
    event.preventDefault();
    setdata({
      ...data,
      selectedCountry: event.target.value,
      singleCountryChartData: convertChartDataToSingleCountryData(
        event.target.value,
        props.chartData
      )
    });
    // convertChartDataToSingleCountryData(event.target, props.chartData);
  };
  const setdataToGeneral = () => {
    setdata({
      ...INIT_STATE,
      generalChartData: convertChartDataToGeneralChartData(props.chartData),
      singleCountryChartData: []
    });
  };

  console.log("data before render", data.generalChartData);
  
  return (
    <div className="test">
      <div className="title">Number Of Confirmed All Over The World</div>
      <div className="filterButtons">
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={setdataToGeneral}
          >
            All{" "}
          </Button>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              value={data.selectedCountry}
              onChange={handleChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {Object.keys(props.chartData).map(name => (
                <MenuItem
                  key={name}
                  value={name}
                  // style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={<VictoryContainer responsive={true} />}
        padding={40}
        animate={{ duration: 2000 }}
        width={600}
        height={chartHeight}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `y: ${datum.y}`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                size="8"
                flyoutStyle={{ fill: "white" }}
              />
            }
          />
        }
      >
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 5, padding: 30 },
            ticks: { stroke: "grey", size: 3 },
            tickLabels: { fontSize: 5, padding: 5 }
          }}
          standalone={false}
        />
        {/* X Axis */}
        <VictoryAxis
          label="Confirmed number / Date"
          style={{
            axis: { stroke: "#756f6a" },
            axisLabel: { fontSize: 5, padding: 30 },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 5, padding: 10, angle: 90 }
          }}
          axisLabelComponent={<VictoryLabel />}
        />
        <VictoryLine
          data={
            data.selectedCountry
              ? data.singleCountryChartData
              : data.generalChartData
          }
        />
      </VictoryChart>
    </div>
  );
}
