import React from 'react'
import PropTypes from 'prop-types'
import './eventDetail.css'
import dummyImg from '../../assets/concert.jpg';


export default function EventInfo(props) {
    console.log(props)
    return (
        <div className="detail-card-container">
            <div className="detail-card-top">
                <img src={dummyImg} className="detail-img"/>
                <div className="detail-card-top-descContainer">
                    <h2>Technex</h2>
                    <div className="detail-card-top-desc">
                        description
                    </div>
                </div>
            </div>
            <div className="detail-card-top-other">
                <div className="detail-card-top-other-box">
                    <div><b>Type of event</b></div>
                    <div>Technical</div>
                </div>
                <div className="detail-card-top-other-box">
                    <div><b>No. of Tickets</b></div>
                    <div>3000</div>
                </div>
                <div className="detail-card-top-other-box">
                    <div><b>Event Date & Time</b></div>
                    <div>24th march</div>
                </div>
                <div className="detail-card-top-other-box">
                    <div><b>Subsription Fee</b></div>
                    <div>Technical</div>
                </div>
                <div className="detail-card-top-other-box">
                    <div><b>URL</b></div>
                    <div>Technical</div>
                </div>
            </div>
        </div>
    );
 }


 EventInfo.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
}