import Link from '@mui/material/Link';
import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material';
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
        <AppBar position="relative" sx={{backgroundColor: "ggtest.main"}}>
          <Toolbar variant='dense'>
            <Typography variant="h6" color="inherit" noWrap>
              Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <Typography>test</Typography> */}
      </Box>
      </ThemeProvider>
    </>
  );
}