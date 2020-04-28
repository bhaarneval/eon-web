import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
import './forms.css';

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
    <div className = "multistep-style">
      <Steps current={activeKey} labelPlacement="vertical" className='step-style' style={{width:"80%"}}>
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