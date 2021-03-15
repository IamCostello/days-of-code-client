import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Stack } from "@chakra-ui/layout";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";

interface ArticleProps {
  articleUrl: string;
  archived: boolean;
  onUpdate: (articleId: string, newUrl: string) => void;
  onDelete: (articleId: string) => void;
  id: string;
}

interface ArticleControlsProps {
  isEditing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

const ArticleControls: FC<ArticleControlsProps> = ({
  isEditing,
  onSubmit,
  onCancel,
  onEdit,
}) => {
  return isEditing ? (
    <ButtonGroup justifyContent="center" size="md">
      <IconButton
        aria-label="Submit"
        icon={<CheckIcon />}
        onClick={onSubmit}
        colorScheme="green"
      />
      <IconButton aria-label="Cancel" icon={<CloseIcon />} onClick={onCancel} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        size="md"
        aria-label="Edit"
        icon={<EditIcon />}
        onClick={onEdit}
        colorScheme="yellow"
        backgroundColor="yellow.400"
      />
    </Flex>
  );
};

export const Article: FC<ArticleProps> = ({
  onUpdate,
  archived,
  articleUrl,
  onDelete,
  id,
}) => {
  const colorMode = useColorModeValue("white", "gray.800");
  const inputColor = useColorModeValue("gray.50", "gray.900");
  const [baseUrl, setBaseUrl] = useState(articleUrl);
  const [editing, setEditiing] = useState(false);
  const [url, setUrl] = useState(articleUrl);

  const handleOnSubmit = () => {
    onUpdate(id, url);
    // alert(url);
    setBaseUrl(url);
    setEditiing(false);
  };

  const handleOnCancel = () => {
    setUrl(baseUrl);
    setEditiing(false);
  };

  const handleOnInputChange = (event: string) => {
    setUrl(event);
    console.log(event);
  };

  const handleEditing = () => {
    setEditiing(true);
  };

  return (
    <Flex
      maxWidth="100%"
      justify="space-between"
      padding={4}
      m={2}
      borderRadius={12}
      align="center"
      shadow="lg"
      backgroundColor={colorMode}
    >
      <Editable
        value={url}
        isPreviewFocusable={editing}
        isDisabled={!editing}
        submitOnBlur={false}
        fontSize="xl"
        onSubmit={handleOnSubmit}
        onChange={(event) => handleOnInputChange(event)}
        w="100%"
        // wordBreak="break-word"
        overflow="hidden"
        selectAllOnFocus
        backgroundColor={inputColor}
        borderRadius={8}
        py="2px"
        // paddingStart={2}
        shadow="inner"
      >
        {/* <Flex direction="row" justifyContent="space-between" align="center"> */}
        <EditablePreview px={2} maxwidth="100%" />
        <EditableInput px={2} />
        {/* </Flex> */}
      </Editable>
      <Stack direction="row" paddingLeft={4}>
        <ArticleControls
          isEditing={editing}
          onSubmit={handleOnSubmit}
          onCancel={handleOnCancel}
          onEdit={handleEditing}
        />
        <IconButton
          size="md"
          aria-label="Delete"
          icon={<DeleteIcon />}
          onClick={() => onDelete(id)}
          colorScheme="red"
          backgroundColor="red.500"
          color="white"
        />
      </Stack>
    </Flex>
  );
};
