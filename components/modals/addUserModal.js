import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import apiClient from "../../apiClient";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddUser({ recharge }) {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [status, setStatusId] = React.useState('');
  const [statuses, setStatus] = useState([]);

  useEffect(() => {
    /*Ir por los productos desde el backend */
    apiClient.get('api/status')
      .then(response => {
        setStatus(response.data || []);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    apiClient.post("/api/users", data)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: response.data.message,
          confirmButtonText: "Aceptar"
        });
        setOpen(false);
        recharge();
        reset();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response?.data?.message || 'Error al registrar el usuario');
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((errorItem) => {
            setError(errorItem.field, {
              //error: true,
              type: "validation",
              message: errorItem.error,
            });
          });
        }
      });
  };

  return (
    <div>
      <Box item xs={6} md={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleClickOpen}
          sx={{ margin: "10px", backgroundColor: "#223354"}}
          variant="contained"
          color="primary"
          startIcon={<PeopleIcon />}
        >
          Agregar Prospecto
        </Button>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: 25,
            fontWeight: "bold",
            backgroundColor: "rgba(75, 114, 139, 0.05)",
            borderRadius: 3,
            color: "rgba(75, 114, 139, 1)"
          }}
        >
          Agregar Prospecto
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={2} mt={0}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="name"
                  variant="outlined"
                  fullWidth
                  label="Nombre"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name", {
                    required: "El nombre es obligatorio",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
                      message: "El nombre solo debe contener letras",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  variant="outlined"
                  fullWidth
                  label="Apellido"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  {...register("lastName", {
                    required: "El apellido es obligatorio",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
                      message: "El apellido solo debe contener letras",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phone"
                  variant="outlined"
                  fullWidth
                  label="Número de teléfono"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  {...register("phone", {
                    required: "El número de teléfono es obligatorio",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message:"Ingresa un número de teléfono válido (10 dígitos)",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  fullWidth
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "El email es Obligatorio",
                    pattern: {
                      value: /(.+)@(.+){2,}\.(.+){3,}/i,
                      message: "No es un email Válido",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                  <FormControl sx={{ m: 0 }} fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
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
                        {devices.map((item) => (
                       <MenuItem key={item.id} value={item.id}>{`${item.name}`}</MenuItem>

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
          <Button onClick={handleClose} variant="contained" color="error">
            <IconButton color="inherit">
              <CancelIcon />
            </IconButton>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="success">
            <IconButton color="inherit">
              <AddCircleIcon />
            </IconButton>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
