// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">
          <button>Sign Up</button>
        </NavLink>
      </>
    );
  }

  return (
    <ul>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/beaches">Beaches</NavLink>
        {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
