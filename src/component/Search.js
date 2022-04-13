import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchTrack } from "../utils/fetchApi";
import {  TextField } from '@mui/material';
import { Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function SearchBar({ onSuccess, onClearSearch }) {
    const [text, setText] = useState("");
    const accessToken = useSelector((state) => state.auth.accessToken);

    const handleInput = (e) => {
        setText(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseSearch = await searchTrack(text, accessToken);
            const tracks = responseSearch.tracks.items;
            onSuccess(tracks);
        } catch (e) {
            alert(e);
        }
    };
    const clearSearch = () => {
        setText("");
        onClearSearch();
    };
    const buttonStyle = {margin : "5px 10px "}
    return (
        <div className="search-wrapper">
            <form className="form" onSubmit={handleSubmit}>
                    <TextField 
                        type="text"
                        name="query"
                        label="search..."
                        variant="outlined"
                        onChange={handleInput}
                        required
                        value={text}
                    />
                  <Button style={buttonStyle}
                    type="submit"
                    variant="contained"
                    size="small">
                      Search
                  </Button> 
            </form>
            <button className="btn btn-text" onClick={clearSearch}>
                Clear Search
            </button>
        </div>
         );
        }