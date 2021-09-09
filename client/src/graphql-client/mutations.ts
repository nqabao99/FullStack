import { gql } from "@apollo/client";

export const registerMutation = gql`
  mutation Regiter($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      code
      sussess
      message
      user {
        id
        username
        email
      }
      errors {
        field
        message
      }
    }
  }
`;
