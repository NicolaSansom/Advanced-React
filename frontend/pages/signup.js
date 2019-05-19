import React from 'react';
import styled from 'styled-components';
import Join from '../components/Join';
import SignIn from '../components/SignIn';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignUp = () => (
  <Columns>
    <Join />
    <SignIn />
  </Columns>
);

export default SignUp;