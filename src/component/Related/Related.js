import React from "react";
import RelatedItems from "./RelatedItems";
import who from "./img/who.png";
import mayo from './img/mayo.svg'
import jhu from './img/jhu.png'

export default function Related() {
  return (
    <div className="relatedParent">
      <div>Related Websites For Read More</div>
      <div className="related-box">
        <RelatedItems
          url={
            "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/"
          }
          imgSrc={who}
          name={"WHO"}
          description={"world health organization"}
        />
        <RelatedItems
          url={
            "https://www.mayoclinic.org/diseases-conditions/coronavirus/symptoms-causes/syc-20479963"
          }
          imgSrc={mayo}
          name={"MAYO"}
          description={"Mayo Clinic's Coronavirus resource page"}
        />
        <RelatedItems
          url={
            "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
          }
          imgSrc={jhu}
          name={"JHU"}
          description={"Johns Hopkins University "}
        />
      </div>
    </div>
  );
}
