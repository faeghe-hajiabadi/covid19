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
              className='tableCellbig'
            >
              {column.label}
            </Cell>
          ))}
        </Row>
        {rows.map((row) => (
          <Row key={row.name}>
            <Cell  component="th" scope="row" style={{height:40}}>
              {row.country}
            </Cell>
            <Cell align="left" className='tableCellsmall'>{row.confirmed}</Cell>
            <Cell align="left" className='tableCellsmall' style={{height:40}}>{row.deaths}</Cell>
          </Row>
        ))}
      </StickyTable>
     
    </div>
  );
}
