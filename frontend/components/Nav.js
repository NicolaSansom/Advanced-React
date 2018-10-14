import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav>
    <Link href="/sell">
      <a>Sell</a>
    </Link>{' '}
    <Link href="/">
      <a>Home</a>
    </Link>
  </nav>
);

export default Nav;
