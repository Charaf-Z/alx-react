import React from 'react';
import { WithLogging } from './WithLogging';
import { shallow } from 'enzyme';

const DummyComponent = () => <p>Dummy Component</p>;
describe('Higher Order Component', () => {
  it('Calling the Console', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    const NewComponent = WithLogging(DummyComponent);
    const wrapper = shallow(<NewComponent />);
    expect(spy).toBeCalledTimes(1);
    wrapper.unmount();
    expect(spy).toBeCalledTimes(2);
    spy.mockRestore();
  });

  it('Right console message', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    const NewComponent = WithLogging(DummyComponent);
    const wrapper = shallow(<NewComponent />);
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('Component DummyComponent is mounted');
    wrapper.unmount();
    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith('Component DummyComponent is going to unmount');
    spy.mockRestore();
  });
});
