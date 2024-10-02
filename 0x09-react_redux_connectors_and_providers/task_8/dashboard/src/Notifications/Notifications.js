import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import { NotificationItemShape } from './NotificationItemShape';

export default class Notifications extends React.PureComponent {
  render() {
    const {
      displayDrawer,
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
    } = this.props;
    return (
      <div className={css(styles.menuItem)}>
        {!displayDrawer && (
          <p
            className={css(styles.notificationTitle)}
            onClick={handleDisplayDrawer}
          >
            Your notifications
          </p>
        )}
        {displayDrawer && (
          <div className={css(styles.Notifications)}>
            <button
              aria-label="Close"
              style={{ float: 'right', border: 'none' }}
              onClick={handleHideDrawer}
              className={css(styles.closeBtn)}
            >
              <img
                src={closeIcon}
                alt="Close"
                className={css(styles.closeIconBtn)}
              />
            </button>

            {listNotifications && listNotifications.length > 0 && (
              <p>Here is the list of notifications</p>
            )}
            <ul className={css(styles.notificationUl)}>
              {listNotifications && listNotifications.length > 0 ? (
                listNotifications.map((item) => (
                  <NotificationItem
                    key={item.id}
                    {...item}
                    markAsRead={markNotificationAsRead}
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

const animationOpacity = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 },
};

const animationBounce = {
  '0%': { transform: 'translateY(0px)' },
  '33%': { transform: 'translateY(-5px)' },
  '66%': { transform: 'translateY(5px)' },
  '100%': { transform: 'translateY(0px)' },
};

const styles = StyleSheet.create({
  menuItem: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    ':hover': {
      cursor: 'pointer',
      animationName: [animationBounce, animationOpacity],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3',
    },
  },
  notificationTitle: {
    textAlign: 'right',
    marginBottom: '0.5rem',
  },
  Notifications: {
    backgroundColor: '#fff8f8',
    border: '2px dashed red',
    padding: '0.5rem',
    '@media (max-width:900px)': {
      width: '100%',
      height: '100vh',
      border: 'none',
      fontSize: '20px',
      padding: 0,
    },
    ':visibale menuItem': {
      '@media (max-width:900px)': {
        width: '100%',
        height: '100vh',
        right: 0,
        top: 0,
      },
    },
  },
  notificationUl: {
    margin: '0.7rem 3rem',
    '@media (max-width:900px)': {
      margin: 0,
      listStyle: 'none',
      padding: 0,
    },
  },
  closeBtn: {
    backgroundColor: 'inherit',
  },
  closeIconBtn: {
    width: '16px',
    height: '16px',
  },
});

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};
