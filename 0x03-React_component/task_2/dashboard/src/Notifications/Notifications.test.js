import { shallow } from 'enzyme';
import Notifications from './Notifications';
import React from 'react';
import { getLatestNotification } from '../utils/utils';

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: getLatestNotification() },
];

describe('Notifications Component', function () {
  it('Without Crashing', function () {
    const ntf = shallow(<Notifications />);
    expect(ntf.exists()).toBe(true);
  });

  it('renders correct list items', () => {
    const ntf = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
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

  it('Notification text', function () {
    const ntf = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    expect(ntf.contains(<p>Here is the list of notifications</p>)).toBe(true);
  });

  it('only menuItem when displayDrawer is false', () => {
    const ntf = shallow(<Notifications displayDrawer={false} />);

    expect(ntf.find('div.menuItem').exists()).toBe(true);
    expect(ntf.find('div.menuItem').html()).toEqual(
      '<div class="menuItem"><p>Your notifications</p></div>'
    );
  });

  it('No notifications when displayDrawer is false', () => {
    const ntf = shallow(<Notifications displayDrawer={false} />);
    expect(ntf.find('div.Notifications').exists()).toBe(false);
  });

  it('Display menuItem when displayDrawer is true', () => {
    const ntf = shallow(<Notifications displayDrawer={true} />);
    expect(ntf.find('div.menuItem').exists()).toBe(true);
  });

  it('Displays Notifications when displayDrawer is true', () => {
    const ntf = shallow(<Notifications displayDrawer={true} />);
    expect(ntf.find('div.Notifications').exists()).toBe(true);
  });

  it('When listCourses is not passed', () => {
    const ntf = shallow(<Notifications displayDrawer={true} />);
    expect(ntf.containsMatchingElement(<li>No new notification for now</li>));
  });

  it('when empty listCourses is passed', () => {
    const ntf = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );
    expect(ntf.containsMatchingElement(<li>No new notification for now</li>));
  });
  it('If there is a notifications', () => {
    const ntf = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );
    expect(
      ntf.containsMatchingElement(<p>Here is the list of notifications</p>)
    ).toBe(false);
    expect(ntf.containsMatchingElement(<li>No new notification for now</li>));
  });
});

describe('Click event behaver', () => {
  it('Call the Console', () => {
    const ntf = shallow(<Notifications />);
    const spy = jest.spyOn(console, 'log').mockImplementation();
    ntf.instance().markAsRead = spy;
    ntf.instance().markAsRead(1);
    expect(ntf.instance().markAsRead).toBeCalledWith(1);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
    spy.mockRestore();
  });
});
