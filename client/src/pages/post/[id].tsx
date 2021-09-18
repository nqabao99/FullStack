import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import {
  PostDocument,
  PostIdsDocument,
  PostIdsQuery,
  PostQuery,
  usePostQuery,
} from "../../generated/graphql";
import { addApolloState, initializeApollo } from "../../lib/apolloClient.";
import { limit } from "../index";

const Post = () => {
  const router = useRouter();
  const { data, loading, error } = usePostQuery({
    variables: {
      id: router.query.id as string,
    },
  });

  if (error || !data?.post)
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error ? error.message : "Post nost found"}</AlertTitle>
        </Alert>
        <Box mt={4}>
          <NextLink href="/">
            <Button>Back to home page</Button>
          </NextLink>
        </Box>
      </Layout>
    );

  return (
    <Layout>
      {loading ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Heading md={4}>{data.post.title}</Heading>
          <Box md={4}>{data.post.text}</Box>
          <Flex>
            <NextLink href="/">
              <Button>Back to home page</Button>
            </NextLink>
          </Flex>
        </>
      )}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<PostIdsQuery>({
    query: PostIdsDocument,
    variables: { limit },
  });

  return {
    paths: data.posts!.paginatePosts.map((post) => ({
      params: { id: `${post.id}` },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { [key: string]: any },
  { id: string }
> = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query<PostQuery>({
    query: PostDocument,
    variables: { id: params?.id },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Post;
