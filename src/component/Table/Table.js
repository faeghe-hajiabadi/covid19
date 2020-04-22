import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  head: {
    backgroundColor: "#6092F7",
    color: "white"
  },
  body: {
    fontSize: 14
  }
});

let rows = [];

export default function TableCo(props) {
  const classes = useStyles();
  if (!props) {
    return null;
  }
  rows = props.tableData;

  return (
    <div
      style={{
        overflowX: "auto",
        height: "550px",
        width: "90%",
        textAlign: "center",
        margin: "auto"
      }}
    >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow
              style={{
                backgroundColor: "#f5f5f5",
                height: "35px"
              }}
            >
              <TableCell>Country Name</TableCell>
              <TableCell align="left">Confirmed</TableCell>
              <TableCell align="left">Death</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
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
  );
}
