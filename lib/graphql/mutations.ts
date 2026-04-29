import { gql } from '@apollo/client';

export const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($input: CheckoutInput!) {
    checkout(input: $input) {
      clientMutationId
      order {
        id
        databaseId
        orderNumber
        status
      }
      result
      redirect
      # Campos personalizados si se usa Cardinal
      cardinal {
        jwt
        acsUrl
        payload
        transactionId
      }
    }
  }
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation UPDATE_ORDER_MUTATION($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      order {
        id
        status
      }
    }
  }
`;
