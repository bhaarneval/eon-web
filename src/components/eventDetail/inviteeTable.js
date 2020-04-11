import { Table } from 'antd';
import React from "react";
import PropTypes from "prop-types";
import {Button} from 'antd';

const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Name',
    dataIndex: 'user',
  },
  {
    title: 'Contact',
    dataIndex: 'user.contact_number',
  },
  {
    title: 'Discount',
    dataIndex: 'event.discount_percentage',
  },
];

class EventTable extends React.Component {
  state = {
    selectedRowKeys: []
  };

  start = () => {
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    let tableData = [];
    const data= this.props.data;
    for( let i=0;i<Object.keys(data).length!=0;i++){
      let newData = {
        email: data[i].email,
        name: data[i].user.name,
        contact: data[i].user.contact_number,
        discount: data[i].event.discount_percentage,
      };
      tableData = [...tableData,newData]
    }
    return (
      <div style={{marginTop: !hasSelected ? '50px' : '10px', marginBottom: '50px'}}>
        {/* <div>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</div> */}
        {hasSelected && 
            <Button type="primary" className="deleteButton" onClick={() => this.props.deleteAll(this.state.selectedRowKeys)}>
                Delete Selected
            </Button>}
        <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={tableData} />
      </div>
    );
  }
}

EventTable.propTypes = {
    data: PropTypes.object,
    deleteAll: PropTypes.func,
};

export default EventTable;