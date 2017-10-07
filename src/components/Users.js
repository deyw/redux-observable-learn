import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, defaultProps, withPropsOnChange, withHandlers, pure } from 'recompose';
import { fetchUser } from '../reducers/actions';


const HOC = compose(
  setDisplayName('Users'),
  connect(({ users }) => ({
    items: users.items,
    ...users
  }), {
    fetchUser
  }),
  defaultProps({
    loading: false,
    current: null
  }),
  withHandlers({
    handleFetchUsers: ({ fetchUser }) => (user) => () => fetchUser(user)
  }),
  withPropsOnChange(
    ['items'], ({ items, handleFetchUsers }) => ({
      _users: items.map(i => (
        <li key={i}>
          {i}
          <button type="button" onClick={handleFetchUsers(i)}>Load user</button>
        </li>
      ))
    })
  ),
  pure
)

const Users = ({
  _users,
  loading,
  current
}) => (
  <div>
    <ul>
      {_users}
    </ul>
    {loading && <p>Please wait...</p>}
    {current && <div>{current.name}</div>}
  </div>
);

export default HOC(Users);


