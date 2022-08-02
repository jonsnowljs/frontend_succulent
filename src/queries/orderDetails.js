import { gql } from "@apollo/client";

const ORDER_DETAILS = gql`
  query getProducts {
    products {
      id
      name
      description
      priceList {
        price
      }
    }
  }
`;

const GET_ORDERS = gql`
  query getOrders {
    orders{
      id
      orderDate
      orderStatus
    }
  }
`
export { ORDER_DETAILS, GET_ORDERS };
