import React from 'react';
import closeIcon from '../assets/close-icon.png';
import './Notifications.css';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';

export default function Notifications() {
  return (
    <div className="Notifications">
      <button
        aria-label="Close"
        style={{ float: 'right', border: 'none' }}
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeIcon} alt="Close" width={16} height={16} />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <NotificationItem value="New course available" type="default" />
        <NotificationItem value="New resume available" type="urgent" />
        <NotificationItem html={getLatestNotification()} />
      </ul>
    </div>
  );
}
