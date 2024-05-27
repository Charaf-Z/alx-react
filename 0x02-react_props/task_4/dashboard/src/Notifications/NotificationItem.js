import React from 'react';

export default function NotificationItem({ type, html, value }) {
  if (!html && !value) return null;
  if (html)
    return (
      <li
        data-notification-type="urgent"
        dangerouslySetInnerHTML={{ __html: html }}
      ></li>
    );
  return <li data-notification-type={type}>{value}</li>;
}
