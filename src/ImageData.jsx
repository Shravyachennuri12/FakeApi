import React from 'react';
import './App.css'; 

const ImageData = ({ imageDetails }) => {
  return (
    <div className="image-container">
      <img
        src={imageDetails.image_link}
        alt={imageDetails.name}
        className="image-size"
      />
      <h3>{imageDetails.name}</h3>
      <p>{imageDetails.brand}</p>
    </div>
  );
};

export default ImageData;
