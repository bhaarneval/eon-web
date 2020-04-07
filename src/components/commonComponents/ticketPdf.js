import React from 'react';
import { Page, Text, View, Document, StyleSheet,PDFDownloadLink } from '@react-pdf/renderer';

// Create styles
const newstyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument =(
  <Document>
    <Page size="A4" style={newstyles.page}>
      <View style={newstyles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={newstyles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>)



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
