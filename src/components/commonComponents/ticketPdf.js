import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {Button} from "antd";
//PDFDownloadLink
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import Icon from "../../assets/bitslogo.png";
import sampleQR from "../../assets/sampleQR.jpg";

// Create styles
const newstyles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  header: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottom: "2 Solid Black",
  },
  imageStyle: {
    height: 80,
    width: 80,
  },
  headerText: {
    fontSize: 40,
    marginLeft: 50,
    marginTop: 20,
  },
  QRStyle: {
    height: 100,
    width: 100,
  },
  details: {
    margin: 20,
    height: 200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  eventDetails: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 30,
    lineHeight:"1.8",
    justifyContent: "space-between",
  },
  noteStyle: {
    fontSize:"16px",
    fontWeight:"bold",

  }
});

// Create Document Component
function MyDocument(props) {
  const { eventData, userData } = props;
  const { date, time, location, name } = eventData;
  const { no_of_tickets_bought, amount_paid, created_on } = eventData.subscription_details;
  return (
    <Document>
      <Page size="A4" style={newstyles.page}>
        <View style={newstyles.header}>
          <Image src={Icon} style={newstyles.imageStyle} />
          <Text style={newstyles.headerText}>EOn</Text>
        </View>
        <View style={newstyles.details}>
          <Image src={sampleQR} style={newstyles.QRStyle} />
          <View style={newstyles.eventDetails}>
            <Text>Event Name: {name}</Text>
            <Text>Number of seats: {no_of_tickets_bought}</Text>
            {amount_paid ? <Text>Amount : {amount_paid}</Text> : null}
            <Text>
              Event Date:{" "}
              {moment(date, "YYYY-MM-DD").format("dddd, DD MMM YYYY")}
            </Text>
            <Text>Time: {moment(time, "hh:mm A").format("hh:mm A")}</Text>
            <Text>Location: {location}</Text>
            <Text>Subscriber Name: {userData.name}</Text>
            <Text>Email Id: {userData.email}</Text>
            <Text>Contact: {userData.contact_number}</Text>
            <Text>Booking Date: {moment(created_on, "YYYY-MM-DD").format("dddd, DD MMM' YYYY")}</Text>
            <Text>*Note: Ticket is non-transferable!</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

MyDocument.propTypes = {
  eventData: PropTypes.object,
  userData: PropTypes.object,
};

/*
 * rendering pdf for tickets download
 */
const PDF = (props) => {
  return (
    <div>
      <PDFDownloadLink
        document={
          <MyDocument eventData={props.eventData} userData={props.userData} />
        }
        fileName={props.eventData.name+"-"+props.userData.name+".pdf"}
      >
        <Button type="primary" onClick={()=>{}}>Download</Button>
      </PDFDownloadLink>
    </div>
  );
};

PDF.propTypes = {
  eventData: PropTypes.object,
  userData: PropTypes.object,
};
export default PDF;
