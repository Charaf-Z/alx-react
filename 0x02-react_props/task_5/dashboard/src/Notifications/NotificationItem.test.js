import React from 'react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';

describe('Notification Component', () => {
  it('Without Crashing', () => {
    const ntfItem = shallow(
      <NotificationItem type="default" value="just for testing" />
    );
    expect(ntfItem.exists()).toBe(true);
  });

  it('Default item', () => {
    const ntfItem = shallow(<NotificationItem type="default" value="test" />);
    expect(ntfItem.html()).toBe(
      '<li data-notification-type="default">test</li>'
    );
  });

  it('Render "<u>test</u>"', () => {
    const ntfItem = shallow(<NotificationItem html="<u>test</u>" />);
    expect(ntfItem.html()).toBe(
      '<li data-notification-type="urgent"><u>test</u></li>'
    );
  });
});
