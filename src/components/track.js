import React, { useState } from 'react'


function Track({ data }) {
const [active, setActive] = useState(null)  

  return (
    <div className="App">
    {data.map((track, index) => (
    <div className="playlist" key={index}>
    <img src = {track.album.images[1].url}></img>
    <h1>{track.name}</h1>
    <h3>{track.artists[0].name} - {track.album.name}</h3>
    <button type="submit" onClick={() => setActive(!active)}>{ active ? 'Deselect' : 'Select'}</button>
    </div>
))}
  </div>  
  );
}

export default Track

