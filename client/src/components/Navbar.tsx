import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
const Navbar = () => {
  const { data, loading: useMeQueryLoading } = useMeQuery();
  const [logout, { loading: useLogoutMutationLoading }] = useLogoutMutation();
  const logoutUser = async () => {
    await logout({
      update(cache, { data }) {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: null },
          });
        }
      },
    });
  };
  let body;
  if (useMeQueryLoading) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <NextLink href="/create-post">
          <Button mr={4}>Create Post</Button>
        </NextLink>

        <Button onClick={logoutUser} isLoading={useLogoutMutationLoading}>
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Box bgGradient="linear(to-l, #7928CA,#FF0080)" p={4}>
      <Flex maxW={1000} justifyContent="space-between" m="auto" align="center">
        <NextLink href="/">
          <Heading>Reddit</Heading>
        </NextLink>
        <Box>{body}</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
