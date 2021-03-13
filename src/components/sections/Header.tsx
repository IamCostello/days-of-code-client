import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuIcon,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import React, { FC, useContext, useState } from "react";
import axiosClient from "../../config/axios";
import { auth, providerGoogle } from "../../config/firebase";
import { AuthContext } from "../../context/auth";
import { StyleModeButton } from "../ui/StyleModeButton";

interface HeaderProps {
  dashboard?: boolean;
  onDrawerToggle?: () => void;
}

export const Header: FC<HeaderProps> = ({ dashboard, onDrawerToggle }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, loading] = useContext(AuthContext);

  const handleNewLogin = (token: string) => {
    axiosClient
      .post("/auth/signup", {}, { headers: { authtoken: token } })
      .then((response) => console.log(response));
  };

  const handleLoginWithGoogle = () => {
    return auth.signInWithPopup(providerGoogle).then((res) => {
      res.user?.getIdToken(true).then((r) => handleNewLogin(r));
    });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Flex
      shadow="base"
      as="nav"
      justify="space-between"
      w="100%"
      h="10vh"
      align="center"
      // marginBottom={8}
      px={4}
      py={8}
      // position="fixed"
    >
      <Box>
        {dashboard ? (
          <Button onClick={onDrawerToggle} variant="ghost">
            <HamburgerIcon />
          </Button>
        ) : (
          <Heading>Days of code</Heading>
        )}
      </Box>
      <Box>
        {!loading &&
          (user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  src={user.photoURL!}
                  name={user.displayName!}
                  size="md"
                />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <Link onClick={handleLoginWithGoogle}>Login</Link>
          ))}
        {/* <StyleModeButton /> */}
      </Box>
    </Flex>
  );
};
