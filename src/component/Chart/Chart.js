import React from "react";
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

export default function Chart(props) {
  const data = [];
  const countryCode = Object.keys(props.chartData);
  const confirmedValue = Object.values(props.chartData);

  let dates = confirmedValue[0];
  if (!dates) {
    return null;
  }
  let datesFinal = Object.keys(dates);
  let sumOfVal = 0;

  for (let d = 0; d < datesFinal.length; d++) {
    for (let v = 0; v < confirmedValue.length; v++) {
      sumOfVal += props.chartData[countryCode[v]][datesFinal[d]];
    }
    let subString = datesFinal[d].substr(5, 5);
    const SubData = {
      x: subString,
      y: sumOfVal
    };
    data.push(SubData);
    sumOfVal = 0;
  }

  const countryData = props.chartData["US"];
  if (!countryData) {
    return null;
  }

  const xs = Object.keys(countryData);

  return (
    <div className="test">
      <div className="title">Number Of Confirmed All Over The World</div>

      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={<VictoryContainer responsive={true} />}
        padding={40}
        animate={{ duration: 2000 }}
        width={600}
        height={200}
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
        <VictoryLine data={data} />
      </VictoryChart>
    </div>
  );
}
