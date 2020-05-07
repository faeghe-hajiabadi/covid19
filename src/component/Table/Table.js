import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './table.scss'


const useStyles = makeStyles({
  table: {
    minWidth: 550,
    fontSize:20,
  },
  head: {
    backgroundColor: "red",
    color: "white",

  },
  body: {
    fontSize: 14,
    width: 50
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
    <div className='tableContainer'>
        <div
      
      style={{
        overflowX: "auto",
        maxHeight: "858px",
        width: "100%",
        textAlign: "center",
        fontFamily:'Arial',
        margin: "auto"
      }}
    >
      <TableContainer component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow
              style={{
                backgroundColor: "#6B75CA",
                height: "35px",
                color:'white',
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
    </div>
  
  );
}
