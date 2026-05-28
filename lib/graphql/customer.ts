import { gql } from '@apollo/client';

export const GET_CUSTOMER_QUERY = gql`
  query GetCustomer {
    customer {
      databaseId
      username
      firstName
      lastName
      email
      billing {
        firstName
        lastName
        company
        address1
        address2
        city
        state
        postcode
        country
        email
        phone
      }
      shipping {
        firstName
        lastName
        company
        address1
        address2
        city
        state
        postcode
        country
      }
      orders(first: 20) {
        nodes {
          databaseId
          orderNumber
          date
          status
          total
          lineItems {
            nodes {
              product {
                node {
                  name
                  image {
                    sourceUrl
                  }
                }
              }
              quantity
              total
            }
          }
        }
      }
    }
  }
`;
