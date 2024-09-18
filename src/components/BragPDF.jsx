import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: "auto",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderLeft: "4px solid #000",
    borderRight: "4px solid #000",
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
  image: {
    width: "100%",
    height: 100,
    objectFit: "cover",
    marginBottom: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 10,
    color: "gray",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 10,
  },
});

const BragPdf = ({ data, logoBase64, bragImages }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo at the top */}
        <View style={styles.logoContainer}>
          {logoBase64 ? (
            <Image src={logoBase64} style={styles.logo} />
          ) : (
            <Text style={styles.errorText}>Logo not available</Text>
          )}
        </View>

        {/* Brags in timeline format */}
        {data.map((brag, index) => (
          <View key={brag.brag_id} style={styles.section}>
            <Text style={styles.dateText}>
              {new Date(brag.brag_start_date).toLocaleDateString()} -{" "}
              {new Date(brag.brag_end_date).toLocaleDateString()}
            </Text>
            <Text style={styles.title}>{brag.brag_name}</Text>

            {/* Display the pre-fetched image or error */}
            {bragImages[index] ? (
              <Image src={bragImages[index]} style={styles.image} />
            ) : (
              <Text style={styles.errorText}></Text>
            )}

            <Text style={styles.text}>{brag.brag_desc}</Text>
            <Text style={styles.text}>
              <strong>Tags:</strong> {brag.brag_tags}
            </Text>
            <Text style={styles.text}>
              <strong>Designation:</strong> {brag.brag_designation}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default BragPdf;
