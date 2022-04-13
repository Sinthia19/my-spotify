import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addTracksToPlaylist, createPlaylist } from "../utils/fetchApi";
import { Container, Typography } from "@mui/material";
import {  TextField } from '@mui/material';
import { Button } from '@mui/material';


// eslint-disable-next-line react/prop-types
export default function FormPlaylist({ uris }) {
    const [playlist, setPlaylist] = useState({
        title: "",
        description: "",
    });

    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user.id);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (playlist.title.length > 10) {
            try {
                const responsePlaylist = await createPlaylist(
                    accessToken,
                    userId,
                    {
                        name: playlist.title,
                        description: playlist.description,
                    }
                );

                await addTracksToPlaylist(
                    accessToken,
                    responsePlaylist.id,
                    uris
                );

                setPlaylist({
                    title: "",
                    description: "",
                });
                alert("Playlist created successfully!");
            } catch (e) {
                alert(e);
            }
        } else {
            alert("Title must be at least 10 characters long.");
        }
    };
    const formStyle = {margin : "10px 10px"}
    return (
        <Container>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h2"
              gutterBottom
              >
                  Create a New Playlist
              </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} style={formStyle}>
                  <TextField
                    id="title"
                    onChange={handleChange}
                    value={playlist.title}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <TextField
                    id="desc"
                    onChange={handleChange}
                    value={playlist.description}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    required
                  />
                <Button style={formStyle}
                  type="submit"
                  variant="contained"
                  size="small">
                      Submit
                  </Button> 
            </form>
            </Container>
          );
        }

    