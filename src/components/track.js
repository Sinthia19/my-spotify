import React from 'react'
import TrackList from "../components/TrackList";


const Track = ( { data } ) => {
  return (
          <div className="Track">
            <div className="track-list">
              {data.map((track, index) => (
                <TrackList
                  key={index}
                  source={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  album={track.album.name} 
                />
              ))}
            </div>
          </div>
        );
}
export default Track;