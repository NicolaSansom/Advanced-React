import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = ['ADMIN', 'USER', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE'];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => (
  <div>
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => (
        <div>
          <p>Hey!</p>
          <Error error={error} />
          <div>
            <h1>Manage Permissions</h1>
            <Table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  {possiblePermissions.map(permission => (
                    <th key={permission}>{permission}</th>
                  ))}
                  <th>👇</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <UsersPermissions key={user.id} user={user} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Query>
  </div>
);

const UsersPermissions = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map(permission => (
        <td key={permission}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              type="checkbox"
              checked={permissions.includes(permission)}
              value={permission}
              onChange={e => {
                const checkbox = e.target;
                // take copy of current permission
                let updatedPermissions = [...permissions];
                // figure out if we need to remove or add this permission
                if (checkbox.checked) {
                  // add it in!
                  updatedPermissions.push(checkbox.value);
                } else {
                  updatedPermissions = updatedPermissions.filter(
                    selectedPermission => selectedPermission !== checkbox.value
                  );
                }
                setPermissions(updatedPermissions);
              }}
            />
          </label>
        </td>
      ))}
      <td>
        <SickButton>Update</SickButton>
      </td>
    </tr>
  );
};

UsersPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    email: PropTypes.string,
    permissions: PropTypes.array,
  }).isRequired,
};

export default Permissions;
