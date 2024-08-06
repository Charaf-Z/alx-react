import React from 'react';
import './Footer.css';
import { getFooterCopy, getFullYear } from '../utils/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Footer({ user }) {
  return (
    <div className="footer_container">
      {user && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>
    </div>
  );
}

Footer.defaultProps = {
  user: null,
};

Footer.propTypes = {
  user: PropTypes.object,
};

export const mapStatetoProps = (state) => ({
  user: state.ui.get('user'),
});

export default connect(mapStatetoProps, null)(Footer);
