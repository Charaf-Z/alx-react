import { shallow } from "enzyme";
import App from "./App";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Notifications from "../Notifications/Notifications";
import CourseList from "../CourseList/CourseList";
import React from "react";
import { getLatestNotification } from "../utils/utils";

const listNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: getLatestNotification() },
];

const listCourses = [
  { id: 1, name: "ES6", credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  { id: 3, name: "React", credit: 40 },
];

describe("App Componenet", function () {
  it("Without Crashing", function () {
    const app = shallow(<App />);
    expect(app.exists()).toBe(true);
  });

  it("Render Notifications Component", () => {
    const app = shallow(<App />);
    expect(
      app.contains(<Notifications listNotifications={listNotifications} />),
    ).toBe(true);
  });

  it("Render Header Component", () => {
    const app = shallow(<App />);
    expect(app.contains(<Header />)).toBe(true);
  });

  it("Render Login Component", () => {
    const app = shallow(<App />);
    expect(app.contains(<Login />)).toBe(true);
  });

  it("Render Footer Component", () => {
    const app = shallow(<App />);
    expect(app.contains(<Footer />)).toBe(true);
  });

  it("Render CourseList Component", () => {
    const app = shallow(<App isLoggedIn={true} />);
    expect(app.contains(<CourseList listCourses={listCourses} />)).toBe(true);
  });
});

describe("App Body checks", () => {
  it("check if login exists", () => {
    const app = shallow(<App isLoggedIn={true} />);
    expect(app.contains(<Login />)).toBe(false);
  });

  it("check if course list exists", () => {
    const app = shallow(<App isLoggedIn={true} />);
    expect(app.contains(<CourseList listCourses={listCourses} />)).toBe(true);
  });
});
