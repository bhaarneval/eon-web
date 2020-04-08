import React from 'react';
//PDFDownloadLink
import { Page, Text, View, Document, StyleSheet,PDFDownloadLink, Image } from '@react-pdf/renderer';
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
    height:200,
    width:"100%",
    display:"flex",
    flexDirection:"row",
  },
  eventDetails: {
    display:"flex",
    flexDirection:"column",
    marginLeft: 30,
    justifyContent:"space-between"
  }
});

// Create Document Component
const MyDocument = (
  <Document>
    <Page size="A4" style={newstyles.page}>
      <View style={newstyles.header}>
        <Image src={BITSIcon} style={newstyles.imageStyle} />
        <Text style={newstyles.headerText}>Technex</Text>
      </View>
      <View style={newstyles.details}>
        <Image src={sampleQR} style={newstyles.QRStyle} />
        <View style={newstyles.eventDetails}>
          <Text>Event Name: Technex</Text>
          <Text>Number of seats: 4</Text>
          <Text>Amount : 2000</Text>
          <Text>Event Date: Thursday, 23 May, 10:00 AM</Text>
          <Text>Location: HashedIn Technologies</Text>
        </View>
      </View>
    </Page>
  </Document>
);



const PDF = () => {
    return (
      <div>
        <PDFDownloadLink document={MyDocument} fileName="tickets.pdf">
          <div style = {{color:"#ffffff"}}>Download</div>
        </PDFDownloadLink>
      </div>
    );
  };
export default PDF;
