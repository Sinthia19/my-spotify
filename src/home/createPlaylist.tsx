import React, { useEffect, useState } from 'react';
import Track from '../components/Track';
import SearchBar from '../components/Search';
import FormPlaylist from '../components/Form';
import { Box } from "@chakra-ui/react"

// interface for the functional components
const CreatePlaylist: React.FC = () => {
    const [tracks, setTracks] = useState<any[]>([]);
    const [selectedTrackURI, setSelectedTrackURI] = useState<string[]>([]);
    const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
    const [isSearch, setIsSearch] = useState<boolean>(false);
  
    useEffect(() => {
      if (!isSearch) {
        const selectedTracks: any[] = filterSelectedTracks();
  
        setTracks(selectedTracks);
      }
    }, [selectedTrackURI]);
  
    const filterSelectedTracks: () => any[] = () =>
    tracks.filter((track) => selectedTrackURI.includes(track.uri));
  
    const handleSuccessSearch: (searchTracks: any[]) => void = (searchTracks) => {
      setIsSearch(true);
  
      const selectedSearchTracks = searchTracks.filter((data: any) =>
      selectedTrackURI.includes(data.uri)
    );

    setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
  };
  
    const clearSearch: () => void = () => {
      setTracks(selectedTracks);
      setIsSearch(false);
    };
  
    const toggleSelect: (track: any) => void = (track) => {
      const { uri } = track;
  
      if (selectedTrackURI.includes(uri)) {
        setSelectedTrackURI(selectedTrackURI.filter((item: any) => item !== uri));
        setSelectedTracks(selectedTrackURI.filter((item: any) => item.uri !== uri));
      } else {
        setSelectedTrackURI([...selectedTrackURI, uri]);
        setSelectedTracks([...selectedTracks, track]);
      }
    };
  
    return (
      <Box>
      <div className="container-form">
        <FormPlaylist uris={selectedTrackURI} />
        </div>
        <div className="container-track">
        <SearchBar
          onSuccess={(tracks) => handleSuccessSearch(tracks)}
          onClearSearch={clearSearch}
        />
        {tracks.length === 0 && <p>No tracks</p>}
        <div className="track-list">
          {tracks.map((track) => (
            <Track
              key={track.id}
              url={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              select={selectedTrackURI.includes(track.uri)}
              toggle={() => toggleSelect(track)}
              duration_ms={track.duration_ms}
            />
          ))}
          </div>
        </div>
      </Box>
    );
  }
  export default CreatePlaylist;