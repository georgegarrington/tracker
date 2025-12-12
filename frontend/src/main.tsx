import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { ThemeProvider } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
  {/* <ThemeProvider theme={undefined}>        // MUI theme + CssBaseline */}

    <App />
  {/* </ThemeProvider>        // MUI theme + CssBaseline */}

    </BrowserRouter>

  </StrictMode>,
)
