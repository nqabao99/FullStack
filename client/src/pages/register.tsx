import { Button, FormControl, Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";

import { registerMutation } from "../graphql-client/mutations";
import { useMutation } from "@apollo/client";

const Register = () => {
  const initialValue: NewUserInput = { username: "", email: "", password: "" };

  interface UserMatationResponse {
    code: number;
    success: boolean;
    message: string;
    user: string;
    errors: string;
  }

  interface NewUserInput {
    username: string;
    email: string;
    password: string;
  }

  const [registerUser, { data, error }] = useMutation<
    { register: UserMatationResponse },
    { registerInput: NewUserInput }
  >(registerMutation);

  const onRegisterSubmit = (values: NewUserInput) => {
    registerUser({
      variables: {
        registerInput: values,
      },
    });
  };

  return (
    <Wrapper>
      {error && <p>Failed to regiter</p>}
      {data && data.register.success ? (
        <p>Register successfully {JSON.stringify(data)}</p>
      ) : null}
      <Formik initialValues={initialValue} onSubmit={onRegisterSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
                type="text"
              />
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="text"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                type="submit"
                colorScheme="teal"
                mt={4}
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
