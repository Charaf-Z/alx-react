import React from 'react';
import closeIcon from '../assets/close-icon.png';
import './Notifications.css';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { NotificationItemShape } from './NotificationItemShape';

export default function Notifications({ displayDrawer, listNotifications }) {
  return (
    <div className="menuItem">
      <p>Your notifications</p>
      {displayDrawer && (
        <div className="Notifications">
          <button
            aria-label="Close"
            style={{ float: 'right', border: 'none' }}
            onClick={() => console.log('Close button has been clicked')}
          >
            <img src={closeIcon} alt="Close" width={16} height={16} />
          </button>

          {listNotifications && listNotifications.length > 0 && (
            <p>Here is the list of notifications</p>
          )}
          <ul>
            {listNotifications && listNotifications.length > 0 ? (
              listNotifications.map(({ id, ...rest }) => (
                <NotificationItem key={id} {...rest} />
              ))
            ) : (
              <>
                <NotificationItem value="No new notification for now" />
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};
