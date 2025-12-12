import Link from '@mui/material/Link';
import { AppBar, Box, Container, CssBaseline, Drawer, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { THEME } from './theme';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={THEME}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'grey', width: '100vw' }}>
        <AppBar position="fixed" sx={{backgroundColor: "primary.main", zIndex: theme => theme.zIndex.drawer + 1}}>
          <Toolbar variant='dense'>
            <Typography variant="h6" color="text.secondary" noWrap>
              {/* The quick brown fox jumps over the lazy dog */}
              Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" anchor="left">
          <Toolbar />
          <Box sx={{ width: 240, bgcolor: 'background.paper', height: '100%' }}>
          </Box>
        </Drawer>
        {/* <Typography>test</Typography> */}
      </Box>
      </ThemeProvider>
    </>
  );
}