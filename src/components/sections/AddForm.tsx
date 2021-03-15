import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { createArticle, SavedData } from "../../api/articles";

interface AddFormProps {
  onSubmit: (url: string, tag: string) => void;
}

type AddFormInputs = {
  url: string;
  tag: string;
};

export const AddForm: FC<AddFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    reset,
  } = useForm<AddFormInputs>();
  // const onSubmit = (data: any) => console.log(data);

  return (
    <Stack spacing={4} p={2}>
      <form onSubmit={handleSubmit((data) => onSubmit(data.url, data.tag))}>
        <FormControl>
          <FormLabel>Article url</FormLabel>
          <Input name="url" type="url" ref={register({ required: true })} />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Article tag</FormLabel>
          <Select name="tag" ref={register}>
            <option>none</option>
            <option>React</option>
            <option>Python</option>
          </Select>
        </FormControl>
        <Button w="100%" type="submit" mt={4} colorScheme="green">
          Submit
        </Button>
      </form>
    </Stack>
  );
};
