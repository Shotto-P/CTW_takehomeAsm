import React from "react";
import { Box, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Box>
        <Heading lineHeight={2} size={"2xl"} display={"flex"} justifyContent={"center"}>
          Order Your Food
        </Heading>
      </Box>
    </>
  );
}
