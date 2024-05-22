import { shallow } from 'enzyme';
import App from './App';

describe('App Componenet', function () {
  it('Without Crashing', function () {
    const app = shallow(<App />);
    expect(app.exists()).toBe(true);
  });

  it('The Header App', function () {
    const app = shallow(<App />);
    expect(app.find('.App-header').exists()).toBe(true);
  });

  it('The Body App', function () {
    const app = shallow(<App />);
    expect(app.find('.App-body').exists()).toBe(true);
  });

  it('The Footer App', function () {
    const app = shallow(<App />);
    expect(app.find('.App-footer').exists()).toBe(true);
  });
});
