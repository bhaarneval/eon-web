import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

const {Step} = Steps;
/**
* @mayankumar
* @Steps 
**/

export default class FormSteps  extends Component {
 
 render() {
     const {
         stepList,
         activeKey,
     } = this.props;
  return (
    <div style={{ width: "100%",display:'flex',justifyContent:'center' }}>
      <Steps current={activeKey} size="large" labelPlacement="vertical" style = {{width:'70%'}}>
        {stepList.map((steps, index) => (
          <Step key={index} title={steps} />
        ))}
      </Steps>
    </div>
  );
   }
}

FormSteps.propTypes = {
    activeKey: PropTypes.number.isRequired,
    stepList: PropTypes.array.isRequired
  };