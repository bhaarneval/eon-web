import PropTypes from "prop-types";
import React, { Component } from "react";
import { Input, Button, Upload, Form } from "antd";
// const { TextArea } = Input;
import "./feedback.css";
import attachImage from "../../assets/Attach-1.svg";
// import { questionList } from "../../constants/constants";

/**
 * Component to display feedbacks question from organizer to subscriber
 */
class FeedbackQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      currentImg: [],
      temp: {},
    };
  }

  handleUploadFileChange = (uploadedFile) => {
    this.setState({
      temp: uploadedFile,
    });
  };

  stopImageUpload = (input) => {
    let x = this.state.currentImg;
    x[input.data] = input.file;
    let y = this.state.file;
    y[input.data] = input.file;
    this.setState({
      currentImg: x,
      file: y,
    });
  };

  handleSubmit = (values) => {
    const { questionList } = this.props;
    const { file } = this.state;
    let feedback = [];
    for (let i = 0; i < questionList.length; ++i) {
      let answerObj = {
        id: questionList[i].id,
        answer: {
          description: values[i],
          image: file[i] ? file[i] : undefined,
        },
      };
      feedback.push(answerObj);
    }
    let submitData = {
      feedback,
      event_id: this.props.eventData.id,
    };
    this.props.onSubmit(submitData);
  };

  render() {
    const { questionList } = this.props;
    return (
      <div className="feedback-question-container">
        <div className="headerText border-bottom">
          {this.props.eventData.name}
        </div>

        <Form onFinish={this.handleSubmit}>
          {questionList.length > 0 &&
            questionList.map((que, key) => {
              return (
                <div key={key}>
                  <div className="question-row">
                    Q{key + 1}. {que.question}
                  </div>

                  <div className="answer-row">
                    <Form.Item
                      name={key}
                      key={key}
                      style={{ width: "100%", alignItems: "center" }}
                      rules={[
                        {
                          required: true,
                          message: "Answer field cannot be empty",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={2}
                        placeholder="Answer"
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        className = "input-textarea"
                      />
                    </Form.Item>
                    {this.state.currentImg[key] &&
                    this.state.currentImg[key].name ? (
                      <img
                        className="submit-response-images"
                        src={
                          this.state.currentImg[key] &&
                          this.state.currentImg[key].name
                            ? URL.createObjectURL(this.state.currentImg[key])
                            : ""
                        }
                      />
                    ) : (
                      <div className="attachment-button">
                        <Upload
                          data={key}
                          accept=".png,.jpeg,.jpg,.svg,"
                          showUploadList={false}
                          multiple={false}
                          beforeUpload={this.handleUploadFileChange}
                          directory={false}
                          customRequest={this.stopImageUpload}
                        >
                          <Button>
                            <img src={attachImage} />
                            Add Attachment
                          </Button>
                        </Upload>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          <div className="submit-button">
            <Button type="primary" htmlType="submit">
              Submit feedback
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

FeedbackQuestions.propTypes = {
  history: PropTypes.object,
  questionList: PropTypes.any,
  eventData: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default FeedbackQuestions;
