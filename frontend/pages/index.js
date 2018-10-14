import Link from 'next/link';
import { Fragment } from 'react';

const Home = props => (
  <Fragment>
    <p>
      Home
    </p>
    <Link href="/sell"><a>Sell</a></Link>
  </Fragment>
);

export default Home;

