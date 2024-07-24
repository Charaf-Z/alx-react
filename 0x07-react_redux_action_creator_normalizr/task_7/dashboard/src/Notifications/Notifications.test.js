import { shallow } from 'enzyme';
import Notifications from './Notifications';
import React from 'react';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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
    expect(ntf.find('ul').childAt(0).html()).toMatch(
      /<li.*>New course available<\/li>/
    );
    expect(ntf.find('ul').childAt(1).html()).toMatch(
      /<li.*>New resume available<\/li>/
    );
    expect(ntf.find('ul').childAt(2).html()).toMatch(
      /<li.*><strong>Urgent requirement<\/strong> - complete by EOD<\/li>/
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
    expect(ntf.find('div').hasClass(/^menuItem.*/)).toBe(true);
    expect(ntf.find('div > p').text()).toEqual('Your notifications');
  });

  it('No notifications when displayDrawer is false', () => {
    const ntf = shallow(<Notifications displayDrawer={false} />);
    expect(ntf.find('div').hasClass(/^Notifications.*/)).toBe(false);
  });

  it('Display menuItem when displayDrawer is true', () => {
    const ntf = shallow(<Notifications displayDrawer={true} />);
    expect(
      ntf
        .find('div')
        .filterWhere((node) => node.hasClass(/^menuItem.*/))
        .exists()
    ).toBe(true);
  });

  it('Displays Notifications when displayDrawer is true', () => {
    const ntf = shallow(<Notifications displayDrawer={true} />);
    expect(
      ntf
        .find('div')
        .filterWhere((node) => node.hasClass(/^Notifications.*/))
        .exists()
    ).toBe(true);
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

  it('calling handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const ntf = shallow(
      <Notifications
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
    );
    ntf.find('div').childAt(0).simulate('Click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
    expect(handleHideDrawer).not.toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  it('calling handleHideDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const ntf = shallow(
      <Notifications
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        displayDrawer={true}
      />
    );
    ntf.find('button').simulate('Click');
    expect(handleDisplayDrawer).not.toHaveBeenCalled();
    expect(handleHideDrawer).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});

describe('Notification Optimization', () => {
  it('No update on the porps', () => {
    const ntf = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    expect(ntf.find('NotificationItem').length).toEqual(3);
    expect(ntf.find('NotificationItem').first().props().value).toEqual(
      'New course available'
    );
  });

  it('Add new notifications', () => {
    const newlistNotifications = [
      ...listNotifications,
      { id: 4, type: 'default', value: 'dummy string' },
    ];

    const ntf = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );
    ntf.setProps({ listNotifications: newlistNotifications });
    expect(ntf.find('NotificationItem').length).toEqual(4);
    expect(ntf.find('NotificationItem').last().props().value).toEqual(
      'dummy string'
    );
  });
});
