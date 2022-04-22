import React, { useState } from "react";
import { RootState, useAppSelector } from "../store/Hooks";
import { addTracksToPlaylist, createPlaylist } from "../utils/fetchApi";
import { Box, FormControl, FormLabel, Heading, Input, Textarea, Button, FormHelperText } from '@chakra-ui/react';


interface FromProps {
    uris: string[];
}
interface FromState {
    title: string;
    description: string;
}

// eslint-disable-next-line react/prop-types
const FormPlaylist: React.FC<FromProps> = ({ uris }) => {
    const [playlist, setPlaylist] = useState<FromState>({
        title: "",
        description: "",
    });

    const accessToken: string = useAppSelector((state: RootState) => state.auth.accessToken);
    const userId: string = useAppSelector((state: RootState) => state.auth.user.id);

    const handleChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLTextAreaElement;
        const { name, value } = target;

        setPlaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            alert("Title must be at least 10 characters ");
        }
    };

    return (
        <Box width='100%' borderWidth='1px' borderRadius='lg' overflow='hidden' p={4}>
         <Heading my={4}>Create Playlist</Heading>
          <form className="form" onSubmit={handleSubmit}>
            <FormControl mt={2}>
               <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    value={playlist.title}
                    onChange={handleChange}
                    required
                />
                <FormHelperText>Title at least 10 characters</FormHelperText>
            </FormControl>
            <FormControl mt={3}>
               <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                    id="desc"
                    name="description"
                    value={playlist.description}
                    onChange={handleChange}
                    resize="none"
                    required
                ></Textarea>
            </FormControl>
            <FormControl mt={4}>
            <Button 
               type="submit"
               colorScheme="teal"
               borderRadius="md"
               color="white"_hover={{ cursor: "pointer"}}
            >
                Submit
            </Button>
            </FormControl>
        </form>
    </Box>
 );
}
export default FormPlaylist;