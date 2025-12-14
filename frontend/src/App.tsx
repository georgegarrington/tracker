// import Link from '@mui/material/Link';
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { THEME } from './theme';
import { Route, Routes, Link } from 'react-router-dom';

const drawerWidth = 240;

export default function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={THEME}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default', width: '100vw' }}>
        <AppBar position="fixed" sx={{backgroundColor: "primary.main", zIndex: theme => theme.zIndex.drawer + 1}}>
          <Toolbar variant='dense'>
            <Typography variant="h6" color="text.secondary" noWrap>
              Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth, '& .MuiDrawer-paper': { width: drawerWidth } }}>
          <Toolbar />
          <List>
            <ListItem key={1}>
              <ListItemButton
              component={Link}
              to="/roles"
              >
                <ListItemText primary={"Roles"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={2}>
              <ListItemButton
              component={Link}
              to="/coding"
              >
                <ListItemText primary={"Coding"} />
              </ListItemButton>
            </ListItem>
          </List>
          
        </Drawer>


        <Box sx={{ml: `${drawerWidth}px`, flexGrow: 1, pt: 0}}>
          <Toolbar variant="dense"/>
          <Routes>
            <Route path ="/roles" element={<div>Roles</div>} />
            <Route path ="/coding" element={<div>Coding</div>} />
          </Routes>
        </Box>

      </Box>
      </ThemeProvider>
    </>
  );
}