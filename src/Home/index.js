import React, { useEffect, useState } from "react";
import Track from "../component/Track";
import SearchBar from "../component/Search";
import config from "../utils/config";
import FormPlaylist from "../component/Form";
import { getUserProfile } from "../utils/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/authSlice";
import Auth from "./Auth";

export default function Home() {
    const [tracks, setTracks] = useState([]);
    const [selectedTrackURI, setSelectedTrackURI] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const accessTokenParams = params.get("#access_token");

        if (accessTokenParams !== null) {
            const setUserProfile = async () => {
                try {
                    const response = await getUserProfile(accessTokenParams);
                    dispatch(
                        login({
                            accessToken: accessTokenParams,
                            user: response,
                        })
                    );
                } catch (e) {
                    alert(e);
                }
            };
            setUserProfile();
        }
    }, []);

    useEffect(() => {
        if (!isSearch) {
            const selectedTracks = filterSelectedTracks();

            setTracks(selectedTracks);
        }
    }, [selectedTrackURI]);

    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_KEY

        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };

    const filterSelectedTracks = () => {
        return tracks.filter((track) => selectedTrackURI.includes(track.uri));
    };

    const handleSuccessSearch = (searchTracks) => {
        setIsSearch(true);

        const selectedSearchTracks = searchTracks.filter((data) =>
            selectedTrackURI.includes(data.uri)
        );

        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
    };

    const clearSearch = () => {
        setTracks(selectedTracks);
        setIsSearch(false);
    };

    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTrackURI.includes(uri)) {
            setSelectedTrackURI(
                selectedTrackURI.filter((item) => item !== uri)
            );
            setSelectedTracks(
                selectedTrackURI.filter((item) => item.uri !== uri)
            );
        } else {
            setSelectedTrackURI([...selectedTrackURI, uri]);
            setSelectedTracks([...selectedTracks, track]);
        }
    };

    return (
        <div className="container">
            {!isAuthorized && (
                <div className="login-app">
                        <Auth />
                </div>
            )}

            {isAuthorized && (
                <>
                    <FormPlaylist uris={selectedTrackURI} />
                    <hr />
                    <h3>Search Playlist</h3>
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
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}