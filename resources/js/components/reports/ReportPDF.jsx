import ReactPDF, { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Arial',
    fontSize: 12,
    padding: 40,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline',
  },
});

const ReportPDF = () => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Расписание зала</Text>
        {/* Добавьте остальной контент вашего отчета */}
      </Page>
    </Document>
  );
};

export default ReportPDF;
