import React from "react";
import closeIcon from "../assets/close-icon.png";
import "./Notifications.css";
import { getLatestNotification } from "../utils/utils";

export default function Notifications() {
  return (
    <div className="Notifications">
      <button
        aria-label="Close"
        style={{ float: "right", border: "none" }}
        onClick={() => console.log("Close button has been clicked")}
      >
        <img src={closeIcon} alt="Close" width={16} height={16} />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        ></li>
      </ul>
    </div>
  );
}
