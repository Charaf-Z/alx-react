import { shallow } from 'enzyme';
import Notifications from './Notifications';
import React from 'react';
import NotificationItem from './NotificationItem';

describe('Notifications Component', function () {
  it('Without Crashing', function () {
    const ntf = shallow(<Notifications />);
    expect(ntf.exists()).toBe(true);
  });

  it('renders correct list items', () => {
    const ntf = shallow(<Notifications />);
    expect(ntf.find('ul').children()).toHaveLength(3);
    expect(ntf.find('ul').childAt(0).html()).toEqual(
      '<li data-notification-type="default">New course available</li>'
    );
    expect(ntf.find('ul').childAt(1).html()).toEqual(
      '<li data-notification-type="urgent">New resume available</li>'
    );
    expect(ntf.find('ul').childAt(2).html()).toEqual(
      `<li data-notification-type="urgent">${getLatestNotification()}</li>`
    );
  });

  it('renders an unordered list', () => {
    const ntf = shallow(<Notifications />);
    expect(ntf.find('ul').children()).toHaveLength(3);
    ntf.find('ul').forEach((node) => {
      expect(node.equals(<NotificationItem />));
    });
  });

  it('Notification text', function () {
    const ntf = shallow(<Notifications />);
    expect(ntf.contains('Here is the list of notifications')).toBe(true);
  });
});
