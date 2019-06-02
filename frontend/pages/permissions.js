import React from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions';

const PermissionsPage = () => (
  <div>
    <PleaseSignIn>
      <Permissions />
      <p>Permissions!</p>
    </PleaseSignIn>
  </div>
);

export default PermissionsPage;
