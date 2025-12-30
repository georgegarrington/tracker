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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AttemptEntry } from "./components/pages/coding/AttemptEntry";
import CodingTagManagement from "./components/pages/coding-tag-management";
import CodingAnalytics from "./components/pages/coding/analytics";

const drawerWidth = 240;

export default function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={THEME}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BaseLayout
            pageSpecs={[
              { path: "/roles", label: "Roles", content: <Roles /> },
              { path: "/coding", label: "Coding", content: <Coding /> },
              {
                path: "/coding/new_attempt",
                noDrawer: true,
                content: <AttemptEntry />,
              },
              {
                path: "/coding/tag_management",
                label: "Coding Tag Management",
                content: <CodingTagManagement />,
              },
              {
                path: "/coding/analytics",
                label: "Coding Analytics",
                content: <CodingAnalytics />,
              },
              { path: "/test", label: "System Design", content: <SysDesign /> },
            ]}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
