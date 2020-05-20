import React, { useState } from "react";
import RelatedItems from "./RelatedItems";
import who from "./img/who.png";
import mayo from "./img/mayo.svg";
import jhu from "./img/jhu.png";

export default function Related() {
  const itemsProperties = [
    {
      url:
        "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/",
      description: "world health organization",
      imgSrc: who,
    },
    {
      url:
        "https://www.mayoclinic.org/diseases-conditions/coronavirus/symptoms-causes/syc-20479963",
      description: "Mayo Clinic's Coronavirus resource page",
      imgSrc: mayo,
    },
    {
      url:
        "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",
      description: "Johns Hopkins University ",
      imgSrc: jhu,
    },
  ];
  const [hoverIndex, setHover] = useState(4);

  const onhoverTrigger = (index) => () => {
    setHover(index);
  };
  const relatedItemsList = itemsProperties.map((item, index) => {
    let isCollapse = index === hoverIndex ? true : false;

    return (
      <div className='relatedItem' onMouseEnter={onhoverTrigger(index)}>
        <RelatedItems
          url={item.url}
          imgSrc={item.imgSrc}
          description={item.description}
          imgHover={isCollapse}
        ></RelatedItems>
      </div>
    );
  });
  return (
    <div className="relatedParent">
      {relatedItemsList}
    </div>
  );
}
