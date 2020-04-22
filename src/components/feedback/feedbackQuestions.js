import PropTypes from 'prop-types'
import React, { Component } from "react";
import {Input, Button, Upload} from 'antd';
const { TextArea } = Input;
import './feedback.css';
import attachImage from '../../assets/Attach-1.svg'

class FeedbackQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: [],
            currentImg: [],
        }
    }

    handleUploadFileChange = (uploadedFile) => {
        console.log(uploadedFile)
        this.setState({
            file : uploadedFile
        })
    }
    
    stopImageUpload = (input) => {
        console.log(input)
        let x = this.state.currentImg;
        x[input.data] = input.file
        let y = this.state.file;
        y[input.data] = this.state.file
        this.setState({
            currentImg : x,
            file : y,
        })
    }

    render () {
        const {questionList} = this.props;
        return (
            <div className="feedback-question-container">
                <div className="headerText border-bottom">{this.props.eventData.name}</div>
                {
                    questionList && questionList.map((que, key) => {
                        return (
                            <div key = {key}>
                                <div className="question-row">Q{key + 1}. {que.question}</div>
                                <div className="answer-row">
                                    <TextArea 
                                        rows={2} 
                                        placeholder="Answer"
                                        style={{width: '85%'}}
                                    />
                                    {this.state.currentImg[key] && this.state.currentImg[key].name ?
                                        <img style={{height: '55px'}} src={this.state.currentImg[key] && this.state.currentImg[key].name ? URL.createObjectURL(this.state.currentImg[key]) : ""}/>
                                    :
                                        <Upload
                                            data={key}
                                            accept=".png,.jpeg,.jpg,.svg,"
                                            showUploadList={false}
                                            multiple={false}
                                            beforeUpload={this.handleUploadFileChange}
                                            directory={false}
                                            customRequest={this.stopImageUpload}
                                            >
                                            <img src={attachImage}/>Add Attachment
                                        </Upload>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div className="submit-button">
                    <Button type="primary">
                        Submit feedback
                    </Button>
                </div>
            </div>
        );
    }
 }


 FeedbackQuestions.propTypes = {
    history: PropTypes.object,
    questionList: PropTypes.object,
    eventData: PropTypes.object
}

export default FeedbackQuestions;