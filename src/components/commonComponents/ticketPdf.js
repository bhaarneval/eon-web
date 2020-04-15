import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
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
import BITSIcon from "../../assets/logo.png";
import sampleQR from "../../assets/sampleQR.jpg";

// Create styles
const newstyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
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
    height: 200,
    width: 200,
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
    justifyContent: "space-between",
  },
});

// Create Document Component
function MyDocument(props) {
  const { eventData, userData } = props;
  const { date, time, location, name } = eventData;
  const { no_of_tickets_bought, amount_paid } = eventData.subscription_details;
  return (
    <Document>
      <Page size="A4" style={newstyles.page}>
        <View style={newstyles.header}>
          <Image src={BITSIcon} style={newstyles.imageStyle} />
          <Text style={newstyles.headerText}>EOn</Text>
        </View>
        <View style={newstyles.details}>
          <Image src={sampleQR} style={newstyles.QRStyle} />
          <View style={newstyles.eventDetails}>
            <Text>Event Name: {name}</Text>
            <Text>Number of seats: {no_of_tickets_bought}</Text>
            {amount_paid ? <Text>Amount : {amount_paid}</Text> : null}
            <Text>Booked by: {userData.name}</Text>
            <Text>
              Date: {moment(date, "YYYY-MM-DD").format("dddd, DD MMM YYYY")}
            </Text>
            <Text>Time: {moment(time, "hh:mm A").format("hh:mm A")}</Text>
            <Text>Location: {location}</Text>
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

const PDF = (props) => {
  return (
    <div>
      <PDFDownloadLink
        document={
          <MyDocument eventData={props.eventData} userData={props.userData} />
        }
        fileName="tickets.pdf"
      >
        <div style={{ color: "#ffffff" }}>Download</div>
      </PDFDownloadLink>
    </div>
  );
};

PDF.propTypes = {
  eventData: PropTypes.object,
  userData: PropTypes.object,
};
export default PDF;
