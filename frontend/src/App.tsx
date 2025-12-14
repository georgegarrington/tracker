// import Link from '@mui/material/Link';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { THEME } from "./theme";
import { Route, Routes, Link } from "react-router-dom";
import { BaseLayout } from "./components/navigation/BaseLayout";
import Roles from "./components/pages/roles";
import Coding from "./components/pages/coding";
import SysDesign from "./components/pages/sysdesign";

const drawerWidth = 240;

export default function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={THEME}>
        <BaseLayout
          pageSpecs={[
            { path: "/roles", label: "Roles", content: <Roles /> },
            { path: "/coding", label: "Coding", content: <Coding /> },
            { path: "/test", label: "Test", content: <SysDesign /> },
          ]}
        />
      </ThemeProvider>
    </>
  );
}
