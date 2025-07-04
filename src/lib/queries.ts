import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int, $category: String) {
    products(first: $first, category: $category) {
      id
      name
      category
      description {
        plainText
        html
      }
      specifications {
        wattage
        dimensions
        weight
      }
      features {
        plainText
        html
      }
      images {
        id
        url
        altText
        caption
      }
      variants {
        id
        name
        price
        currency
        stock
      }
      price
      currency
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String!) {
    searchProducts(query: $query) {
      id
      name
      category
      description {
        plainText
      }
      specifications {
        wattage
        dimensions
        weight
      }
      images {
        id
        url
        altText
      }
      price
      currency
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      category
      description {
        plainText
        html
      }
      specifications {
        wattage
        dimensions
        weight
      }
      features {
        plainText
        html
      }
      images {
        id
        url
        altText
        caption
      }
      variants {
        id
        name
        price
        currency
        stock
      }
      price
      currency
    }
  }
`;
