import React from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { logout } from '../actions/uiActionCreators';
import { connect } from 'react-redux';

function Header({ user, logout }) {
  return (
    <>
      <div className={css(style.header)}>
        <img
          src={holbertonLogo}
          className={css(style.logo)}
          alt="holberton logo"
        />
        <h1>School dashboard</h1>
      </div>
      {user && (
        <section id="logoutSection" className={css(style.greeting)}>
          Welcome <strong>{user.email}</strong>{' '}
          <em>
            <a href="#" onClick={logout}>
              (logout)
            </a>
          </em>
        </section>
      )}
    </>
  );
}

const style = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    color: 'red',
    borderBottom: '3px solid red',
  },
  logo: {
    width: '200px',
    height: '200px',
  },
  greeting: {
    margin: '2rem 0 0 5rem',
  },
});

Header.defaultProps = {
  user: null,
  logout: () => {},
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export const mapStatetoProps = (state) => ({
  user: state.ui.get('user'),
});

export const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Header);
