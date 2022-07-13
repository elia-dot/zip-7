import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

const ReportTable = ({ report }) => {
  const columns = useMemo(
    () =>
      report.review.tableColumns.map((column, index) =>
        typeof column === 'string'
          ? { Header: column, accessor: column }
          : {
              Header: column.columnTitle,
              columns: column.columns.map((c, i) => ({
                Header: c[i],
                accessor: c[i],
              })),
            }
      ),
    [report.review.tableColumns]
  );

  const data = [];

  const makeData = useMemo(() =>
    report.columns.forEach((primaryColumn, primaryIndex) => {
      data.push({});
      primaryColumn.forEach((column, index) => {
        if (typeof column === 'string') {
          data[primaryIndex][`${report.review.tableColumns[index]}`] = column;
        } else {
          column.forEach((c, i) => {
            data[primaryIndex][
              `${report.review.tableColumns[index].columns[i][`${i}`]}`
            ] = c[i];
          });
        }
      });
    }, [])
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()} textAlign="center">
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()} textAlign="center">
                  {column.render('Header')}{' '}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} textAlign="center">
                {row.cells.map(cell => {
                  return (
                    <Td {...cell.getCellProps()} textAlign="center">
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
