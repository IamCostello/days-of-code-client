import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface AddFormProps {
  onSubmit: (url: string, tag: string) => void;
  tags: string[];
}

type AddFormInputs = {
  url: string;
  tag: string;
};

export const AddForm: FC<AddFormProps> = ({ onSubmit, tags }) => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    reset,
  } = useForm<AddFormInputs>();

  return (
    <Stack spacing={4} p={2}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data.url, data.tag);
          reset();
        })}
      >
        <FormControl>
          <FormLabel>Article url</FormLabel>
          <Input name="url" type="url" ref={register({ required: true })} />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl pt={2}>
          <FormLabel>Article tag</FormLabel>
          <Select name="tag" ref={register}>
            <option>none</option>
            {tags.map((tag) => (
              <option key={tag}>{tag}</option>
            ))}
          </Select>
        </FormControl>
        <Button w="100%" type="submit" mt={4} colorScheme="green">
          Submit
        </Button>
      </form>
    </Stack>
  );
};
