"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Asegurar que el código de localStorage y redirección se ejecute en el cliente
  useEffect(() => {
    if (typeof window === "undefined") return;
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error en el inicio de sesión");

      Swal.fire({
        title: "¡Éxito!",
        text: "Inicio de sesión exitoso",
        icon: "success",
        confirmButtonText: "Continuar",
      });

      console.log("Token recibido:", data.token);

      // ✅ Guardar token y redirigir
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        router.push("/tipos");
      }

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Error desconocido al iniciar sesión",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={3} boxShadow={3} borderRadius={2}>
          <Typography variant="h4">Iniciar Sesión</Typography>
          <TextField label="Correo electrónico" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Contraseña" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin} disabled={loading}>
            {loading ? "Cargando..." : "Ingresar"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
