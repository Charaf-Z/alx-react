import { normalize, schema } from 'normalizr';
import * as notifications from '../../notifications.json';

export function getAllNotificationsByUser(userId) {
  return notifications.default
    .filter(({ author }) => author.id === userId)
    .map(({ context }) => context);
}

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});
export const normalizedData = normalize(notifications.default, [notification]);
