import React from 'react';
import PropTypes from 'prop-types'
import backImg from '../assets/Back.svg';

export default function BackButton (props) {
    const {handleOnClick} = props;
    return (
      <div>
        <img
          src={backImg}
          onClick={handleOnClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    );
}
BackButton.propTypes = {
    handleOnClick:PropTypes.func.isRequired,
}