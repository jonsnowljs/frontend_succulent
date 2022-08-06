import { gql } from "@apollo/client";

const GET_CUSTOMERS = gql`
   query getCustomers{
      customers{
        id
        email
        firstName
        lastName
        status
        role
        orders{
           id
           shippingAddress{
             firstName
             lastName
             apartment
             city
             country
             state
           }
           billingAddress{
             firstName
             lastName
             city
           }
           orderDate
           orderStatus
           productsInCart{
             qty
             price
             product{
               name
               description
               
             }
           }
        }
       addresses{
         firstName
         city
         lastName
       }
 creditCards{
   cardNo
   holderName
   expirationDate
 }
      }
   }
`
const GET_CUSTOMER = gql`
   query getCustomer($id: ID!){
      customer(id: $id){
         id
         email
         firstName
         lastName
         orders{
            id
            shippingAddress{
              firstName
              lastName
              apartment
              city
              country
              state
            }
            billingAddress{
              firstName
              lastName
              city
            }
            orderDate
            orderStatus
            productsInCart{
              qty
              price
              product{
                name
                description
                
              }
            }
         }
				addresses{
          firstName
          city
          lastName
        }
  creditCards{
    cardNo
    holderName
    expirationDate
  }
      }

   }
`;

const GET_ME = gql`
  query getMe{
    me {
      id
      email
      firstName
      lastName
      role
      phone
      orders{
        id
        shippingAddress{
          firstName
          lastName
          apartment
          city
          country
          state
        }
      }
    }
}`



export { GET_CUSTOMERS, GET_CUSTOMER, GET_ME };