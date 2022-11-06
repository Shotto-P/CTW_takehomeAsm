import * as React from 'react';
import * as ReactDOM from "react-dom";
import {
    Box,
} from '@chakra-ui/react';
import img from '../img/ctw.png';

export default function Picture(){
    return (
        <Box 
            bgImage={img}
            bgPosition={'center'}
            bgRepeat={'no-repeat'}
            bgSize={'cover'}
            h="99%"
            m={'5px'}
        />
    );
}
