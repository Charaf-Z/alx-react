import React from 'react';
import './Footer.css';
import { getFooterCopy, getFullYear } from '../utils/utils';

export default function Footer() {
  return (
    <p className="footer_container">
      Copyright {getFullYear()} - {getFooterCopy(true)}
    </p>
  );
}
