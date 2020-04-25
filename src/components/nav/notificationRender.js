import React, { Component } from "react";
import PropTypes from "prop-types";
import { Empty, Card, Modal } from "antd";
import "./nav.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import deleteIcon from "../../assets/icons8-delete.svg";
import moment from "moment";

/**
 * @author
 * @class
 **/

class NotificationRender extends Component {
  constructor(props) {
    super(props);
    TimeAgo.addLocale(en);
  }

  render() {
    const timeAgo = new TimeAgo("en-IN");
    return (
      <Modal
        visible
        width={"25%"}
        onCancel={this.props.openNotificationWithIcon}
        footer={null}
        className="notification"
        bodyStyle={{ padding: "0px" }} //dont remove this ever
        closeIcon={
          <img
            src={deleteIcon}
            className="cancel-button"
          />
        }
      >
        <div className="notification-header">
          <div>Notifications</div>
          <div className="notification-clear" onClick={this.props.clearAll}>
            Clear All
          </div>
          <div style={{ cursor: "pointer" }}></div>
        </div>

        {this.props.notifications && this.props.notifications.length !== 0 ? (
          <div className="notification-body">
            {this.props.notifications &&
              this.props.notifications.map((data) => {
                return (
                  <Card className="li-item" key={data.id}>
                    <div className="card-not-body">
                      <div className="card-not-header">
                        <div className="header-text-not ellipsis-style">
                          {data.event}
                        </div>
                        <div
                          onClick={() =>
                            this.props.handleClearOneNotification(data.id)
                          }
                        >
                          <img
                            src={deleteIcon}
                            className="cancel-button"
                          />
                        </div>
                      </div>
                      <div
                        key={data.id}
                        value={data.id}
                        className="notification-text"
                      >
                        {data.message}
                      </div>
                      <div className="time-not">
                        {timeAgo.format(moment(data.created_on).toDate())}
                      </div>
                    </div>
                  </Card>
                );
              })}
          </div>
        ) : (
          <Empty
            description={false}
            imageStyle={{
              objectFit: "contain",
              paddingTop: "2%",
              height: "89vh",
              boxSizing: "border-box",
            }}
          />
        )}
      </Modal>
    );
  }
}

NotificationRender.propTypes = {
  notifications: PropTypes.array,
  openNotificationWithIcon: PropTypes.func,
  clearAll: PropTypes.func,
  handleNotificationClick: PropTypes.func,
  handleClearOneNotification: PropTypes.func,
};
export default NotificationRender;
