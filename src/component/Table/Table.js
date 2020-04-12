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
function createData(name, confirmed, death) {
  return { name, confirmed, death };
}

const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
];

export default function TableCo(props) {
  const classes = useStyles();
  console.log("props in table", props);

  if (!props) {
    return null;
  }
  {
    props.tableData &&
      props.tableData.locations &&
      props.tableData.locations.forEach(item => {
        rows.push(
          createData(item.country, item.latest.confirmed, item.latest.deaths)
        );
      });
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Country Name</TableCell>
              <TableCell align="left">Confirmed</TableCell>
              <TableCell align="left">Death</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.confirmed}</TableCell>
                <TableCell align="left">{row.death}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
