import { shallow } from 'enzyme';
import App from './App';
import React from 'react';

describe('App Componenet', function () {
  it('Without Crashing', function () {
    const app = shallow(<App />);
    expect(app.exists()).toBe(true);
  });
});
