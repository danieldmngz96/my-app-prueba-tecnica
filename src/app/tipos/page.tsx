"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";
import Nav from "../../components/Navbar"; 

interface Propiedad {
  id: string;
  name: string;
}

interface Tipo {
  id: string;
  nombre: string;
  propiedades: string[];
}

export default function TiposPage() {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [nombre, setNombre] = useState("");
  const [selectedProps, setSelectedProps] = useState<string[]>([]);
  const [currentTipo, setCurrentTipo] = useState<Tipo | null>(null);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data: Propiedad[]) => setPropiedades(data));

    fetch("/api/api/all")
      .then((res) => res.json())
      .then((data: Tipo[]) => setTipos(data));
  }, []);

  const handleCreate = async () => {
    if (!nombre) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    }

    const response = await fetch("/api/tipos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, propiedades: selectedProps }),
    });

    if (response.ok) {
      Swal.fire("Éxito", "Tipo creado correctamente", "success");
      setOpenCreate(false);
    } else {
      Swal.fire("Error", "No se pudo crear el tipo", "error");
    }
  };

  const handleEdit = async () => {
    if (!currentTipo) return;

    const response = await fetch(`/api/tipos/${currentTipo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, propiedades: selectedProps }),
    });

    if (response.ok) {
      Swal.fire("Éxito", "Tipo actualizado correctamente", "success");
      setOpenEdit(false);
    } else {
      Swal.fire("Error", "No se pudo actualizar el tipo", "error");
    }
  };

  const handleDelete = async () => {
    if (!currentTipo) return;

    await fetch(`/api/tipos/${currentTipo.id}`, { method: "DELETE" });
    Swal.fire("Eliminado", "El tipo ha sido eliminado", "success");
    setOpenDelete(false);
  };

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh", p: 3 }}>
      <Nav />
      <Container>
        <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
          Gestión de Tipos
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreate(true)}
        >
          Crear Tipo
        </Button>

        <Box mt={3}>
          {tipos.map((tipo) => (
            <Box
              key={tipo.id}
              p={2}
              boxShadow={2}
              borderRadius={2}
              mb={2}
              bgcolor="white"
            >
              <Typography variant="h6">{tipo.nombre}</Typography>
              <Typography variant="body2">
                Propiedades:{" "}
                {tipo.propiedades
                  .map((id) => propiedades.find((p) => p.id === id)?.name)
                  .join(", ")}
              </Typography>
              <Button
                onClick={() => {
                  setCurrentTipo(tipo);
                  setOpenEdit(true);
                }}
              >
                Editar
              </Button>
              <Button
                color="error"
                onClick={() => {
                  setCurrentTipo(tipo);
                  setOpenDelete(true);
                }}
              >
                Eliminar
              </Button>
            </Box>
          ))}
        </Box>

        {/* Modal Crear */}
        <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
          <DialogTitle>Crear Tipo</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Propiedades</InputLabel>
              <Select
                multiple
                value={selectedProps}
                onChange={(e) => setSelectedProps(e.target.value as string[])}
              >
                {propiedades.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreate(false)}>Cancelar</Button>
            <Button onClick={handleCreate} variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Editar */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Editar Tipo</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Propiedades</InputLabel>
              <Select
                multiple
                value={selectedProps}
                onChange={(e) => setSelectedProps(e.target.value as string[])}
              >
                {propiedades.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
            <Button onClick={handleEdit} variant="contained">
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Eliminar */}
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle>Eliminar Tipo</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar &quot;{currentTipo?.nombre}
              &quot;?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
