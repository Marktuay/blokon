import { gql } from '@apollo/client';

export const CART_FRAGMENT = gql`
  fragment CartFragment on Cart {
    contents {
      itemCount
      nodes {
        key
        quantity
        total
        subtotal
        product {
          node {
            id
            databaseId
            name
            slug
            type
            ... on SimpleProduct {
              price
              regularPrice
              image {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
    total
    subtotal
    totalTax
    feeTotal
    discountTotal
  }
`;

export const GET_CART_QUERY = gql`
  query GetCart {
    cart {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        ...CartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const REMOVE_ITEMS_FROM_CART_MUTATION = gql`
  mutation RemoveItemsFromCart($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cart {
        ...CartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const UPDATE_ITEM_QUANTITIES_MUTATION = gql`
  mutation UpdateItemQuantities($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      cart {
        ...CartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;
