import React, { useState } from "react";
import { useSelector } from "react-redux";
import { searchTrack } from "../utils/fetchApi";
import { RootState } from "../store/Hooks"
import { FormControl, Input, Button, Box, Heading } from '@chakra-ui/react'


interface SearchBarProps {
    onSuccess: (tracks: any[]) => void,
    onClearSearch: () => void,
}

const SearchBar: React.FC<SearchBarProps> = ({ onSuccess, onClearSearch }) => {
    const [text, setText] = useState<string>("");
    const accessToken: string = useSelector((state: RootState) => {
        return state.auth.accessToken;
    });

    const handleInput = (e: React.ChangeEvent) => {
        const target = e.target as HTMLTextAreaElement;
        setText(target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const responseSearch = await searchTrack(text, accessToken);
            const tracks = responseSearch.tracks.items;
            onSuccess(tracks);
        } catch (e) {
            alert(e);
        }
    };
    const clearSearch: () => void = () => {
        setText("");
        onClearSearch();
    };

    return (
        <Box width='100%' borderWidth='1px' borderRadius='lg' overflow='hidden' p={4}>
          <Heading my={4}>Search Playlist</Heading>
            <div className="search-wrapper">
              <form className="form" onSubmit={handleSubmit}>
                  <Input 
                    type='text'
                    name='query'
                    width='50%'
                    value={text}
                    placeholder='search...'
                    onChange={handleInput}
                    required
                   />
                <FormControl pos="relative">
                  <Button 
                    type="submit"
                    colorScheme='teal'
                    variant='solid'>
                      Search
                  </Button> 
                </FormControl>
            </form>
                <FormControl mt={4}>
                  <button className="btn btn-text" onClick={clearSearch}>
                     Clear Search
                  </button>
                </FormControl>
            </div>
        </Box>
    );
}
export default SearchBar;