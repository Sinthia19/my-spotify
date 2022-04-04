import React, { useState } from "react";

export default function TrackList({ source, title, artist, select, toggle }) {
  const [isSelected, setIsSelected] = useState(select);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    toggle();
  };

  return (
    <div className="card-playlist">
    <img src={source} />
    <h3>{title}</h3>
    <p>{artist}</p>
    <button
      className={`btn btn-select ${
        isSelected ? "btn-primary" : "btn-secondary"
      }`}
      onClick={handleSelect}
    >
      {isSelected ? "Deselect" : "Select"}
    </button>
  </div>
);
}

