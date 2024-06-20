import * as notifications from '../../notifications.json';

export function getAllNotificationsByUser(userId) {
  return notifications.default
    .filter(({ author }) => author.id === userId)
    .map(({ context }) => context);
}
