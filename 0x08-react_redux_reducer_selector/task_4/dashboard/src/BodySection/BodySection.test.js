import React from 'react';
import BodySection from './BodySection';
import { shallow } from 'enzyme';

describe('BodySection component', () => {
  it('Correct Rendring', () => {
    const bodySection = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );
    expect(bodySection.exists()).toBe(true);
    expect(bodySection.exists('h2')).toBe(true);
    expect(bodySection.find('h2').html()).toEqual('<h2>test title</h2>');
    expect(bodySection.exists('p')).toBe(true);
    expect(bodySection.find('p').html()).toEqual('<p>test children node</p>');
  });
});
