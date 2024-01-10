import * as React from "react";
import { TableRow, TableCell, IconButton, styled, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditUserModal from "./modals/editUserModal";


const getStatusColor = (status) => {
  return status === "Cancelado"
    ? "red"
    : status === "Prospecto"
    ? "rgb(51, 194, 255)"
    : "inherit";
};

const CustomTableCell = styled(TableCell)(({ status }) => ({
  color: getStatusColor(status),
  padding: 0,
}));

const StatusText = styled("span")(({ status }) => ({
  backgroundColor:
    status === "Cancelado" ? "rgba(255, 25, 67, 0.1)" : "rgba(51, 194, 255, 0.1)",
  color: getStatusColor(status),
  borderRadius: "30px",
  padding: "5px 10px",
  fontWeight: "800"
}));


function ListUser({ user, onDelete, onUpdate }) {
  const [data, setData] = React.useState({ ...user });
  const [edit, setEdit] = React.useState(false);

  const handleEdit = () => {
    setEdit(true);
  }

  const cancelEdit = () => {
    setEdit(false);
  }

  const handleDelete = () => {
    onDelete(data.id);
  }

  React.useEffect(() => {
    setData({ ...user });
  }, [user]);

  return (
    <TableRow key={data.id}>
      <TableCell>{data.id}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar src={data.image} /> */}
        <span style={{ marginLeft: '10px'}}>{data.name} {data.lastName}</span>
      </TableCell>
      <TableCell>{data.phone}</TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>{data.address}</TableCell>
      <CustomTableCell status={data.status}>
        <StatusText status={data.status}>{data.status}</StatusText>
      </CustomTableCell>
      <TableCell>
      <TableCell>{data.area}</TableCell>
    
        <IconButton
          aria-label="Editar"
          onClick={handleEdit}
          style={{ color: "blue" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="Eliminar"
          onClick={handleDelete}
          style={{ color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>

      <EditUserModal
        open={edit}
        user={data}
        onClose={cancelEdit}
        onUpdate={onUpdate}
      />
    </TableRow>
  );
}

export default ListUser;
