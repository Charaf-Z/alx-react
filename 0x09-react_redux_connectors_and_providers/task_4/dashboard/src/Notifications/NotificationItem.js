import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default class NotificationItem extends React.PureComponent {
  render() {
    const { html, value, type, markAsRead, id } = this.props;
    if (!html && !value) return null;
    if (html)
      return (
        <li
          onClick={() => markAsRead(id)}
          data-notification-type="urgent"
          className={css(styles.urgent)}
          dangerouslySetInnerHTML={{ __html: html }}
        ></li>
      );
    return (
      <li
        onClick={() => markAsRead(id)}
        className={css(styles[type])}
        data-notification-type={type}
      >
        {value}
      </li>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    color: 'blue',
    '@media (max-width:900px)': {
      padding: '10px 8px',
      borderBottom: '1px solid black',
    },
  },
  urgent: {
    color: 'red',
    '@media (max-width:900px)': {
      padding: '10px 8px',
      borderBottom: '1px solid black',
    },
  },
});

NotificationItem.defaultProps = {
  type: 'default',
  id: 0,
  markAsRead: () => {},
};

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  __html: PropTypes.shape({
    html: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
};
