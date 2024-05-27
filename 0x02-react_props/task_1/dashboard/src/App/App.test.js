import { shallow } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import React from 'react';

describe('App Componenet', function () {
  it('Without Crashing', function () {
    const app = shallow(<App />);
    expect(app.exists()).toBe(true);
  });

  it('Render Notifications Component', () => {
    const app = shallow(<App />);
    expect(app.contains(<Notifications />)).toBe(true);
  });

  it('Render Header Component', () => {
    const app = shallow(<App />);
    expect(app.contains(<Header />)).toBe(true);
  });

  it('Render Login Component', () => {
    const app = shallow(<App />);
    expect(app.contains(<Login />)).toBe(true);
  });

  it('Render Footer Component', () => {
    const app = shallow(<App />);
    expect(app.contains(<Footer />)).toBe(true);
  });
});
