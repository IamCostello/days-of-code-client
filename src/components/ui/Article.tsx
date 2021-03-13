import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Stack } from "@chakra-ui/layout";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useState } from "react";

interface ArticleProps {
  articleUrl: string;
  onUpdate: () => void;
  onDelete: () => void;
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
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton aria-label="Submit" icon={<CheckIcon />} onClick={onSubmit} />
      <IconButton aria-label="Cancel" icon={<CloseIcon />} onClick={onCancel} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        size="sm"
        aria-label="Edit"
        icon={<EditIcon />}
        onClick={onEdit}
      />
    </Flex>
  );
};

export const Article: FC<ArticleProps> = ({
  onUpdate,
  articleUrl,
  onDelete,
}) => {
  const [baseUrl, setBaseUrl] = useState(articleUrl);
  const [editing, setEditiing] = useState(false);
  const [url, setUrl] = useState(articleUrl);

  const handleOnSubmit = () => {
    // onUpdate();
    alert(url);
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
        wordBreak="break-word"
        selectAllOnFocus
      >
        <Flex direction="row" justifyContent="space-between" align="center">
          <EditablePreview paddingRight={4} maxwidth="100%" />
          <EditableInput paddingRight={4} />

          <Stack direction="row">
            <ArticleControls
              isEditing={editing}
              onSubmit={handleOnSubmit}
              onCancel={handleOnCancel}
              onEdit={handleEditing}
            />
            <IconButton
              size="sm"
              aria-label="Delete"
              icon={<DeleteIcon />}
              onClick={onDelete}
            />
          </Stack>
        </Flex>
      </Editable>
    </Flex>
  );
};
