import React from "react";
import PropTypes from "prop-types";
import "./analytics.css";
import { Table, Popover } from "antd";

export default function AnalyticsTable(props) {
  const { eventsList } = props;
  const columns = [
    {
      title: "EVENT NAME",
      dataIndex: "name",
      key: "name",
      width:210,
      // eslint-disable-next-line react/display-name
      render: (name) => {
        return (
          <div className="event-name-style ellipsis-style">
          <Popover content={name} placement="left">
            {name}
          </Popover>
        </div>
        );
      },
    },
    {
      title: "TOTAL TICKETS",
      dataIndex: "total_tickets",
      width: 150,
    },
    {
      title: "BOOKED TICKETS",
      dataIndex: "sold_tickets",
      width: 160,
    },
    {
      title: "REVENUE",
      dataIndex: "revenue",
      width: 120,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      width: 120,
      // eslint-disable-next-line react/display-name
      render: (status) => {
        let color = "";
        if (status === "cancelled") {
          color = "red";
        } else if (status === "upcoming") {
          color = "orange";
        } else color = "green";
        return <div style={{ color: `${color}` }}>{status.toUpperCase()}</div>;
      },
    },
  ];
    
  return (
    <Table
      columns={columns}
      dataSource={eventsList}
      className="table-analytics"
      // pagination={false}
      pagination={{ pageSize: 5 }}
    />
  );
}

AnalyticsTable.propTypes = {
  eventsList: PropTypes.array,
};
