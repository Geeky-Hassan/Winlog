// BragPdf.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';



const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

const BragPdf = ({ data }) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.map((brag) => (
          <View key={brag.brag_id} style={styles.section}>
            <Text style={styles.title}>{brag.brag_name}</Text>
            <Image src={`http://127.0.0.1:8000/uploads/${brag.brag_img}`} style={styles.image} />
            <Text style={styles.text}>{brag.brag_desc}</Text>
            <Text style={styles.text}><strong>Tags:</strong> {brag.brag_tags}</Text>
            <Text style={styles.text}><strong>Designation:</strong> {brag.brag_designation}</Text>
            <Text style={styles.text}><strong>Start Date:</strong> {new Date(brag.brag_start_date).toLocaleDateString()}</Text>
            <Text style={styles.text}><strong>End Date:</strong> {new Date(brag.brag_end_date).toLocaleDateString()}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default BragPdf;