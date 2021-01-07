import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputFields from '../InputFieldsUser/AddUser';
const useStyles = makeStyles((theme) => ({
table: {
minWidth: 650,
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

function createData(name, calories, fat, carbs, protein,country,Action,Edit) {
return { name, calories, fat, carbs, protein,country,Action,Edit };
}

const rows = [
createData('ACTIVE', 'MADHU', '2018-08-08', 9986223399, 'KARNATAKA','INDIA',<ScheduleIcon style={{color:'blue'}}/>,<EditIcon/>),
createData('ACTIVE', 'MADHU', '2018-08-08', 9986223399, 'KARNATAKA','INDIA',<ScheduleIcon style={{color:'blue'}}/>,<EditIcon/>),
createData('ACTIVE', 'MADHU', '2018-08-08', 9986223399, 'KARNATAKA','INDIA',<ScheduleIcon style={{color:'blue'}}/>,<EditIcon/>),
createData('ACTIVE', 'MADHU', '2018-08-08', 9986223399, 'KARNATAKA','INDIA',<ScheduleIcon style={{color:'blue'}}/>,<EditIcon/>),
createData('ACTIVE', 'MADHU', '2018-08-08', 9986223399, 'KARNATAKA','INDIA',<ScheduleIcon style={{color:'blue'}}/>,<EditIcon/>),
];

export default function BasicTable() {
const classes = useStyles();
const [open, setOpen] = React.useState(false);

const handleOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};
return (
<>
<TableContainer component={Paper}>

<div style={{float:'left',margin:'20px'}}>
REGISTERED USER
</div>
<div style={{float:'right',margin:'20px'}}>
<Button color="primary"><GetAppIcon/></Button>
<Button color="primary" onClick={handleOpen}>
<AddIcon/>
ADD USER</Button>
</div>

<Table className={classes.table} aria-label="simple table">
<TableHead>
<TableRow>
<TableCell align="center" style={{fontWeight: "bold"}}>STATUS</TableCell>
<TableCell align="center" style={{fontWeight: "bold"}}>USER NAME</TableCell>
<TableCell align="center" style={{fontWeight: "bold"}}>JOIN DATE</TableCell>
<TableCell align="center" style={{fontWeight: "bold"}}>PHONE NO</TableCell>
<TableCell align="center" style={{fontWeight: "bold"}}>STATE</TableCell>
<TableCell align="center" style={{fontWeight: "bold"}}>COUNTRY</TableCell>
<TableCell align="center" style={{fontWeight: "bold"}}>Action</TableCell>
</TableRow>
</TableHead>
<TableBody>
{rows.map((row) => (
<TableRow key={row.name}>
<TableCell align="center">{row.name}</TableCell>
<TableCell align="center">{row.calories}</TableCell>
<TableCell align="center">{row.fat}</TableCell>
<TableCell align="center">{row.carbs}</TableCell>
<TableCell align="center">{row.protein}</TableCell>
<TableCell align="center">{row.country}</TableCell>
<TableCell align="center"><Button>{row.Action}</Button>
<Button onClick={handleOpen} style={{color:'blue'}}>{row.Edit}</Button></TableCell>

</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
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