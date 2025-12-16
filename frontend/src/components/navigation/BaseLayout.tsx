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
import { Route, Routes, Link } from "react-router-dom";
import type { PageSpec } from "../../types/navigation/page-spec";

const drawerWidth = 240;

export function BaseLayout({ pageSpecs }: { pageSpecs: PageSpec[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.default",
        width: "100vw",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" color="text.secondary" noWrap>
            Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        <Toolbar />
        <List>
          {pageSpecs
            .filter((pageSpec) => !pageSpec.noDrawer)
            .map((pageSpec, index) => (
              <ListItem key={index}>
                <ListItemButton component={Link} to={pageSpec.path}>
                  <ListItemText primary={pageSpec.label} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>

      <Box sx={{ ml: `${drawerWidth}px`, flexGrow: 1, pt: 0 }}>
        <Toolbar variant="dense" />
        <Routes>
          {pageSpecs.map((pageSpec, index) => (
            <Route
              key={index}
              path={pageSpec.path}
              element={pageSpec.content}
            />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}
