import Link from 'next/link';
import React, { Fragment } from 'react';

const Home = () => (
  <Fragment>
    <p>Home</p>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
  </Fragment>
);

export default Home;
