import React from 'react';
import Footer from './Footer';
import { shallow } from 'enzyme';
import { getFooterCopy, getFullYear } from '../utils/utils';

describe('Footer Component', () => {
  it('Wihtout Crashing', () => {
    const footer = shallow(<Footer />);
    expect(footer.exists()).toBe(true);
  });

  it('Copyright text', () => {
    const footer = shallow(<Footer />);
    expect(footer.text()).toEqual(
      `Copyright ${getFullYear()} - ${getFooterCopy(true)}`
    );
  });
});
