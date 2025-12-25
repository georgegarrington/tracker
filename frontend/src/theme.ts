import { createTheme } from "@mui/material";

export const THEME = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#E2E4F6" },
    secondary: { main: "#E7C8DD" },
    // success: { main: "#81C784" }, // was #DCEDC8
    // error:   { main: "#D32F2F" }, // was #FFCDD2
    // warning: { main: "#FFB74D" }, // was #FFE0B2
    ggtest: { main: "#471f11ff" },
    background: {
      paper: "#f0f0f0",
      default: "#f8f8f8ff",
    },
    text: {
      primary: "#000000ff",
      secondary: "#555555ff",
    },
    warning: {
      main: "#ff9800ff",
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
