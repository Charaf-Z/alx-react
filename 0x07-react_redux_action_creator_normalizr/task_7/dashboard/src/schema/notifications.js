import { normalize, schema } from 'normalizr';
import * as notifications from '../../notifications.json';

export function getAllNotificationsByUser(userId) {
  const {
    entities: { notifications, messages },
    result,
  } = normalizedData;
  return result.reduce((acc, notificationId) => {
    const notification = notifications[notificationId];
    if (notification.author === userId) {
      acc.push(messages[notification.context]);
    }
    return acc;
  }, []);
}

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});
export const normalizedData = normalize(notifications.default, [notification]);
