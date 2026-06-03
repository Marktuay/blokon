import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($first: Int = 10, $after: String = "") {
    products(first: $first, after: $after) {
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        image {
          sourceUrl
          altText
        }
        ... on ProductWithAttributes {
          attributes {
            nodes {
              name
              options
              variation
              visible
            }
          }
        }
        ... on SimpleProduct {
          price
          regularPrice
        }
        ... on VariableProduct {
          price
          regularPrice
          variations(first: 50) {
            nodes {
              id
              databaseId
              name
              price
              regularPrice
              attributes {
                nodes {
                  name
                  value
                }
              }
              image {
                sourceUrl
              }
            }
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POSTS_QUERY = gql`
  query GetPosts($first: Int = 10, $after: String = "") {
    posts(first: $first, after: $after) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_SLUG_QUERY = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
`;
