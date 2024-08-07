import PropTypes from 'prop-types';
import React from 'react';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import { getLatestNotification } from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';
import { AppContext, user } from './AppContext';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: { ...user, isLoggedIn: this.props.isLoggedIn },
      logOut: this.logOut,
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: getLatestNotification() },
      ],
    };
  }
  listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      alert('Logging you out');
      this.logOut();
    }
  };

  handleDisplayDrawer = () => this.setState({ displayDrawer: true });
  handleHideDrawer = () => this.setState({ displayDrawer: false });

  logIn = (email, password) =>
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  logOut = () => this.setState({ user: user });

  markNotificationAsRead = (id) =>
    this.setState({
      listNotifications: this.state.listNotifications.filter(
        (item) => item.id !== id
      ),
    });
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          logOut: this.state.logOut,
        }}
      >
        <React.Fragment>
          <Notifications
            listNotifications={this.state.listNotifications}
            displayDrawer={this.state.displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />
          <div className={css(styles.App)}>
            <Header />
            <div className={css(styles.body)}>
              {this.state.user.isLoggedIn ? (
                <BodySectionWithMarginBottom title="Course list">
                  <CourseList listCourses={this.listCourses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <Login logIn={this.logIn} />
                </BodySectionWithMarginBottom>
              )}
              <BodySection title="News from the school">
                <p>
                  Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                  reprehenderit enim labore culpa sint ad nisi Lorem pariatur
                  mollit ex esse exercitation amet. Nisi anim cupidatat
                  excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
                  est aliquip amet voluptate voluptate dolor minim nulla est
                  proident. Nostrud officia pariatur ut officia. Sit irure elit
                  esse ea nulla sunt ex occaecat reprehenderit commodo officia
                  dolor Lorem duis laboris cupidatat officia voluptate. Culpa
                  proident adipisicing id nulla nisi laboris ex in Lorem sunt
                  duis officia eiusmod. Aliqua reprehenderit commodo ex non
                  excepteur duis sunt velit enim. Voluptate laboris sint
                  cupidatat ullamco ut ea consectetur et est culpa et culpa
                  duis.
                </p>
              </BodySection>
            </div>
            <div className={css(styles.footer)}>
              <Footer />
            </div>
          </div>
        </React.Fragment>
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  App: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  body: {
    padding: '5rem',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: '0.05rem',
    paddingBottom: '0.05rem',
    fontStyle: 'italic',
    borderTop: '3px solid red',
  },
});

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export const mapStatetoProps = (state) => ({
  isLoggedIn: state.get('isUserLoggedIn'),
});

export default connect(mapStatetoProps)(App);
