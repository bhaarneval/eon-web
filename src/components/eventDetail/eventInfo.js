import React from 'react'
import PropTypes from 'prop-types'



export default function EventInfo(props) {
    console.log(props)
  return (
      <div className="card-desc-grid">
      </div>
  );
 }


 EventInfo.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
}