import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";

const PostDeleteEditButon = () => {
  return (
    <Box>
      <IconButton icon={<EditIcon />} aria-lable="edit" mr={4} />
      <IconButton icon={<DeleteIcon />} aria-lable="delete" colorScheme="red" />
    </Box>
  );
};

export default PostDeleteEditButon;
