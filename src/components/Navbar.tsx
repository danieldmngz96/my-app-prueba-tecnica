"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Función para cerrar sesión
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token"); // Eliminar token
    }
    router.push("/login"); // Redirigir al login
  };

  return (
    <>
      {/* Navbar Superior */}
      <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>
          {/* Botón de menú para móviles */}
          <IconButton
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ color: "black" }}
          >
            <MenuIcon />
          </IconButton>

          {/* Título */}
          <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
            Gestión de Tipos y Propiedades
          </Typography>

          {/* Botones de navegación en desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button sx={{ color: "black" }} component={Link} href="/tipos">
              Tipos
            </Button>
            <Button
              sx={{ color: "black" }}
              component={Link}
              href="/propiedades"
            >
              Propiedades
            </Button>
            <Button sx={{ color: "black" }} onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral para móviles */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem
            component={Link}
            href="/tipos"
            onClick={() => setOpen(false)}
          >
            <ListItemText primary="Tipos" sx={{ color: "black" }} />
          </ListItem>
          <ListItem
            component={Link}
            href="/propiedades"
            onClick={() => setOpen(false)}
          >
            <ListItemText primary="Propiedades" sx={{ color: "black" }} />
          </ListItem>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Cerrar Sesión" sx={{ color: "black" }} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
