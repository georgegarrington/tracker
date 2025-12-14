// import Link from '@mui/material/Link';
import { AppBar, Box, Container, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { THEME } from './theme';
import { Dashboard } from '@mui/icons-material';
import { Route, Routes, RouterLink } from 'react-router-dom';

// function Copyright() {
//   return (
//     <Typography
//       variant="body2"
//       align="center"
//       sx={{
//         color: 'text.secondary',
//       }}
//     >
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}.
//     </Typography>
//   );
// }

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
              {/* The quick brown fox jumps over the lazy dog */}
              Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth, '& .MuiDrawer-paper': { width: drawerWidth } }}>
          <Toolbar />
          {/* <Box sx={{ width: 240, bgcolor: 'red', height: '100%' }}> */}
          {/* <List>
            <ListItem key={1}>
              <ListItemButton>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={2}>
              <ListItemButton
              component={RouterLink}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
          </List> */}
          
          {/* </Box> */}
        </Drawer>
{/* 
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
          <Toolbar />
          <Routes>
            <Route path="/one" element={<div>One</div>} />
            <Route path="/two" element={<div>Two</div>} />
          </Routes>
        </Box> */}

        {/* <Typography>test</Typography> */}
      </Box>
      </ThemeProvider>
    </>
  );
}