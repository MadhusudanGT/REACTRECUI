import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import GetAppIcon from '@material-ui/icons/GetApp';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputFields from '../InputFieldsUser/AddUser';
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 170 },
  { id: "phoneno", label: "Phone No", minWidth: 170 },
  { id: "edit", label: "edit", minWidth: 80 },
  { id: "deleteicon", label: "delete", minWidth: 80 },

];

function createData(name, email, address, role, phoneno,edit,deleteicon) {
  return { name, email, address, role, phoneno, edit,deleteicon };
}

const rows = [
  createData(
    "Swagata Mandal",
    "swagata@gmail.com",
    "West Bengal",
    "User",
    "9876453314",
    <EditIcon style={{color:'blue'}}/>,
    <DeleteIcon style={{color:'red'}}/>
  ),
  createData(
    "Shiv Munda",
    "shiv@gmail.com",
    "Jharkhand",
    "HR",
    "9890453314",
    <EditIcon style={{color:'blue'}}/>,
    <DeleteIcon style={{color:'red'}}/>
  ),
  createData(
    "Madhusudan GT",
    "madhu@gmail.com",
    "Karnataka",
    "Manager",
    "9876453323",
    <EditIcon style={{color:'blue'}}/>,
    <DeleteIcon style={{color:'red'}}/>
  ),
  createData(
    "Umesh Katakam",
    "umesh@gmail.com",
    "Hyderabad",
    "User",
    "9887653314",
    <EditIcon style={{color:'blue'}}/>,
    <DeleteIcon style={{color:'red'}}/>
  ),
  createData(
    "Viswa Chand",
    "viswa@gmail.com",
    "Andhra Pradesh",
    "HR7",
    "9234453314",
    <EditIcon style={{color:'blue'}}/>,
    <DeleteIcon style={{color:'red'}}/>
  ),
];

const useStyles = makeStyles((theme)=>({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <>
    <Paper className={classes.root}>
         <div style={{float:'left',margin:'20px'}}>
REGISTERED USER
            </div>
            <div style={{float:'right',margin:'20px'}}>
            <Button color="primary"><GetAppIcon/></Button>
            <Button color="primary" onClick={handleOpen}>
                <AddIcon/>
                ADD USER</Button>
            </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ color: "Violet" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: "blue" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
rowsPerPageOptions={[10, 25, 100]}
component="div"
count={rows.length}
rowsPerPage={rowsPerPage}
page={page}
onChangePage={handleChangePage}
onChangeRowsPerPage={handleChangeRowsPerPage}
/> */}
    </Paper>
    <div>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
        <InputFields/>
          </div>
        </Fade>
      </Modal>
    </div>
    </>
  );
}
