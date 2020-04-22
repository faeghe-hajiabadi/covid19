import React from "react";
import "./related.scss";

export default function RelatedItems(props) {
  const { url, name, description,imgSrc } = props;
  return (
    <div className="relatedItemParent">
      <div className='relatedItemName'>{name}</div>
      <div className='relatedItemsDes'>{description}</div>
      <img className='relatedItemImg' width='90' height='90' src={imgSrc} alt='world health organization'></img>
      <a className = 'relatedItemLink' href={url}>Read More </a>
    </div>
  );
}
