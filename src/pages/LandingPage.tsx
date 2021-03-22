import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import {
  Button,
  Center,
  Fade,
  Input,
  Text,
  Image,
  useColorModeValue,
  useMediaQuery,
  MenuIcon,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import React, { FC, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { LoginButton } from "../components/ui/LoginButton";
import { StyleModeButton } from "../components/ui/StyleModeButton";
import axiosClient from "../config/axios";
import { auth, providerGoogle } from "../config/firebase";

interface LandingPageProps {}

enum Section {
  aboutMe = "aboutMe",
  aboutApp = "aboutApp",
  login = "login",
}

export const LandingPage: FC<LandingPageProps> = ({}) => {
  const [activeSection, setActiveSection] = useState<Section>(Section.aboutApp);
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isMobile] = useMediaQuery("(max-width: 425px)");
  const colorMode = useColorModeValue("white", "gray.800");
  const [showMenu, setShowMenu] = useState(false);

  const handleSwitchSection = (section: Section) => {
    setActiveSection(section);
    setShowMenu(false);
  };

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const handleNewLogin = (token: string) => {
    axiosClient.post("/auth/signup", {}, { headers: { authtoken: token } });
  };

  const handleLoginWithGoogle = () => {
    return auth.signInWithPopup(providerGoogle).then((res) => {
      res.user?.getIdToken(true).then((r) => handleNewLogin(r));
    });
  };

  return (
    <>
      <Flex
        p={4}
        as="nav"
        w="100%"
        // minH="80px"
        minH={isMobile ? "inherit" : "80px"}
        // align={isMobile ? "start" : "inherit"}
        // textAlign="center"
        // verticalAlign="center"
        // my="auto"
        position={isMobile ? "static" : "fixed"}
        // position={{ base: "fixed", small: "static" }}
        backgroundColor={colorMode}
        // direction="row"
        justifyContent="space-between"
        // verticalAlign="center"
        direction={["column", "row", "row", "row"]}
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          verticalAlign="center"
        >
          <Heading py={4} mt={2}>
            Days of Code
          </Heading>
          <Box mt={8}>
            {isMobile &&
              (showMenu ? (
                <IconButton
                  display={{ base: "block", md: "none" }}
                  as={CloseIcon}
                  aria-label="toggle menu"
                  onClick={handleMenuToggle}
                  size="xs"
                  backgroundColor={colorMode}
                />
              ) : (
                <IconButton
                  display={{ base: "block", md: "none" }}
                  as={HamburgerIcon}
                  aria-label="toggle menu"
                  onClick={handleMenuToggle}
                  size="xs"
                  backgroundColor={colorMode}
                />
              ))}
          </Box>
        </Flex>
        <Box
          display={{ base: showMenu ? "block" : "none", md: "block" }}
          py={4}
        >
          <Flex
            justify={[
              "center",
              "space-between",
              "space-between",
              "space-between",
            ]}
            direction={["column", "row", "row", "row"]}
          >
            <Button
              m={2}
              opacity={0.8}
              colorScheme={activeSection === Section.aboutApp ? "teal" : "gray"}
              backgroundColor={
                activeSection === Section.aboutApp ? "teal" : colorMode
              }
              onClick={() => handleSwitchSection(Section.aboutApp)}
            >
              How it works?
            </Button>
            <Button
              m={2}
              opacity={0.8}
              colorScheme={activeSection === Section.aboutMe ? "teal" : "gray"}
              backgroundColor={
                activeSection === Section.aboutMe ? "teal" : colorMode
              }
              onClick={() => handleSwitchSection(Section.aboutMe)}
            >
              About Me
            </Button>
            <Button
              m={2}
              colorScheme={activeSection === Section.login ? "teal" : "gray"}
              backgroundColor={
                activeSection === Section.login ? "teal" : colorMode
              }
              onClick={() => handleSwitchSection(Section.login)}
            >
              Login
            </Button>
            <StyleModeButton />
          </Flex>
        </Box>
      </Flex>
      <Stack
        direction={isLargerThan1024 ? "row" : "column"}
        h={isMobile ? "100%" : "100vh"}
        w="100%"
        pt={isMobile ? 0 : "80px"}
        px={8}
      >
        {activeSection === "login" ? (
          <Center w="100%" my="auto" mx={0} px={8}>
            <Stack>
              <Heading px={2}>Login to start your journey</Heading>
              <Text px={4}>Please select your login option</Text>
              <Divider />
              <LoginButton
                providerName="Google"
                providerAction={handleLoginWithGoogle}
                providerIcon={<FaGoogle />}
              />
            </Stack>
          </Center>
        ) : (
          <>
            <Box
              w={isLargerThan1024 ? "55%" : "100%"}
              h={isLargerThan1024 ? "100%" : "40%"}
            >
              <Center w="100%" h="100%" p="8">
                {activeSection === Section.aboutMe && (
                  <Fade in={true}>
                    <Heading pb={8} size="xl" lineHeight={1.2}>
                      Hi! My name is Costello
                    </Heading>
                    <Text fontSize={["lg", "lg", "2xl", "2xl"]}>
                      I am a senior year computer science student looking for
                      internship where I can leverage my skills and knowledge to
                      gain a better understanding of the fullstack developer
                      role.
                    </Text>
                  </Fade>
                )}
                {activeSection === Section.aboutApp && (
                  <Fade in={true}>
                    <Heading pb={8} size="xl" lineHeight={1.2}>
                      Your own "days of code" journey
                    </Heading>
                    <Text fontSize={["lg", "lg", "2xl", "2xl"]}>
                      Stay consistent by creating your own code challenges -
                      provide us with a list of URLs containing code problems or
                      a topic you wish to learn, and we'll send you one each
                      day.
                    </Text>
                  </Fade>
                )}
              </Center>
            </Box>
            <Box
              w={isLargerThan1024 ? "45%" : "100%"}
              h={isLargerThan1024 ? "100%" : "60%"}
              // backgroundColor={colorModeAccent}
              // backgroundColor="white"
              // backgroundColor={}
            >
              <Center w="100%" h="100%" p="8">
                {activeSection === Section.aboutMe && (
                  <Fade in={true}>
                    <Image
                      borderRadius={32}
                      // src={
                      //   "https://avatars.githubusercontent.com/u/28679660?s=400&u=3252b0ce10a2d6b64a809715b491fa71dfcb8d80&v=4"
                      // }
                      src={"https://i.imgur.com/6CJv0zv.jpg"}
                    />
                  </Fade>
                )}
                {activeSection === Section.aboutApp && (
                  <Fade in={true}>
                    <Image
                      borderRadius={32}
                      // src={
                      //   "https://avatars.githubusercontent.com/u/28679660?s=400&u=3252b0ce10a2d6b64a809715b491fa71dfcb8d80&v=4"
                      // }
                      src={"https://i.imgur.com/gdLI925.jpg"}
                    />
                  </Fade>
                )}
              </Center>
            </Box>
          </>
        )}
      </Stack>
    </>
  );
};
