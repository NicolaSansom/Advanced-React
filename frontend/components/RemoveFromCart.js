import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

// this gets called as soon as we get a respoinse back from the server after a mutation has been performed
const update = (cache, payload) => {
  //  first read the cache
  const data = cache.readQuery({ query: CURRENT_USER_QUERY });
  //  remove that item from the cart
  const cartItemId = payload.data.removeFromCart.id;
  data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
  // Write it back to the cache
  cache.writeQuery({ query: CURRENT_USER_QUERY, data });
};

const RemoveFromCart = ({ id }) => (
  <Mutation
    mutation={REMOVE_FROM_CART_MUTATION}
    variables={{ id }}
    update={update}
    optimisticResponse={{ __typename: 'Mutation', removeFromCart: { __typeName: 'CartItem', id } }}
  >
    {(removeFromCart, { error, loading }) => (
      <BigButton
        disabled={loading}
        onClick={() => {
          removeFromCart().catch(err => alert(err.message));
        }}
        title="Delete Item"
      >
        &times;
      </BigButton>
    )}
  </Mutation>
);

export default RemoveFromCart;
