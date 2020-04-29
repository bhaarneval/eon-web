import React from "react";
import PropTypes from "prop-types";
import backImg from "../../assets/Back.svg";

/**
 * 
 * @param handleOnClick: to handle what happens on click
 * @param text: Header text for component 
 */
export default function BackButton(props) {
  const { handleOnClick, text } = props;
  return (
    <div style = {styles.header}>
      <img
        src={backImg}
        onClick={handleOnClick}
        style={styles.backImage}
      />
      <div style={styles.headerText}>{text}</div>
    </div>
  );
}
BackButton.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};
const styles = {
  header: {
    display: "flex",
    justifyContent: "flex-start",
  },
  headerText: {
    color: "#262C6F",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "flex-start",
    flexWrap:"nowrap",
    width:"100%",
    padding: "1%",
    fontSize: "120%"
  },
  backImage: {
    cursor: "pointer"
  }
};
