import React from 'react';
import closeIcon from '../assets/close-icon.png';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import { NotificationItemShape } from './NotificationItemShape';

export default class Notifications extends React.Component {
  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.length > this.props.listNotifications.length;
  }

  render() {
    return (
      <div className="menuItem">
        <p>Your notifications</p>
        {this.props.displayDrawer && (
          <div className="Notifications">
            <button
              aria-label="Close"
              style={{ float: 'right', border: 'none' }}
              onClick={() => console.log('Close button has been clicked')}
            >
              <img src={closeIcon} alt="Close" width={16} height={16} />
            </button>

            {this.props.listNotifications &&
              this.props.listNotifications.length > 0 && (
                <p>Here is the list of notifications</p>
              )}
            <ul>
              {this.props.listNotifications &&
              this.props.listNotifications.length > 0 ? (
                this.props.listNotifications.map((item) => (
                  <NotificationItem
                    key={item.id}
                    {...item}
                    markAsRead={this.markAsRead}
                  />
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
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};
