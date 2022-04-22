import React, { useEffect } from "react";
import config from "../utils/config";
import { getUserProfile } from "../utils/fetchApi";
import { useDispatch } from "react-redux";
import { login } from "../utils/authSlice";
import { useHistory } from "react-router-dom";
import { Link, Button, Flex, Heading, Image } from '@chakra-ui/react';

export default function Login() {
    const dispatch = useDispatch<any>();
    const history = useHistory<any>();
  
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
            history.push("/create-playlist");
          } catch (e) {
            alert(e);
          }
        };
        setUserProfile();
      }
    }, []);
  
    const getSpotifyLinkAuthorize: () => string = () => {
      const state = Date.now().toString();
      // eslint-disable-next-line no-undef
      const clientId = process.env.REACT_APP_SPOTIFY_KEY;
  
      return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };
  
    return (
      <Flex 
        justifyContent="center" 
        alignItems="center" h="calc(100vh - 80px)"
      > 
      <Flex 
        flexDir="column"
        width="auto"
        alignItems="center"
      >
      <Image 
        borderRadius="full" 
        boxSize="100px" 
        objectFit="cover" 
        src="https://www.protocol.com/media-library/spotify.png?id=29171621&width=1245&quality=85&coordinates=0%2C0%2C0%2C0&height=700"
      />   
      <Heading mb={4}>Welcome to Spotify Music</Heading> 
        <Link href={getSpotifyLinkAuthorize()}>
          <Button 
             type="submit" 
             size="lg" 
             colorScheme="green"
             border="2px"
          >
            Login Spotify
          </Button>
        </Link>
     
        </Flex>
      </Flex>
     
    );
  }