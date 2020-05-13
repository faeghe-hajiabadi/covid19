import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./table.scss";

import { StickyTable, Row, Cell } from "react-sticky-table";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    // maxHeight: 440,
  },
  table: {
    // minWidth: 550,
    // fontSize: 20,
  },
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  body: {
    fontSize: 14,
    width: 50,
  },
});

let rows = [];
const columns = [
  { id: "name", label: "Country Name", minWidth: 170 },
  { id: "code", label: "Confirmed", minWidth: 100 },
  {
    id: "population",
    label: "Death",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString(),
  },
];

export default function TableCo(props) {
  const classes = useStyles();
  if (!props) {
    return null;
  }
  rows = props.tableData;

  return (
    <div className="tableContainer">
      <StickyTable className='stickyTable'>
        <Row>
          {columns.map((column) => (
            <Cell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth, height:50,padding:'4%',borderRight:'2px solid #e5e5e5'}}
            >
              {column.label}
            </Cell>
          ))}
        </Row>
        {rows.map((row) => (
          <Row key={row.name}>
            <Cell component="th" scope="row" style={{height:40}}>
              {row.country}
            </Cell>
            <Cell align="left" style={{height:40,borderRight:'2px solid #e5e5e5'}}>{row.confirmed}</Cell>
            <Cell align="left" style={{height:40}}>{row.deaths}</Cell>
          </Row>
        ))}
      </StickyTable>
      {/* <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <div
            style={{
              overflow: "auto",
              maxHeight: "858px",
              width: "100%",
              textAlign: "center",
              fontFamily: "Arial",
              margin: "auto",
            }}
          >
            <TableContainer component={Paper}>
              <Table
                stickyHeader
                aria-label="sticky table"
                className={classes.table}
              >
                <TableHead>
                  <TableRow
                    // style={{
                    //   height: "35px",
                    //   color: "white",
                    // }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, top: 57 }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.country}
                      </TableCell>
                      <TableCell align="left">{row.confirmed}</TableCell>
                      <TableCell align="left">{row.deaths}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </TableContainer>
      </Paper> */}
    </div>
  );
}
