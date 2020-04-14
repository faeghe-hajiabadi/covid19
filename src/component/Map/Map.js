import React from "react";
import { VectorMap } from "react-jvectormap";

export default function Map(props) {
  return (
    <div>
      <VectorMap
        map={"world_mill"}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "520px"
        }}
        onRegionClick={props.handleClick} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer"
          },
          selected: {
            fill: "#2938bc" //color for the clicked country
          },
          selectedHover: {}
        }}
        regionsSelectable={true}
        onRegionTipShow={(e, el, code) => {
          const data = props.mapData[code];
          return el.html(
            "<b>" +
              el.html() +
              "</b></br>" +
              "<b> confirmed cases: </b>" +
              (data ? data : 0)
          );
        }}
        series={{
          regions: [
            {
              values: props.mapData, //this is your data
              scale: ["#FEE5D9", "#A50F15"], //your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
    </div>
  );
}
