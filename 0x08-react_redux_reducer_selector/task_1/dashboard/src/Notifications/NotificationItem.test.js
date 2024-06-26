import React from 'react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('Notification Component', () => {
  it('Without Crashing', () => {
    const ntfItem = shallow(
      <NotificationItem type="default" value="just for testing" />
    );
    expect(ntfItem.exists()).toBe(true);
  });

  it('Default item', () => {
    const ntfItem = shallow(<NotificationItem type="default" value="test" />);
    expect(ntfItem.text()).toBe('test');
  });

  it('Render "<u>test</u>"', () => {
    const ntfItem = shallow(<NotificationItem html="<u>test</u>" />);
    expect(ntfItem.html()).toContain('<u>test</u>');
  });
});

describe('Click event behaver', () => {
  it('Calling the Console', () => {
    const ntfitem = shallow(<NotificationItem />);
    const spy = jest.fn();
    ntfitem.setProps({ value: 'item', markAsRead: spy, id: 1 });
    ntfitem.find('li').props().onClick();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
    spy.mockRestore();
  });
});
