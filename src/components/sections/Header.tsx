import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Link } from "react-router-dom";
import React, { FC, useContext } from "react";

import { auth } from "../../config/firebase";
import { AuthContext } from "../../context/auth";
import { useColorModeValue } from "@chakra-ui/react";

interface HeaderProps {
  dashboard?: boolean;
  onDrawerToggle: () => void;
  drawerState: boolean;
}

export const Header: FC<HeaderProps> = ({
  dashboard,
  onDrawerToggle,
  drawerState,
}) => {
  const [user, loading] = useContext(AuthContext);
  const colorMode = useColorModeValue("white", "gray.800");

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Flex
      shadow="base"
      as="nav"
      justify="space-between"
      w="100%"
      h="80px"
      align="center"
      px={4}
      position="fixed"
      backgroundColor={colorMode}
      zIndex="10"
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
                  <MenuItem
                    onClick={() => {
                      if (!drawerState) {
                        onDrawerToggle();
                      }
                    }}
                  >
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/signin">Login</Link>
          ))}
      </Box>
    </Flex>
  );
};
