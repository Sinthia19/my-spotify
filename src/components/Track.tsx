import React, { useState } from "react";
import { Button, Box, Flex, Image, Heading, Text, FormControl } from "@chakra-ui/react"
import { msToMinutesSecond } from "./trackFunction";
// eslint-disable-next-line react/prop-types

interface TracksTypes {
    url: string;
    title: string;
    artist: string;
    select: boolean;
    toggle: () => void;
    duration_ms: number;
}
const Track: React.FC<TracksTypes> = ({ url, title, artist, select, toggle, duration_ms: durationMs }) => { 
    const [isSelected, setIsSelected] = useState<boolean>(select); 
    const handleSelect: () => void = () => {
        setIsSelected(!isSelected);
        toggle();
      };

    return (
        <Box width='100%' borderWidth='1px' borderRadius='lg' overflow='hidden' p={4}>
            <Image 
              src={url} 
              alt="Track Playlist" 
              htmlWidth="100%" 
              borderRadius="lg" 
            />
        <Flex flexDir="column" mr="auto">
            <Heading size="md" mt={2}>{title}</Heading> 
            <Text fontSize="md" mt={2}>{artist}</Text>
            <Text fontSize="sm" color="tomato">{msToMinutesSecond(durationMs)}</Text>
        </Flex>
    
         <FormControl mt={2}>
            <Button
              colorScheme="green"
              variant="solid"
              className={`btn btn-select ${
                    isSelected ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleSelect}
            >
                {isSelected ? "Deselect" : "Select"}
            </Button>
          </FormControl>
        </Box>
    );
}
export default Track;