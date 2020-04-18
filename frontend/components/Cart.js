import React from 'react';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const Cart = () => (
  <CartStyles open>
    <header>
      <CloseButton title="close">&times;</CloseButton>
      <Supreme>Your cart</Supreme>
      <p>You have __ Items in your cart</p>
      <footer>
        <p>£10.00</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </header>
  </CartStyles>
);

export default Cart;
