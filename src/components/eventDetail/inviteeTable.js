import { Table } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Contact",
    dataIndex: "contact",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
];


//invitee table for event details
class EventTable extends React.Component {
  state = {
    selectedRowKeys: [],
    hasSelected: false
  };

  start = () => {
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys, hasSelected: selectedRowKeys.length>0 });
  };

  getTableData = () => {
    let tableData = [];
    const data = this.props.data || [];
    for (let i = 0; i < data.length; i++) {
      let newData = {
        key: data[i].invitation_id,
        email: data[i].email,
        name: data[i].user ? data[i].user.name : "",
        contact: data[i].user ? data[i].user.contact_number : "",
        discount: data[i].discount_percentage,
      };
      tableData = [...tableData, newData];
    }
    return tableData;
  };

  render() {
    const { hasSelected } = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    let tableData = this.getTableData();

    return (
      <div
        style={{
          marginTop: !hasSelected ? "50px" : "10px",
          marginBottom: "50px",
        }}
      >
        {/* <div>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</div> */}
        {hasSelected && (
          <Button
            type="primary"
            className="deleteButton"
            disabled={this.props.eventStatus !== "upcoming"}
            onClick={() => {
              this.setState({
                selectedRowKeys: [],
              });
              this.props.deleteAll(this.state.selectedRowKeys);
            }}
          >
            Delete Selected
          </Button>
        )}
        <Table
          pagination={false}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={tableData}
        />
      </div>
    );
  }
}

EventTable.propTypes = {
  data: PropTypes.array,
  deleteAll: PropTypes.func,
  eventStatus: PropTypes.string,
};

export default EventTable;
