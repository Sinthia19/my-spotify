import React from 'react'

function Track({ data }) {
  return (
    <div className="App">
    {data.map((track, index) => (
    <div className="playlist">
    <img src = {track.album.images[1].url}></img>
    <h1>{track.name}</h1>
    <h3>{track.artists[0].name} - {track.album.name}</h3>
    <button className="btn btn-primary">PLAY</button>
    </div>
))}
  </div>  
  );
}

export default Track