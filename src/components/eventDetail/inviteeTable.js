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
    dataIndex: 'name',
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
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
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div style={{marginTop: !hasSelected ? '70px' : '0', marginBottom: '50px'}}>
        {/* <div>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</div> */}
        {hasSelected && 
            <Button type="primary" className="deleteButton" onClick={() => this.props.deleteAll(this.state.selectedRowKeys)}>
                Delete All
            </Button>}
        <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={this.props.data} />
      </div>
    );
  }
}

EventTable.propTypes = {
    data: PropTypes.object,
    deleteAll: PropTypes.func,
};

export default EventTable;