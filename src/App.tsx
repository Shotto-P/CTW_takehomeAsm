import React from 'react';
import {
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Picture from './components/Picture';
import Form from './components/Form';

function App() {
  return (
    <>
      <Grid 
        templateColumns='repeat(4 ,1fr)'
        gap={2}
        h='100%'
      >
        <GridItem>
          <Picture />
        </GridItem>
        <GridItem colSpan={3} mr={5}>
          <Form />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
