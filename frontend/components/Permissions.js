import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
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
                  <Users key={user.id} user={user} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Query>
  </div>
);

const Users = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
    {possiblePermissions.map(permission => (
      <td>
        <label htmlFor={`${user.id}-permission-${permission}`}>
          <input type="checkbox" />
        </label>
      </td>
    ))}
    <td>
      <SickButton>Update</SickButton>
    </td>
  </tr>
);

export default Permissions;
