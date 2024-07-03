/**
 * @jest-environment jsdom
 */

import React from 'react';
import Footer from './Footer';
import { mount, shallow } from 'enzyme';
import { getFooterCopy, getFullYear } from '../utils/utils';

import configureStore from 'redux-mock-store';
import { initialState } from '../reducers/uiReducer';

const mockStore = configureStore([]);
const store = mockStore(initialState);

describe('Footer Component', () => {
  it('Wihtout Crashing', () => {
    const footer = shallow(<Footer store={store} />);
    expect(footer.exists()).toBe(true);
  });

  it('Copyright text', () => {
    const footer = shallow(<Footer store={store} />)
      .dive()
      .dive();
    expect(footer.text()).toEqual(
      `Copyright ${getFullYear()} - ${getFooterCopy(true)}`
    );
  });

  // it('Default context', () => {
  //   const context = { user };
  //   const footer = mount(
  //     <AppContext.Provider value={context}>
  //       <Footer />
  //     </AppContext.Provider>
  //   );
  //   expect(footer.find('a').length).toBe(0);
  //   expect(footer.find('a').exists()).toBe(false);
  //   expect(footer.text()).not.toContain('Contact us');
  //   footer.unmount();
  // });

  // it('Updated context', () => {
  //   const context = { user: { ...user, isLoggedIn: true } };
  //   const footer = mount(
  //     <AppContext.Provider value={context}>
  //       <Footer />
  //     </AppContext.Provider>
  //   );
  //   expect(footer.find('a').length).toBe(1);
  //   expect(footer.find('a').exists()).toBe(true);
  //   expect(footer.text()).toContain('Contact us');
  //   footer.unmount();
  // });
});
