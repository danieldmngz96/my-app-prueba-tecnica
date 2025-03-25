import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      nombre: nombre.trim(), // 🔹 Cambiado de "name" a "nombre"
      email: email.trim(),
      password: password.trim(),
    };

    console.log("Datos enviados al backend:", userData);

    if (!userData.nombre || !userData.email || !userData.password) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error en el registro");

      Swal.fire({
        title: "¡Éxito!",
        text: "Registro exitoso",
        icon: "success",
        confirmButtonText: "Iniciar sesión",
      });

      setNombre("");
      setEmail("");
      setPassword("");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Error desconocido al registrar",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      p={3}
      boxShadow={3}
      borderRadius={2}
    >
      <Typography variant="h5" sx={{ color: "black", textAlign: "center" }}>
        Registro
      </Typography>

      <TextField
        label="Nombre"
        fullWidth
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        label="Correo electrónico"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </Box>
  );
}
