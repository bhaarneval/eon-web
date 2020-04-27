// import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import './registration.css';
// import UserDetails from '../../components/registration/userRegistration/forms';
// import TermsAndConditions from "../../components/registration/termsAndConditions";
// import BasicDetailsImg from "../../assets/Basic Details.svg";
// import {postUser} from "../../actions/commonActions";

// class UserRegistration extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formData: {},
//       password: "",
//       showModal: false,
//       isChecked: false,
//       hasErrored: false,
//       errorMessage: "Unable to connect with the server.",
//     };
//   }
//   handleModalClose = () => {
//     this.setState({
//       isChecked: false,
//       showModal: false
//     });
//   };

//   handleAccept = () => {
//     if (this.state.isChecked) {
//       this.setState({
//         showModal: false,
//       });
//       this.props.postUser({
//         data: this.state.formData,
//         callback: (error)=> {
//           if(!error){
//             localStorage.setItem('loggedIn', true);
//           this.props.history.push("/dashboard");
//           }
//           else{
//             this.setState({
//               hasErrored:true,
//               errorMessage:error,
//             })
//           }
//         }
//       })
//     }
//   };

//   handleCheckBoxChange = () => {
//     this.setState({
//       isChecked: !this.state.isChecked
//     });
//   };

//   handlePassWordChange = values => {
//     let currentPassword = values.target.value;
//     this.setState({
//       password: currentPassword
//     });
//   };

//   handleSubmit = values => {
//     const { email, name, contact, password } = values || {};
//     const formData = { email, name, contact, password, role:"subscriber",organization:"",address:"" };
//     this.setState({
//       formData: formData,
//       showModal: true
//     });
//   };

//   render() {
//     const {
//       showModal,
//       formData,
//       isChecked,
//       password
//     } = this.state;
//     return (
//       <div
//         className = 'registration-main'
//       >
//         <img
//           src={BasicDetailsImg}
//           className = 'image-style'
//         />
//         <div
//            className = 'form-container'
//         >
//           <div className = "form-header">
//             <h1>
//               <b>User Subscriber Sign Up</b>
//             </h1>
//             <h4>Please provide the following details</h4>
//           </div>
//           <UserDetails
//             handleSubmit={this.handleSubmit}
//             values={formData}
//             handlePasswordChange={this.handlePassWordChange}
//             currentPassword = {password}
//             hasErrored={this.state.hasErrored}
//             errorMessage= {this.state.errorMessage}
//           />
//           {showModal ? (
//             <TermsAndConditions
//               isChecked={isChecked}
//               handleClose={this.handleModalClose}
//               handleAccept={this.handleAccept}
//               handleCheckChange={this.handleCheckBoxChange}
//             />
//           ) : null}
//         </div>
//       </div>
//     );
//   }
// }
// UserRegistration.propTypes = {
//     history: PropTypes.object,
//     fetchingUser: PropTypes.bool.isRequired,
//     postUser: PropTypes.func,
// }
// const mapStateToProps = ({
//   userReducer:{
//     fetchingUser
//   }
// })=> ({
//   fetchingUser
// });

// const mapDispatchToProps = {
//   postUser: postUser
// };

// export default connect(mapStateToProps,mapDispatchToProps)(UserRegistration);
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./registration.css";
import {
  BasicDetails,
  PasswordDetails,
} from "../../components/registration/userRegistration/forms";
import FormSteps from "../../components/registration/formSteps";
import TermsAndConditions from "../../components/registration/termsAndConditions";
import WarningModal from "../../components/registration/warningModal";
import BasicDetailsImg from "../../assets/Basic Details.svg";
import PasswordImg from "../../assets/Password_Illustration.svg";
import { postUser } from "../../actions/commonActions";

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
      formData: {},
      stepList: ["Basic Details", "Password"],
      password: "",
      showModal: false,
      isChecked: false,
      hasErrored: false,
      errorMessage: "Unable to connect to the server!",
      showWarningModal: false,
    };
  }
  handleModalClose = () => {
    this.setState({
      isChecked: false,
      showModal: false,
    });
  };

  handleAccept = () => {
    if (this.state.isChecked) {
      this.setState({
        showModal: false,
      });
      this.props.postUser({
        data: this.state.formData,
        callback: (error) => {
          if (!error) {
            localStorage.setItem("loggedIn", true);
            this.props.history.push("/dashboard");
          } else {
            this.setState({
              hasErrored: true,
              errorMessage: error,
            });
          }
        },
      });
    }
  };

  handleCheckBoxChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  handlePassWordChange = (values) => {
    let currentPassword = values.target.value;
    this.setState({
      password: currentPassword,
    });
  };

  handleSubmit = (values) => {
    let formData = { ...this.state.formData };
    const activeKey = this.state.activeKey;
    if (activeKey === 0) {
      const { email, name, contact, address } = values;
      formData = { ...formData, email, name, contact, address };
      this.setState({
        formData: formData,
        activeKey: this.state.activeKey + 1,
      });
    } else {
      const { password } = values;
      formData = { ...formData, password, role: "subscriber" };
      this.setState({
        formData: formData,
        showModal: true,
      });
    }
  };

  handleBack = () => {
    this.setState({
      activeKey: this.state.activeKey - 1,
    });
  };

  render() {
    const {
      showModal,
      activeKey,
      stepList,
      formData,
      isChecked,
      password,
      showWarningModal,
    } = this.state;
    return (
      <div className="registration-main">
        {activeKey === 0 ? (
          <img src={BasicDetailsImg} className="image-style" />
        ) : (
          <img src={PasswordImg} className="image-style" />
        )}
        <div className="form-container">
          <div className="form-header">
            <h1>
              <b>User Subscriber Sign Up</b>
            </h1>
            <h4>Please provide the following details</h4>
          </div>
          <FormSteps stepList={stepList} activeKey={activeKey} />
          {activeKey === 0 ? (
            <BasicDetails handleSubmit={this.handleSubmit} values={formData} />
          ) : activeKey === 1 ? (
            <PasswordDetails
              handleSubmit={this.handleSubmit}
              values={formData}
              handleBack={this.handleBack}
              handlePasswordChange={this.handlePassWordChange}
              currentPassword={password}
              hasErrored={this.state.hasErrored}
              errorMessage={this.state.errorMessage}
            />
          ) : null}
          {showModal ? (
            <TermsAndConditions
              isChecked={isChecked}
              handleClose={this.handleModalClose}
              handleAccept={this.handleAccept}
              handleCheckChange={this.handleCheckBoxChange}
            />
          ) : null}
          {showWarningModal && (
            <WarningModal
              handleAccept={() => this.props.history.push("/login")}
            />
          )}
        </div>
      </div>
    );
  }
}

UserRegistration.propTypes = {
  history: PropTypes.object,
  fetchingUser: PropTypes.bool,
  postUser: PropTypes.func,
};

const mapStateToProps = ({ userReducer: { fetchingUser } }) => ({
  fetchingUser,
});

const mapDispatchToProps = {
  postUser: postUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
