import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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

const RemoveFromCart = ({ id }) => (
  <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id }}>
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
