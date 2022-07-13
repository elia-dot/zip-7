import React, { Fragment, useState } from 'react';
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

const Row = ({ children, ...props }) => (
  <View
    {...props}
    style={{
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid black',
    }}
  >
    {children}
  </View>
);

const Cell = ({ children, ...props }) => (
  <View
    style={{
      flex: props.flex,
      borderRight: '1px solid black',
      padding: 5,
      textAlign: 'center',
    }}
  >
    {children}
  </View>
);

const PDFTable = ({ columns }) => {
  console.log(columns);
  return (
    <Row>
      {columns.map((column, index) => {
        if (typeof column === 'string') {
          return (
            <Cell flex={1} key={column}>
              <Text style={{ ...styles.boldText, ...styles.font }}>
                {column}{' '}
              </Text>
            </Cell>
          );
        } else {
          return (
            <Fragment key={index}>
              <Cell flex={1}>
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {column.columnTitle}{' '}
                </Text>
              </Cell>
              
              <Row>
                {column.columns.map((c, i) => (
                  <Cell flex={1} key={c[i]}>
                    <Text style={{ ...styles.boldText, ...styles.font }}>
                      {c[i]}{' '}
                    </Text>
                  </Cell>
                ))}
              </Row>
            </Fragment>
          );
        }
      })}
    </Row>
  );
};

const ReoprtPDF = ({ match }) => {
  const [report, setReport] = useState(null);
  const [columns, setColumns] = useState([]);
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

    setReport(report);
  }, [reports]);

  useLayoutEffect(() => {
    if (report) {
      setColumns(report.review.tableColumns.reverse());
    }
  }, [report]);
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
            <Row>
              <Cell flex={1}>
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  <Moment date={report.date} format="DD/MM/YYYY" />
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  תאריך הבדיקה
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {report.location}
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  מיקום בדיקה
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {report.reportType}{' '}
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  סוג בדיקה
                </Text>
              </Cell>
            </Row>
            <Row>
              <Cell flex={1}>
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  <Moment date={report.nextReport} format="DD/MM/YYYY" />
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  מועד בדיקה הבאה
                </Text>
              </Cell>
              <Cell flex={3}>
                <Text style={{ ...styles.boldText, ...styles.font }}>-</Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  תסקיר קודם
                </Text>
              </Cell>
            </Row>
            <Row>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {`${report.company.primaryContact.firstName} ${report.company.primaryContact.lastName}`}
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  איש קשר
                </Text>
              </Cell>
              <Cell flex={3}>
                {' '}
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {report.company.name}{' '}
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  התופש
                </Text>
              </Cell>
            </Row>
            <Row>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {report.company.phone}
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  טלפון{' '}
                </Text>
              </Cell>
              <Cell flex={3}>
                {' '}
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {report.company.city}{' '}
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>מען</Text>
              </Cell>
            </Row>
            <Row>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {report.company.fax}
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  פקס{' '}
                </Text>
              </Cell>
              <Cell flex={3}>
                {' '}
                <Text style={{ ...styles.boldText, ...styles.font }}>
                  {report.company.email}{' '}
                </Text>
              </Cell>
              <Cell flex={1}>
                {' '}
                <Text style={{ ...styles.smallText, ...styles.font }}>
                  מייל
                </Text>
              </Cell>
            </Row>
            {report.review.machineType === 'מכונה' && (
              <Row>
                <Cell flex={1}>
                  <Text style={{ ...styles.boldText, ...styles.font }}>
                    {report.machineLicenseNumber}{' '}
                  </Text>
                </Cell>
                <Cell flex={1}>
                  {' '}
                  <Text style={{ ...styles.smallText, ...styles.font }}>
                    מס' רישוי
                  </Text>
                </Cell>
                <Cell flex={3}>
                  <Text style={{ ...styles.boldText, ...styles.font }}>
                    {report.machineDescription}{' '}
                  </Text>
                </Cell>
                <Cell flex={2}>
                  {' '}
                  <Text style={{ ...styles.smallText, ...styles.font }}>
                    תאור מכונת ההרמה
                  </Text>
                </Cell>
              </Row>
            )}
            {report.review.machineType === 'אביזר הרמה' && (
              <Row>
                <Cell flex={5}>
                  <Text style={{ ...styles.boldText, ...styles.font }}>
                    {report.machineDescription}{' '}
                  </Text>
                </Cell>
                <Cell flex={2}>
                  {' '}
                  <Text style={{ ...styles.smallText, ...styles.font }}>
                    תאור אביזר ההרמה{' '}
                  </Text>
                </Cell>
              </Row>
            )}
            <PDFTable columns={columns} />
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
  boldText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ReoprtPDF;
