import { Flex } from "@chakra-ui/layout";
import React, { FC } from "react";
import { Header } from "../components/sections/Header";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = ({}) => {
  return (
    <Flex direction="column">
      <Header />
    </Flex>
  );
};
