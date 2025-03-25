"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
//import Link from "next/link";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false); // Maneja el formulario de registro

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error en el inicio de sesión");

      Swal.fire({
        title: "¡Éxito!",
        text: "Inicio de sesión exitoso",
        icon: "success",
        confirmButtonText: "Continuar",
      });

      console.log("Token recibido:", data.token);

      localStorage.setItem("token", data.token);
      router.push("/tipos");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "Error desconocido al iniciar sesión",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          p={3}
          boxShadow={3}
          borderRadius={2}
        >
          <Typography variant="h4" sx={{ color: "black" }}>
            Iniciar Sesión
          </Typography>

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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </Button>

          {/* 🔹 Maneja el formulario de registro dentro de la misma página */}
          <Typography variant="body2" sx={{ mt: 2, color: "black" }}>
            ¿Deseas registrarte?{" "}
            <span
              onClick={() => setMostrarRegistro(true)}
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Haz clic aquí
            </span>
          </Typography>

          {/* Muestra el formulario de registro cuando se hace clic */}
          {mostrarRegistro && <LoginForm />}
        </Box>
      </Container>
    </Box>
  );
}
