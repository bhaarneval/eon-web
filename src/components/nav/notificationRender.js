import React, { Component } from "react";
import PropTypes from "prop-types";
import { Empty, Card } from "antd";
import "./nav.css";
import cancelIcon from "../../assets/icons8-cancel-32.png";

/**
 * @author
 * @class
 **/

class NotificationRender extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnMount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.openNotificationWithIcon();
    }
  }

  render() {
    return (
      <div
        ref={this.setWrapperRef}
        className={
          this.props.notifications && this.props.notifications.length != 0
            ? "notification"
            : "notification-empty"
        }
      >
        <div className="notification-header">
          <div>Notifications</div>
          <div className="notification-clear" onClick={this.props.clearAll}>
            Clear All
          </div>
          <div
            onClick={this.props.openNotificationWithIcon}
            style={{ cursor: "pointer" }}
          >
            X
          </div>
        </div>

        {this.props.notifications && this.props.notifications.length !== 0 ? (
          <div className="notification-body">
            {this.props.notifications &&
              this.props.notifications.map((data) => {
                return (
                  <Card
                    className="li-item"
                    hoverable={true}
                    key={data.id}
                    title={
                      <h2 onClick={()=> this.props.handleNotificationClick(data.event_id)}>
                        <b>{data.event}</b>
                      </h2>
                    }
                    extra={<img src={cancelIcon} className="cancel-button" onClick={() => this.props.handleClearOneNotification(data.id)}/>}
                  >
                    <div
                      key={data.id}
                      value={data.id}
                      onClick={()=> this.props.handleNotificationClick(data.event_id)}
                    >
                      {data.message}
                    </div>
                  </Card>
                );
              })}
          </div>
        ) : (
          <Empty description={false} imageStyle={{ objectFit: "contain", paddingTop:"2%", boxSizing:"border-box" }} />
        )}
      </div>
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
