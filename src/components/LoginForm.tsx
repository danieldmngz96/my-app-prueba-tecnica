import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
      <Typography variant="h5" sx={{ color: "black",  textAlign: "center"}}>
        Registro
      </Typography>
      <TextField
        label="Correo electrónico"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Registrarse
      </Button>
    </Box>
  );
}
