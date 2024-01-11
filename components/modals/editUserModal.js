import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import apiClient from "../../apiClient";
import { useEffect } from 'react';

function EditUserModal({ open, user, onClose, onUpdate }) {
  

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [data, setData] = React.useState({ ...user });
  const [users, setUsers] = React.useState([]);
  const [statuses, setStatus] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [statuss, setStatusId] = React.useState('');
  const [course, setCourseId] = React.useState('');

  const userStatus = users.find(item => item.id === data.id)?.userStatus;
  const userCourse = users.find(item => item.id === data.id)?.course;

  const onSubmit = (data,) => {
    data.id = user.id;
    console.log("Usuario a actualizar:", user);
    apiClient.put(`/api/users?id=${user.id}`, data)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data); 
        Swal.fire({
          position: "center",
          icon: "success",
          text: response.data.message,
          confirmButtonText: "Aceptar",
        })
        console.log(data);
        onClose();
        onUpdate(data);
        //reset();
      })
      .catch((error) => {
        console.log("Error al actualizar usuario:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          text: error.response?.data?.message || 'Error al actualizar el usuario',
        });
      });
  };

  useEffect(() => {
    apiClient.get('api/users')
    .then(response => {
      setUsers(response.data || []);
    })
    .catch(error => {
        console.log(error);
    });

  }, []);

  useEffect(() => {
    apiClient.get('api/status')
      .then(response => {
        setStatus(response.data || []);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    apiClient.get('api/courses')
      .then(response => {
        setCourses(response.data || []);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      method="post"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Editar Usuario
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={2} mt={0}>
            <Grid item xs={12} md={6}>
              <TextField
                id="name"
                label="Nombre"
                variant="outlined"
                fullWidth
                defaultValue={user.name}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
                    message: "El nombre solo debe contener letras",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="lastname"
                label="Apellido"
                variant="outlined"
                fullWidth
                defaultValue={user.lastname}
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
                {...register("lastname", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
                    message: "El apellido solo debe contener letras",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="phone"
                label="Teléfono"
                variant="outlined"
                fullWidth
                defaultValue={user.phone}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register("phone", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Ingresa un número de teléfono válido (10 dígitos)",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                defaultValue={user.email}
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "El Email es Obligatorio",
                  pattern: {
                    value: /(.+)@(.+){2,}\.(.+){3,}/i,
                    message: "No es un email Válido",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                variant="outlined"
                fullWidth
                defaultValue={user.address}
                label="Dirección"
                error={!!errors.address}
                helperText={errors.address?.message}
                {...register("address", {
                  required: "La dirección es obligatorio",
                  pattern: {
                    value: /^([a-zA-Z0-9]+\s)+\d+(\s\w+)?\s?#\s?\d+$/,
                    message:"Ingresa una dirección valida",
                  },
                })}
              />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <FormControl sx={{ m: 0 }} fullWidth>
                  <InputLabel htmlFor="demo-simple-select-autowidth-label">Estatus</InputLabel>
                  <Select
                    defaultValue={user.status}
                    id="status"
                    name="status"
                    onChange={ev => setStatusId(ev.target.value)}
                    fullWidth
                    label={status.name}
                    error={!!errors.status}
                    {...register("status", {
                      required: "Este campo es obligatorio",
                    })}
                  >
                      <MenuItem>Selecciona el status</MenuItem>
                      {userStatus ? (
                       <MenuItem status={userStatus.name}>{userStatus.name}</MenuItem>
                       ) : (
                        "N/A"
                      )} 
                      <MenuItem>Selecciona el status</MenuItem>
                        {statuses.map((item) => (
                       <MenuItem status={userStatus.name}>{item.name}</MenuItem>

                      ))}
                      
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} md={6}>
                  <FormControl sx={{ m: 0 }} fullWidth>
                    {userStatus ? (
                      <InputLabel id="demo-simple-select-autowidth-label">{userStatus.name}</InputLabel>
                    ) : (
                      "N/A"
                    )}
                    <Select
                      id='status'
                      {
                      ...register('status',
                        {
                          required: '*Este campo es obligatorio.',
                          pattern: {
                            message: 'No es un status válido.'
                          }
                        })
                      }
                      onChange={ev => setStatusId(ev.target.value)}
                      fullWidth
                      label="Selecciona el status"
                      error={!!errors.status}
                      helperText={errors.status?.message}

                    >
                      <MenuItem>Selecciona el status</MenuItem>
                        {statuses.map((item) => (
                       <MenuItem key={item.id} value={item.id}>{`${item.name}`}</MenuItem>

                      ))}
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                  <FormControl sx={{ m: 0 }} fullWidth>
                    {userCourse ? (
                      <InputLabel id="demo-simple-select-autowidth-label">{userCourse.name}</InputLabel>
                    ) : (
                      "N/A"
                    )}
                    <Select
                      id='area'
                      {
                      ...register('area',
                        {
                          required: '*Este campo es obligatorio.',
                          pattern: {
                            message: 'No es un area válida.'
                          }
                        })
                      }
                      onChange={ev => setCourseId(ev.target.value)}
                      fullWidth
                      label="Selecciona el area"
                      error={!!errors.status}
                      helperText={errors.status?.message}

                    >
                      <MenuItem>Selecciona el area</MenuItem>
                        {courses.map((item) => (
                       <MenuItem key={item.id} value={item.id}>{`${item.area} ${item.name}`}</MenuItem>

                      ))}
                    </Select>
                  </FormControl>
              </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "80px",
          marginLeft: "80px",
          marginBottom: "5px",
        }}
      >
        <Button 
          onClick={onClose} 
          variant="contained"
          color="error"
        >
          <IconButton color="inherit">
            <CancelIcon />
          </IconButton>
          Cancelar
        </Button>
        <Button 
          variant="contained"
          color="primary"
          type="submit"
        >
          <IconButton color="inherit">
            <SaveIcon />
          </IconButton>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserModal;
