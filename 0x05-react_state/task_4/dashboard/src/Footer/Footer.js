import React, { useContext } from 'react';
import './Footer.css';
import { getFooterCopy, getFullYear } from '../utils/utils';
import { AppContext } from '../App/AppContext';

export default function Footer() {
  const { user } = useContext(AppContext);
  return (
    <div className="footer_container">
      {user.isLoggedIn && (
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
