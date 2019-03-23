import React from 'react';
import SingleItem from '../components/SingleItem';

const Item = props => (
  <div>
    <p>Single Item</p>
    <SingleItem id={props.query.id} />
  </div>
);

export default Item;
