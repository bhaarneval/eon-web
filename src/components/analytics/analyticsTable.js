import React from 'react'
import PropTypes from 'prop-types'
import "./analytics.css";
import {Table} from "antd";

export default function AnalyticsTable(props) {
  const {eventsList} = props;
    const columns = [
        {
          title: 'EVENT NAME',
          dataIndex: 'name',
        },
        {
          title: 'TOTAL TICKETS',
          dataIndex: 'total_tickets',
        },
        {
          title: 'BOOKED TICKETS',
          dataIndex: 'sold_tickets',
        },
        {
          title: 'REVENUE EARNED',
          dataIndex: 'revenue',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            // eslint-disable-next-line react/display-name
            render: status => {
                let color="";
                if(status === "cancelled"){
                    color= "red"
                }
                else if (status === "upcoming"){
                    color= "orange"
                }
                else color = "green"
                  return (
                    <div style={{color:`${color}`}}>
                      {status.toUpperCase()}
                    </div>
                  );
                }
        },
      ];
      
  return(
       <Table columns={columns} dataSource={eventsList} className="table-analytics"
        // pagination={false}
        pagination={{ pageSize: 5 }}
      />
    )
 }


AnalyticsTable.propTypes = {
  eventsList: PropTypes.array,
}
 