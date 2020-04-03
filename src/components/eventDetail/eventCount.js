import React from 'react'
import PropTypes from 'prop-types'
import './eventDetail.css'
import fb from '../../assets/fb.png';
import feedback from '../../assets/feedback.png';
import reminder from '../../assets/reminder.png';
import user from '../../assets/user.png';




export default function EventCount(props) {
    console.log(props)
    return (
        <div className="detail-card-count">
            <div className="detail-card-tile detail-card-container">
                <div>
                    <span className="detail-card-tile-row"><img className="subscriber-image" src={user}/><div className="detail-card-tile-text">200</div></span>
                    <div>
                        No of Subscribers
                    </div>
                </div>
            </div>
            <div className="detail-card-tile detail-card-container">
                <div>
                <span className="detail-card-tile-row"><img className="subscriber-image" src={feedback}/><div className="detail-card-tile-text">2</div></span>
                    <div>
                        View Feedbacks
                    </div>
                </div>
            </div>
            <div className="detail-card-tile detail-card-container">
                <div>
                <span className="detail-card-tile-row"><img className="subscriber-image" src={fb}/></span>
                    <div>
                        Share on social media
                    </div>
                </div>
            </div>
            <div className="detail-card-tile detail-card-container">
                <div>
                <span className="detail-card-tile-row"><img className="subscriber-image" src={reminder}/></span>
                    <div>
                        Send reminder to subcribers
                    </div>
                </div>
            </div>
        </div>
    );
 }


 EventCount.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
}