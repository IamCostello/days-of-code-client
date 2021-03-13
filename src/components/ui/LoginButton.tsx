import { Button } from "@chakra-ui/button";
import React, { FC, ReactElement } from "react";

interface LoginButtonProps {
  providerName: string;
  providerAction: () => void;
  providerIcon: ReactElement;
}

export const LoginButton: FC<LoginButtonProps> = ({
  providerAction,
  providerName,
  providerIcon,
}) => {
  return (
    <Button onClick={providerAction} leftIcon={providerIcon}>
      {providerName}
    </Button>
  );
};
