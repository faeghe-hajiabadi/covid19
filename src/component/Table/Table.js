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
    <div style={{ overflow: "auto",height: '550px',width: '100%',textAlign:'center',margin:'20px' }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
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
