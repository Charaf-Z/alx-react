import { shallow } from "enzyme";
import Notifications from "./Notifications";
import React from "react";

describe("Notifications Component", function () {
  it("Without Crashing", function () {
    const ntf = shallow(<Notifications />);
    expect(ntf.exists()).toBe(true);
  });

  it("The list of items", function () {
    const ntf = shallow(<Notifications />);
    expect(ntf.find("ul li")).toHaveLength(3);
  });

  it("Notification text", function () {
    const ntf = shallow(<Notifications />);
    expect(ntf.contains("Here is the list of notifications")).toBe(true);
  });
});
