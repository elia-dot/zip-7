import React, { useState } from 'react';
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { useSelector, useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import Moment from 'react-moment';

import { getReports } from '../../../redux/actions/reports';

const ReoprtPDF = ({ match }) => {
  const [report, setReport] = useState(null);
  const { reports } = useSelector(state => state.reports);
  const dispatch = useDispatch();

  Font.register({
    family: 'David',
    src: 'http://fonts.gstatic.com/s/davidlibre/v1/Fp_YuX4CP0pzlSUtACdOo6CWcynf_cDxXwCLxiixG1c.ttf',
  });

  useLayoutEffect(() => {
    dispatch(getReports());
  }, []);

  useLayoutEffect(() => {
    const id = match.params.id;
    const report = reports.find(e => e._id === id);
    console.log(report);

    setReport(report);
  }, [reports]);
  if (!report) return null;
  return (
    <PDFViewer style={styles.page}>
      <Document>
        <Page
          size="A4"
          style={{
            padding: '30px',
          }}
        >
          <View style={styles.section}>
            <Text style={[styles.safty, styles.font]}>
              {report.review.saftyOrdinance}
            </Text>
            <Text style={[styles.review, styles.font]}>
              {report.review.type}
            </Text>
          </View>
          <View style={[styles.section, styles.head]}>
            <View
              style={{
                ...styles.borderdBox,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                <Text style={[styles.smallText, styles.font]}>אזור</Text>
                <Text style={[styles.smallText, styles.font]}>2</Text>
              </View>
              <View
                style={{
                  borderLeft: '1px solid black',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}
              >
                <Text style={[styles.smallText, styles.font]}>תסקיר מס'</Text>
                <Text style={[styles.smallText, styles.font]}>
                  {report.reportNumber}{' '}
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.borderdBox,
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}
            >
              <Text style={[styles.smallText, styles.font]}>
                יש לשמור תסקיר זה לביקורת מפקח העבודה
              </Text>
            </View>
          </View>
          <View style={{ ...styles.borderdBox, marginTop: 40 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid black',
                paddingVertical: 5,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  <Moment date={report.date} format="DD/MM/YYYY" />
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  תאריך הבדיקה
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  {report.location}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  מיקום בדיקה
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  {report.reportType}{' '}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  סוג בדיקה
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100vh',
    width: '100%',
  },
  font: {
    fontFamily: 'David',
    textAlign: 'center',
  },
  safty: {
    fontSize: 12,
    textAlign: 'center',
  },
  review: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  borderdBox: {
    border: '1px solid black',
    color: 'black',
  },
  smallText: {
    fontSize: 10,
  },
});

export default ReoprtPDF;
